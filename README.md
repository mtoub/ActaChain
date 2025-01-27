# ActaChain: Revolutionizing Bond Trading with Blockchain and DocuSign  

## Inspiration  

The **bond trading market** particularly **bilateral trading** is evolving, with blockchain technology offering new opportunities for automation, transparency, and security. However, the adoption of these technologies is hindered by:  
- **High Legal Costs:** Blockchain and smart contracts are complex and often require extensive and costly legal review.  
- **Time-Consuming Processes:**Drafting contracts, ensuring compliance, and navigating the technical complexity of signing transactions often delay execution. Moreover, the average person typically lacks the knowledge or familiarity to operate a wallet or sign transactions in the Web3 space efficiently.
- **Limited Accessibility:** Smaller issuers and traders are often priced out of the market due to the legal and operational overhead.  

The **so|bond protocol** introduced blockchain-based bond trading with tokenized assets, leveraging smart contracts to automate trade execution. However, the adoption of **so|bond** has been slow due to the complexities of drafting and validating legal contracts, as well as the steep learning curve of blockchain workflows.  

**ActaChain** was born out of the need to bridge this gap by integrating **DocuSign**; a platform trusted by millions for digital contracts; with blockchain technology. By enabling issuers to sign legal contracts, collect signatures, and seamlessly execute blockchain-based smart contracts, we’ve created a solution that reduces costs significantly, simplifies workflows, and increases accessibility for all market participants.  

## Understanding so|bond and Terminology  
To fully appreciate our solution, it’s essential to understand **so|bond** and key concepts in this space:  

1. **What is so|bond?**  
   So|bond is a blockchain-based framework for tokenizing and trading bonds. Bonds are represented as **digital tokens**, enabling decentralized ownership transfer between participants. It is an open source framework that can be consulted at: [GitHub: so-bond](https://github.com/so-bond)

2. **Smart Contracts in so|bond:**  
   Smart contracts are pre-programmed protocols that execute transactions automatically when specified conditions are met. In so|bond, these are used to transfer tokenized bond ownership once trade terms are agreed upon.  

3. **The Problem:**  
   While so|bond simplifies bond trading, it still requires **legal contracts** to be signed between parties before executing the smart contract. This process is often manual, expensive, and time-consuming due to the legal reviews required for each transaction. Moreover, the average person typically lacks the knowledge or familiarity to operate a wallet or sign transactions in the Web3 space efficiently.

Our solution bridges this gap by integrating **DocuSign** with so|bond. It automates the legal process, triggering smart contracts on the blockchain once both parties have digitally signed the agreement.  

---
## What it does  
Our solution simplifies and automates the bond trading workflow by:  

1. **Simplifying Generation of Legal Contracts:**  
   - When a **Seller** requests to trade bonds, the **Issuer (B&D)** generates a customized **legal contract**.  Previously, these **legal contracts** required a blockchain-expert legal team to draft it, adding cost, complexity and delays.
Now, with **standardized legal contracts** that are pre-vetted, regulatory-compliant, and trusted, the process is streamlined. These contracts, customized with trade-specific details (e.g., buyer, seller, bond terms), are signed using a reliable and trusted method DocuSign, eliminating the need for specialized blockchain expertise.

2. **DocuSign Integration:**  
   - The Issuer uses **DocuSign** platform to send the legal contract to both the Buyer and Seller for review and signatures.  
   - DocuSign ensures a smooth user experience, leveraging its platform that users already trust and are familiar with.  

3. **Blockchain Smart Contract Execution:**  
   - Once both parties sign the legal contract via DocuSign, ActaChain automatically triggers a rewritten **smart contract** on the so|bond blockchain.  
   - This smart contract ensures the tokenized bond is transferred from the Seller to the Buyer securely and transparently and instantly after the docuSign signature event is triggered!  

4. **Recordkeeping and Compliance:**  
   - The signed legal documents, along with transaction details, are securely stored for audit and regulatory purposes. 

5.**Real-Time Trade Tracking**  
We have developed a user-friendly **Tracker** that seamlessly integrates **blockchain technology** and the **DocuSign API**. This tracker provides live updates on the status of the trade, ensuring transparency and allowing all parties to monitor progress in real time, from contract signing to final trade execution.

6. **ActaChain Registry and Oracle Integration:**  
   - **ActaChain Registry**: A smart contract deployed once to store **hashed information** about all trades and successful signatures. This reduces costs for issuers by eliminating the need for repeated deployments and acts as a single source of truth for all trade-related data.  
   - **Oracle (Using Chainlink)**: Adds an extra layer of security by validating signatures and contract details via the **DocuSign API**. The Oracle ensures data integrity by fetching and verifying off-chain data securely. Once validation is complete, the Oracle triggers the **so|bond Smart Contract** to execute the trade.
---

### **Workflow**  

Here’s how ActaChain works step-by-step:  

1. **Trade Initiation:**  
   - The Seller approaches the Issuer (e.g., a Bank) to initiate a bond trade.  
   - The Issuer drafts a legal contract using pre-vetted templates in DocuSign and includes the trade details (buyer, seller, amount, terms).  

2. **Electronic Signatures:**  
   - The Issuer uses DocuSign to send the contract to both the Buyer and Seller for electronic signatures.  
   - Both parties can review, sign, and finalize the contract on DocuSign’s platform.  

3. **Webhook Trigger:**  
   - Upon signature completion, DocuSign triggers a Webhook to notify the ActaChain backend.  
   - The backend verifies the event and triggers the blockchain smart contract to:  
     - Validate the signatures.  
     - Execute the bond trade, transferring the bond to the Buyer and the payment to the Seller.  

4. **ActaChain Registry and Oracle Verification:**  
   - The **Smart Contract** requests verification from the **ActaChain Registry**.  
   - The **Registry** delegates the validation request to the **Oracle**.  
   - The **Oracle** queries the **DocuSign API** to validate the signatures and contract details.  
   - The **Oracle** returns the validation results to the **Registry**.  
   - The **Registry** stores the hashed validation results and notifies the **Smart Contract** of successful verification.  

5. **Smart Contract Execution:**  
   - The **Smart Contract** transfers tokenized bonds to the **Buyer**.  
   - The **Smart Contract** transfers payment to the **Seller**.  

6. **Completion and Audit:**  
   - The **Backend** fetches the certificate of completion and envelope from **DocuSign** via a Webhook.  
   - The signed contract, certificate of completion, and envelopes are stored for audit purposes.  

### **Key Updates to the Workflow**  

To further enhance security and reduce costs, we’ve introduced two critical components:  

1. **ActaChain Registry:**  
   - A centralized smart contract deployed once to store **hashed information** about all trades and successful signatures.  
   - Reduces costs for issuers by eliminating the need for repeated deployments.  
   - Acts as a single source of truth for all trade-related data.  

2. **Oracle (Using Chainlink):**  
   - Adds an extra layer of security by validating signatures and contract details via the **DocuSign API**.  
   - Ensures data integrity by fetching and verifying off-chain data securely.  
   - Once validation is complete, the Oracle triggers the **ActaChain/so|bond Smart Contract** to execute the trade.   

The workflow can also be easily understood from the following Sequence Diagram:

![ActaChain Sequence Diagram](./images/ActaChain-Sequence-Diagram.png)

## How We Built It  

### **Technologies Used**  

- **DocuSign API:** For contract management, electronic signatures, and Webhook notifications.  
- **so|bond Protocol:** Blockchain infrastructure designed for tokenized bond trading and automated execution.  
- **Custom Smart Contracts:** Re-designed so|bond smart contracts to integrate signature validation and enable automated execution.  
- **Backend Infrastructure:** Handles DocuSign Webhook events, validates data, and communicates with the blockchain smart contracts.  
- **Demo Interface:** A simple user interface showcasing the trade process with milestones such as:  
   - **Awaiting Signatures (Buyer and Seller Paths)**  
   - **Signatures Completed**  
   - **Trade Execution**  
   - **Transaction Details (Hash and On-Chain Information)**  

### **Implementation Process**  

1. **Webhook Event Handling:** Developed a backend that listens to DocuSign Webhooks and triggers smart contracts upon signature completion.  
2. **Smart Contract Validation:** Adapted so|bond’s existing contracts to validate signatures and execute trades securely.  
3. **User Experience Optimization:** Focused on leveraging DocuSign’s familiar interface to minimize complexity and ensure user adoption.
4. **Front-End and UI Development:** Created a user-friendly front-end interface and a UI tracker that integrates blockchain technology and DocuSign API, providing live updates on trade status and enhancing transparency.

---

## Challenges We Ran Into  

1. **Smart Contract Adaptation:**  
   - Modifying so|bond’s smart contracts to handle off-chain signatures while maintaining security was a key technical challenge.  

2. **Webhook Integration:**  
   - Ensuring reliable event notifications from DocuSign required rigorous testing and error handling.  

3. **Balancing Simplicity and Complexity:**  
   - We had to simplify the legal and blockchain workflows while ensuring compliance and transparency.  

4. **Cost Optimization:**  
   - Reducing costs for smaller issuers while maintaining high standards of security and functionality was a critical focus.  

## Accomplishments That We’re Proud Of  

1. **End-to-End Automation:**  
   - Fully automated the bond trading workflow from legal agreement to blockchain execution.  

2. **Cost and Time Savings:**  
   - Eliminated the need for expensive legal teams, reducing entry barriers for smaller issuers.  

3. **User-Centric Design:**  
   - Leveraged DocuSign’s platform to provide a familiar, easy-to-use experience.  

4. **Blockchain Integration:**  
   - Successfully integrated a trusted legal platform with cutting-edge blockchain technology.  

---

## What We Learned  

1. **The Importance of User Familiarity:**  
   - Integrating with platforms like DocuSign ensures that users can adopt blockchain solutions without a steep learning curve.  

2. **Legal-Tech Synergy:**  
   - Combining legal contract management with blockchain execution unlocks immense potential for financial markets.  

3. **Efficiency Through Automation:**  
   - Automating workflows not only saves costs but also builds trust and transparency in traditionally opaque markets.  

4. **Adoption Barriers:**  
   - Addressing cost and complexity is critical for increasing blockchain adoption in traditional industries.  

---

## What’s Next for ActaChain  

1. **Enhanced Contract Templates:**  
   - Develop a library of customizable legal contract templates for issuers to use.  

2. **Multi-Chain Support:**  
   - Expand ActaChain to support multiple blockchain networks for broader flexibility.  

3. **Advanced Analytics:**  
   - Provide issuers and traders with insights on market trends and trade execution metrics.  

4. **Partnerships and Real-World Deployment:**  
   - Partner with banks, financial institutions, and bond issuers to implement ActaChain in live markets.  

5. **Scalability and Open Source Development:**  
   - Optimize the system to handle larger volumes and encourage open-source contributions to improve the platform.  

---

**ActaChain** transforms bond trading by integrating trusted legal contract workflows with secure and transparent blockchain technology. By reducing costs, streamlining processes, and ensuring trust, it paves the way for a more accessible and efficient financial ecosystem.  
