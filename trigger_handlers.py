import hashlib
from datetime import datetime, timedelta
from evidence_collection import collect_evidence
from web3 import Web3
import os
import json

# Function to calculate a file's hash (using SHA256)
def calculate_file_hash(file_path):
    sha256_hash = hashlib.sha256()
    with open(file_path, "rb") as f:
        for byte_block in iter(lambda: f.read(4096), b""):
            sha256_hash.update(byte_block)
    return sha256_hash.hexdigest()

# Example list of known malicious file hashes (to be expanded in a real-world scenario)
known_malicious_hashes = [
    "3ac674216f3e15c761ee1a5e255f067937bfca57d4c32bbfef11f2a4602d2c00",  # Example hash
]

# Function to check for user activity anomalies
def check_for_anomalies(user_activity):
    if user_activity['login_attempts'] > 3 and within_last_5_minutes(user_activity['login_times']):
        trigger_evidence_collection('anomaly', user_activity)

# Function to check for suspicious file uploads
def check_for_suspicious_file_upload(file):
    file_hash = calculate_file_hash(file['path'])  # Calculate the file's hash
    if file['size'] > 100 * 1024 * 1024 or file_hash in known_malicious_hashes:
        trigger_evidence_collection('file_upload', file)

# Helper function to determine if any login attempts were made within the last 5 minutes
def within_last_5_minutes(times):
    now = datetime.now()
    five_minutes_ago = now - timedelta(minutes=5)
    return any(time > five_minutes_ago for time in times)

# Function to trigger evidence collection and interact with the smart contract
def trigger_evidence_collection(trigger_type, data):
    # Collect evidence and store it in the system
    evidence_id = collect_evidence(trigger_type, data)
    
    # Log the evidence collection
    print(f"Collected evidence for {trigger_type}: {data}")
    
    # Interact with the blockchain to log the evidence collection
    log_evidence_to_blockchain(evidence_id, data)

# Blockchain interaction setup
ganache_url = "http://127.0.0.1:7545"  # Ganache default URL
web3 = Web3(Web3.HTTPProvider(ganache_url))

if not web3.is_connected():
    raise Exception("Error connecting to Web3 provider")

# Load the smart contract ABI and address
contract_path = os.path.join(os.path.dirname(__file__), 'build', 'contracts', 'MyContract.json')
with open(contract_path) as f:
    contract_data = json.load(f)
    contract_abi = contract_data['abi']
    contract_address = '0xB84A9D720f2C6C86F2FFf76be893d175c568e1a9'  # Replace with your contract address
    contract = web3.eth.contract(address=contract_address, abi=contract_abi)

# Function to log evidence to the blockchain
def log_evidence_to_blockchain(evidence_id, data):
    try:
        tx_hash = contract.functions.logEvidence(evidence_id, data['description'], data['submitted_by']).transact()
        web3.eth.wait_for_transaction_receipt(tx_hash)
        print(f"Logged evidence to blockchain with transaction hash: {tx_hash.hex()}")
    except Exception as e:
        print(f"Error logging evidence to blockchain: {e}")

