import { FunctionFragment, Signer, BaseContract, ContractFactory, InterfaceAbi, Interface, BytesLike } from 'ethers';
import hre from 'hardhat';
import { expect } from 'chai';
import { loadFixture } from '@nomicfoundation/hardhat-network-helpers';
import { deployContract, getContractArtifact, getAbi } from '../scripts/services';
import { keccak256, toUtf8Bytes } from '../scripts/services/utils';
import { ZERO_ADDRESS, ZERO_BYTES, ZERO_BYTES32 } from '../scripts/services/constant';

export enum ExemptionCategory {
  NONE,
  CASHIN,
  CASHOUT,
  ALL,
}

const PAUSER_ROLE = keccak256(toUtf8Bytes('PAUSER_ROLE'));
const UPGRADER_ROLE = keccak256(toUtf8Bytes('UPGRADER_ROLE'));
const MINTER_ROLE = keccak256(toUtf8Bytes('MINTER_ROLE'));
const MANAGER_ROLE = keccak256(toUtf8Bytes('MANAGER_ROLE'));
const GOVERNANCE_ADMIN = keccak256(toUtf8Bytes('GOVERNANCE_ADMIN'));
const SUPPLY_ADMIN = keccak256(toUtf8Bytes('SUPPLY_ADMIN'));

export async function deployUSDReformFixture() {
  const [governanceAdmin, supplyAdmin, pauser, upgrader, minter, manager, reformWallet, user1, user2, user3, stranger] =
    await hre.ethers.getSigners();

  const usdReformImplementation = await deployContract('USDReform', governanceAdmin);

  const usdReformImplementationAddress = usdReformImplementation.target;

  const usdReformImplementationABI = getAbi('USDReform');
  const USDReformInterface = new hre.ethers.Interface(usdReformImplementationABI as InterfaceAbi);
  const initObject = [governanceAdmin.address, supplyAdmin.address, reformWallet.address];

  const initData = USDReformInterface.encodeFunctionData('initialize', initObject);

  const reformProxy = await deployContract('ReformProxy', governanceAdmin, [usdReformImplementationAddress, initData]);

  const reformProxyAddress = reformProxy.target;

  const usdReformBytecodeArtifact = await getContractArtifact('USDReform');
  const usdReformBytecode = usdReformBytecodeArtifact.bytecode;

  const usdReformFactory = new ContractFactory(
    usdReformImplementationABI as InterfaceAbi,
    usdReformBytecode,
    governanceAdmin,
  );

  const usdReform = await usdReformFactory.attach(reformProxyAddress);

  return {
    usdReformImplementation,
    usdReform,
    reformProxyAddress,
    governanceAdmin,
    supplyAdmin,
    pauser,
    upgrader,
    minter,
    manager,
    reformWallet,
    user1,
    user2,
    user3,
    stranger,
  };
}

describe('USDReform', function () {
  let fixture: any;

  beforeEach(async () => {
    fixture = await loadFixture(deployUSDReformFixture);
  });

  afterEach(async () => {
    fixture = null;
  });

  describe('Deployment and Proxy', async function () {
    it('should deploy the USDReform implementation', async function () {
      const { usdReformImplementation, usdReform } = fixture;
      expect(usdReformImplementation.target).to.be.not.equal(ZERO_ADDRESS);
    });

    it('should deploy the USDReform proxy', async function () {
      const { usdReformImplementation, usdReform, reformProxyAddress } = fixture;

      expect(usdReformImplementation.target).to.be.not.equal(ZERO_ADDRESS);

      expect(reformProxyAddress).to.be.not.equal(ZERO_ADDRESS);

      expect(reformProxyAddress).to.be.equal(usdReform.target);

      const _usdReformImplementation = await usdReform.implementation();

      expect(_usdReformImplementation).to.be.equal(usdReformImplementation.target);
    });
  });

  describe('Access Control and Roles', function () {
    it('should allow governanceAdmin to grant PAUSER_ROLE', async function () {
      const { usdReform, governanceAdmin, pauser } = fixture;
      await expect(usdReform.connect(governanceAdmin).grantRole(PAUSER_ROLE, pauser.address))
        .to.emit(usdReform, 'RoleGranted')
        .withArgs(PAUSER_ROLE, pauser.address, governanceAdmin.address);
    });

    it('should not allow non-governanceAdmin to grant PAUSER_ROLE', async function () {
      const { usdReform, stranger, pauser } = fixture;
      await expect(usdReform.connect(stranger).grantRole(PAUSER_ROLE, pauser.address))
        .to.be.revertedWithCustomError(usdReform, 'AccessControlUnauthorizedAccount')
        .withArgs(stranger.address, GOVERNANCE_ADMIN);
    });

    it('should allow supplyAdmin to grant MINTER_ROLE', async function () {
      const { usdReform, supplyAdmin, minter } = fixture;
      await expect(usdReform.connect(supplyAdmin).grantRole(MINTER_ROLE, minter.address))
        .to.emit(usdReform, 'RoleGranted')
        .withArgs(MINTER_ROLE, minter.address, supplyAdmin.address);
    });

    it('should not allow non-supplyAdmin to grant MINTER_ROLE', async function () {
      const { usdReform, stranger, minter } = fixture;
      await expect(usdReform.connect(stranger).grantRole(MINTER_ROLE, minter.address))
        .to.be.revertedWithCustomError(usdReform, 'AccessControlUnauthorizedAccount')
        .withArgs(stranger.address, SUPPLY_ADMIN);
    });

    it('should allow governanceAdmin to revoke roles', async function () {
      const { usdReform, governanceAdmin, pauser } = fixture;
      // First, grant PAUSER_ROLE to pauser
      await usdReform.connect(governanceAdmin).grantRole(PAUSER_ROLE, pauser.address);
      // Then, revoke it
      await expect(usdReform.connect(governanceAdmin).revokeRole(PAUSER_ROLE, pauser.address))
        .to.emit(usdReform, 'RoleRevoked')
        .withArgs(PAUSER_ROLE, pauser.address, governanceAdmin.address);
    });
  });

  describe('Pausability', function () {
    it('should allow accounts with PAUSER_ROLE to pause the contract', async function () {
      const { usdReform, governanceAdmin, pauser } = fixture;

      // First, grant PAUSER_ROLE to pauser account
      await usdReform.connect(governanceAdmin).grantRole(PAUSER_ROLE, pauser.address);

      // Then, pauser pauses the contract
      await expect(usdReform.connect(pauser).pause()).to.emit(usdReform, 'Paused').withArgs(pauser.address);
    });

    it('should not allow accounts without PAUSER_ROLE to pause the contract', async function () {
      const { usdReform, stranger } = fixture;
      await expect(usdReform.connect(stranger).pause())
        .to.be.revertedWithCustomError(usdReform, 'AccessControlUnauthorizedAccount')
        .withArgs(stranger.address, PAUSER_ROLE);
    });

    it('should prevent transfers when paused', async function () {
      const { usdReform, governanceAdmin, supplyAdmin, pauser, minter, user1, user2 } = fixture;

      await usdReform.connect(governanceAdmin).grantRole(PAUSER_ROLE, pauser.address);
      await usdReform.connect(supplyAdmin).grantRole(MINTER_ROLE, minter.address);

      // Mint some tokens to user1
      await usdReform.connect(minter).mint(user1.address, 1000);

      // Pause the contract
      await usdReform.connect(pauser).pause();

      // Try to transfer from user1 to user2
      await expect(usdReform.connect(user1).transfer(user2.address, 100)).to.be.revertedWithCustomError(
        usdReform,
        'EnforcedPause',
      );
    });

    it('should allow transfers when unpaused', async function () {
      const { usdReform, governanceAdmin, supplyAdmin, pauser, minter, user1, user2 } = fixture;

      await usdReform.connect(governanceAdmin).grantRole(PAUSER_ROLE, pauser.address);
      await usdReform.connect(supplyAdmin).grantRole(MINTER_ROLE, minter.address);

      // Mint some tokens to user1
      await usdReform.connect(minter).mint(user1.address, 1000);

      // Pause the contract
      await usdReform.connect(pauser).pause();

      // Unpause the contract
      await usdReform.connect(pauser).unpause();

      // Transfer from user1 to user2
      await expect(usdReform.connect(user1).transfer(user2.address, 100))
        .to.emit(usdReform, 'Transfer')
        .withArgs(user1.address, user2.address, 100);
    });
  });

  describe('Upgradeability', function () {
    it('should allow accounts with UPGRADER_ROLE to upgrade the contract', async function () {
      const { usdReform, governanceAdmin, upgrader } = fixture;

      // Grant UPGRADER_ROLE to upgrader account
      await usdReform.connect(governanceAdmin).grantRole(UPGRADER_ROLE, upgrader.address);

      // Deploy new implementation (assuming USDReformV2 is a new version)
      const newUSDReformImplementation = await deployContract('USDReform', governanceAdmin);

      // Upgrade the contract
      await expect(usdReform.connect(upgrader).upgradeToAndCall(newUSDReformImplementation.target, ZERO_BYTES))
        .to.emit(usdReform, 'Upgraded')
        .withArgs(newUSDReformImplementation.target);

      // Check that the implementation address has been updated
      const implementationAddress = await usdReform.implementation();
      expect(implementationAddress).to.equal(newUSDReformImplementation.target);
    });

    it('should not allow accounts without UPGRADER_ROLE to upgrade the contract', async function () {
      const { usdReform, stranger, governanceAdmin } = fixture;

      // Deploy new implementation
      const newUSDReformImplementation = await deployContract('USDReform', governanceAdmin);

      // Try to upgrade the contract
      await expect(usdReform.connect(stranger).upgradeToAndCall(newUSDReformImplementation.target, ZERO_BYTES))
        .to.be.revertedWithCustomError(usdReform, 'AccessControlUnauthorizedAccount')
        .withArgs(stranger.address, UPGRADER_ROLE);
    });
  });

  describe('Transfer with Fee Management', function () {
    it('should apply mint fee when minting tokens', async function () {
      const { usdReform, supplyAdmin, minter, manager, reformWallet, user1 } = fixture;

      // Grant MINTER_ROLE to minter account
      await usdReform.connect(supplyAdmin).grantRole(MINTER_ROLE, minter.address);

      // Grant MANAGER_ROLE to manager account
      await usdReform.connect(supplyAdmin).grantRole(MANAGER_ROLE, manager.address);

      // Set mint fee to 100 bips (1%)
      await usdReform.connect(manager).setMintFeeInBips(100);

      // Mint 1000 tokens to user1
      // Expect that 1% fee (10 tokens) goes to reform wallet
      await expect(usdReform.connect(minter).mint(user1.address, 1000))
        .to.emit(usdReform, 'Transfer')
        .withArgs(ZERO_ADDRESS, user1.address, 990)
        .and.to.emit(usdReform, 'Transfer')
        .withArgs(ZERO_ADDRESS, reformWallet.address, 10);

      // Check balances
      expect(await usdReform.balanceOf(user1.address)).to.equal(990);
      expect(await usdReform.balanceOf(reformWallet.address)).to.equal(10);
    });

    it('should apply burn fee when burning tokens', async function () {
      const { usdReform, supplyAdmin, minter, manager, reformWallet, user1 } = fixture;

      // Grant MINTER_ROLE to minter account
      await usdReform.connect(supplyAdmin).grantRole(MINTER_ROLE, minter.address);

      // Grant MANAGER_ROLE to manager account
      await usdReform.connect(supplyAdmin).grantRole(MANAGER_ROLE, manager.address);

      // Set burn fee to 50 bips (0.5%)
      await usdReform.connect(manager).setBurnFeeInBips(50);

      // Mint tokens to user1 without mint fee
      await usdReform.connect(manager).setMintFeeInBips(0);
      await usdReform.connect(minter).mint(user1.address, 1000);

      // User1 burns 1000 tokens
      // Expect that 0.5% fee (5 tokens) goes to reform wallet, and 995 tokens are burned
      await expect(usdReform.connect(user1).burn(1000))
        .to.emit(usdReform, 'Transfer')
        .withArgs(user1.address, ZERO_ADDRESS, 995)
        .and.to.emit(usdReform, 'Transfer')
        .withArgs(user1.address, reformWallet.address, 5);

      // Check balances
      expect(await usdReform.balanceOf(user1.address)).to.equal(0);
      expect(await usdReform.balanceOf(reformWallet.address)).to.equal(5);
    });

    it('should not apply mint fee to accounts with CASHIN exemption', async function () {
      const { usdReform, supplyAdmin, minter, manager, reformWallet, user1 } = fixture;

      // Grant MINTER_ROLE to minter account
      await usdReform.connect(supplyAdmin).grantRole(MINTER_ROLE, minter.address);

      // Grant MANAGER_ROLE to manager account
      await usdReform.connect(supplyAdmin).grantRole(MANAGER_ROLE, manager.address);

      // Set mint fee to 100 bips (1%)
      await usdReform.connect(manager).setMintFeeInBips(100);

      // Exempt user1 from mint fees
      await usdReform.connect(manager).setFeeExemption(user1.address, ExemptionCategory.CASHIN);

      // Mint 1000 tokens to user1
      // Expect no fee applied
      await expect(usdReform.connect(minter).mint(user1.address, 1000))
        .to.emit(usdReform, 'Transfer')
        .withArgs(ZERO_ADDRESS, user1.address, 1000);

      // Check balances
      expect(await usdReform.balanceOf(user1.address)).to.equal(1000);
      expect(await usdReform.balanceOf(reformWallet.address)).to.equal(0);
    });

    it('should not apply burn fee to accounts with CASHOUT exemption', async function () {
      const { usdReform, supplyAdmin, minter, manager, reformWallet, user1 } = fixture;

      // Grant MINTER_ROLE to minter account
      await usdReform.connect(supplyAdmin).grantRole(MINTER_ROLE, minter.address);

      // Grant MANAGER_ROLE to manager account
      await usdReform.connect(supplyAdmin).grantRole(MANAGER_ROLE, manager.address);

      // Set burn fee to 50 bips (0.5%)
      await usdReform.connect(manager).setBurnFeeInBips(50);

      // Exempt user1 from burn fees
      await usdReform.connect(manager).setFeeExemption(user1.address, ExemptionCategory.CASHOUT);

      // Mint tokens to user1 without mint fee
      await usdReform.connect(manager).setMintFeeInBips(0);
      await usdReform.connect(minter).mint(user1.address, 1000);

      // User1 burns 1000 tokens
      // Expect no fee applied
      await expect(usdReform.connect(user1).burn(1000))
        .to.emit(usdReform, 'Transfer')
        .withArgs(user1.address, ZERO_ADDRESS, 1000);

      // Check balances
      expect(await usdReform.balanceOf(user1.address)).to.equal(0);
      expect(await usdReform.balanceOf(reformWallet.address)).to.equal(0);
    });

    it('should not apply any fees to accounts with ALL exemption', async function () {
      const { usdReform, supplyAdmin, minter, manager, reformWallet, user1 } = fixture;

      // Grant MINTER_ROLE to minter account
      await usdReform.connect(supplyAdmin).grantRole(MINTER_ROLE, minter.address);

      // Grant MANAGER_ROLE to manager account
      await usdReform.connect(supplyAdmin).grantRole(MANAGER_ROLE, manager.address);

      // Set mint fee and burn fee
      await usdReform.connect(manager).setMintFeeInBips(100);
      await usdReform.connect(manager).setBurnFeeInBips(50);

      // Exempt user1 from all fees
      await usdReform.connect(manager).setFeeExemption(user1.address, ExemptionCategory.ALL);

      // Mint 1000 tokens to user1
      // Expect no fee applied
      await expect(usdReform.connect(minter).mint(user1.address, 1000))
        .to.emit(usdReform, 'Transfer')
        .withArgs(ZERO_ADDRESS, user1.address, 1000);

      // User1 burns 1000 tokens
      // Expect no fee applied
      await expect(usdReform.connect(user1).burn(1000))
        .to.emit(usdReform, 'Transfer')
        .withArgs(user1.address, ZERO_ADDRESS, 1000);

      // Check balances
      expect(await usdReform.balanceOf(user1.address)).to.equal(0);
      expect(await usdReform.balanceOf(reformWallet.address)).to.equal(0);
    });

    it('should not apply fees during regular transfers', async function () {
      const { usdReform, supplyAdmin, minter, user1, user2 } = fixture;

      // Grant MINTER_ROLE to minter account
      await usdReform.connect(supplyAdmin).grantRole(MINTER_ROLE, minter.address);

      // Mint tokens to user1
      await usdReform.connect(minter).mint(user1.address, 1000);

      // Transfer tokens from user1 to user2
      await expect(usdReform.connect(user1).transfer(user2.address, 500))
        .to.emit(usdReform, 'Transfer')
        .withArgs(user1.address, user2.address, 500);

      // Check balances
      expect(await usdReform.balanceOf(user1.address)).to.equal(500);
      expect(await usdReform.balanceOf(user2.address)).to.equal(500);
    });
  });
});
