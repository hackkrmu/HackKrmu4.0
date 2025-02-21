import os
import json
from datetime import datetime

# Path where evidence will be stored
EVIDENCE_FOLDER = 'evidence_data'
EVIDENCE_METADATA_FILE = os.path.join(EVIDENCE_FOLDER, 'evidence_metadata.json')

# Ensure the evidence folder exists
if not os.path.exists(EVIDENCE_FOLDER):
    os.makedirs(EVIDENCE_FOLDER)

# Function to load existing evidence metadata
def load_evidence_metadata():
    if os.path.exists(EVIDENCE_METADATA_FILE):
        with open(EVIDENCE_METADATA_FILE, 'r') as file:
            return json.load(file)
    return []

# Function to save evidence metadata
def save_evidence_metadata(metadata):
    with open(EVIDENCE_METADATA_FILE, 'w') as file:
        json.dump(metadata, file)

# Function to collect evidence and store it locally
def collect_evidence(trigger_type, data):
    # Load existing metadata
    metadata = load_evidence_metadata()
    
    # Create a unique evidence ID
    evidence_id = len(metadata) + 1

    # Create evidence details
    evidence_details = {
        'id': evidence_id,
        'trigger_type': trigger_type,
        'description': data.get('description', ''),
        'submitted_by': data.get('submitted_by', 'system'),
        'timestamp': datetime.now().strftime('%Y-%m-%d %H:%M:%S'),
        'data': data
    }

    # Save evidence details to metadata
    metadata.append(evidence_details)
    save_evidence_metadata(metadata)

    # Save the raw data as a JSON file
    evidence_file = os.path.join(EVIDENCE_FOLDER, f'evidence_{evidence_id}.json')
    with open(evidence_file, 'w') as file:
        json.dump(evidence_details, file)
    
    print(f"Evidence collected and saved with ID: {evidence_id}")
    return evidence_id

# Example usage of the collect_evidence function
if __name__ == "__main__":
    example_data = {
        'description': 'Suspicious login attempt detected.',
        'submitted_by': 'admin',
        'login_attempts': 5,
        'login_times': ['2024-08-24 12:00:00', '2024-08-24 12:01:00']
    }
    collect_evidence('anomaly', example_data)
