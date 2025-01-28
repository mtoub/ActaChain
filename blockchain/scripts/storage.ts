import { ethers } from 'ethers';

async function computeCustomHash(baseString: string) {
  const baseStringHash = ethers.keccak256(ethers.toUtf8Bytes(baseString));

  const baseHashBigInt = BigInt(baseStringHash);
  const baseHashMinusOne = baseHashBigInt - 1n;

  const abiCoder = new ethers.AbiCoder();
  const encodedData = abiCoder.encode(['uint256'], [baseHashMinusOne]);

  const finalHash = ethers.keccak256(encodedData);

  const ffUint256 = 0xffn;
  const mask = (1n << 256n) - 1n;
  const invertedFF = ~ffUint256 & mask;

  const finalHashBigInt = BigInt(finalHash);
  const resultBigInt = finalHashBigInt & invertedFF;
  const resultHex = `0x${resultBigInt.toString(16).padStart(64, '0')}`;

  return resultHex;
}

const baseString = 'swift.storage.EIP712';

async function main() {
  const slot = await computeCustomHash(baseString).catch(console.error);
  console.log('### Storage Slot: ', slot);
}

main();
