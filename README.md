# Triage-O-Matic

**Triage-O-Matic** is a decentralized web application for cyber forensic investigations, utilizing Flask and an Ethereum smart contract deployed on a local Ganache blockchain. It offers comprehensive tools for managing and analyzing digital evidence while ensuring secure transaction handling through blockchain technology.

## Features

- **Web3 Integration**: Seamlessly connects to an Ethereum smart contract via Web3.
- **Digital Forensics Dashboard**: Efficiently manage and analyze digital evidence.
- **Blockchain Integration**: Leverages the Ethereum blockchain for secure transaction management.
- **PDF, Image, and Document Processing**: Extracts text from PDFs, images, and document files.
- **Smart Contract Management**: Facilitates interaction with Ethereum smart contracts using Web3.py.

## Prerequisites

Ensure the following software is installed to run the application:

- [Node.js](https://nodejs.org/) (v16.0.0 or later)
- [Ganache](https://www.trufflesuite.com/ganache) (for local Ethereum blockchain)
- [Python](https://www.python.org/) (v3.7 or later)
- [Flask](https://flask.palletsprojects.com/en/2.0.x/)
- [Web3.py](https://web3py.readthedocs.io/en/stable/)
- Required Python libraries (refer to `requirements.txt`)

## Installation

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/triage-o-matic.git
cd triage-o-matic
```
### 2. Set Up a Virtual Environment
```bash
# For Windows
python -m venv env
env\Scripts\activate

# For Mac/Linux
python3 -m venv env
source env/bin/activate
```
### 3. Install Dependencies
```bash
pip install -r requirements.txt
```
### 4. Start Ganache
Run Ganache locally to create a local Ethereum blockchain:

```bash
ganache-cli -p 7545
```
### 5. Compile and Deploy Smart Contracts
```bash
truffle compile
truffle migrate
```
Update the contract_address in app.py with the correct smart contract address.
### 6. Run the Flask Application
Start the Flask server:
```bash
python app.py
```
Open your browser and navigate to http://127.0.0.1:5000/.

### Manual Installation of Libraries
If certain libraries are not installed via requirements.txt, manually install them:
```bash
pip install Flask web3 python-magic Pillow pytesseract PyPDF2 pdfminer.six python-docx pdfkit pandas

# For Linux (Debian/Ubuntu)

sudo apt install tesseract-ocr

# For Windows (download and set the path)
```
