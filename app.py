import datetime
from fileinput import filename
import os
import json
import logging
import shutil
from flask import Flask, abort, jsonify, render_template, request, redirect, send_file, send_from_directory, url_for, session, flash
import magic
from werkzeug.utils import secure_filename
from web3 import Web3
import hashlib
from PIL import Image
import pytesseract
from pdfminer.high_level import extract_text
from docx import Document
import PyPDF2
import io
import pdfkit
import pandas as pd


# Setup logging
logging.basicConfig(level=logging.DEBUG)
# Initialize Flask app
app = Flask(__name__)
app.secret_key = os.urandom(24)  # Generate a strong secret key


db_config = {
    'user': 'your_mysql_user',
    'password': 'your_mysql_password',
    'host': 'localhost',
    'database': 'your_database_name'
}

# Define paths and configure upload folder
UPLOAD_FOLDER = 'uploads'
METADATA_FILE = 'metadata.json'
CHAIN_OF_CUSTODY_FILE = 'chain_of_custody.json'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

def load_metadata():
    if os.path.exists(METADATA_FILE) and os.path.getsize(METADATA_FILE) > 0:
        with open(METADATA_FILE, 'r') as file:
            return json.load(file)
    return {}

# Create upload folder if it doesn't exist
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

# Configure logging
logging.basicConfig(filename='app.log', level=logging.DEBUG,
                    format='%(asctime)s - %(levelname)s - %(message)s')

def load_json_file(filepath):
    """Load JSON data from a file."""
    if os.path.exists(filepath):
        try:
            with open(filepath, 'r') as file:
                return json.load(file)
        except json.JSONDecodeError:
            return []
    return []

def save_json_file(filepath, data):
    """Save JSON data to a file."""
    with open(filepath, 'w') as file:
        json.dump(data, file, indent=4)

# Web3 connection setup
ganache_url = "http://127.0.0.1:7545"  # Ganache default URL
web3 = Web3(Web3.HTTPProvider(ganache_url))

# Check connection to Ganache
if not web3.is_connected():
    raise Exception("Error connecting to Web3 provider")

# Load the smart contract ABI and address
contract_path = os.path.join(os.path.dirname(__file__), 'build', 'contracts', 'MyContract.json')
with open(contract_path) as f:
    contract_data = json.load(f)
    contract_abi = contract_data['abi']
    contract_address = '0xb3aD53fF33aaAfecf982f38540dc3d82D8b75A5B'  # Replace with your contract address
    contract = web3.eth.contract(address=contract_address, abi=contract_abi)

# Dummy credentials for demonstration
VALID_USERS = {
    'admin': 'password',
    'user1': 'password123',
    'user2': 'securepassword'
}

@app.route('/')
def home():
    if 'username' in session:
        return redirect(url_for('dashboard'))
    return redirect(url_for('login'))


@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        if username in VALID_USERS and VALID_USERS[username] == password:
            session['username'] = username
            flash('Login successful!', 'success')
            logging.info(f"User {username} logged in successfully")
            return redirect(url_for('dashboard'))
        else:
            flash('Invalid credentials. Please try again.', 'error')
    return render_template('login.html')

@app.route('/signup', methods=['POST'])
def signup():
    flash('Signup successful! You can now log in.', 'success')
    return redirect(url_for('login'))

@app.route('/logout')
def logout():
    session.pop('username', None)
    flash('You have been logged out.', 'success')
    return redirect(url_for('login'))

@app.route('/dashboard')
@app.route('/dashboard/<int:evidence_id>')
def dashboard(evidence_id=None):
    if 'username' not in session:
        return redirect(url_for('login'))

    if evidence_id is None:
        # Default or test data for the dashboard
        incident_details = {
            'overview': 'Overview of the incident management process.',
            'timeline': [
                "Suspicious login attempt",
                "Data exfiltration detected"
            ],
            'affected_systems': [
                {'name': 'Server 1', 'vulnerability': 'Open Port'},
                {'name': 'Workstation 2', 'vulnerability': 'Outdated Software'}
            ],
            'performance_metrics': [
                {'name': 'Accuracy', 'value': '95%'},
                {'name': 'Precision', 'value': '90%'},
                {'name': 'Recall', 'value': '85%'}
            ],
            'rules': [
                "Rule 1: Monitor login attempts",
                "Rule 2: Alert on data exfiltration"
            ],
            'consensus_algorithm': 'Proof of Stake',
            'network_latency': 200,
            'current_block': 123456,
            'evidence_id': 12345,
            'immutability_status': 'Verified - No tampering detected',
            'siem_last_log': '2024-08-23 14:00:00',
            'edr_last_event': '2024-08-23 13:45:00'
        }

        anomaly_alerts = [
            {'message': 'Suspicious login attempt', 'severity': 'High', 'timestamp': '2024-08-24 12:34:56'},
            {'message': 'Data exfiltration detected', 'severity': 'Critical', 'timestamp': '2024-08-24 13:22:18'}
        ]

        uploaded_files = load_json_file(METADATA_FILE)
        coc_entries = load_json_file(CHAIN_OF_CUSTODY_FILE)

        return render_template('dashboard.html', incident_details=incident_details, anomaly_alerts=anomaly_alerts, uploaded_files=uploaded_files, coc_entries=coc_entries)
    
    # Data for a specific evidence_id
    incident_details = get_incident_details(evidence_id)
    anomaly_alerts = get_anomaly_alerts(evidence_id)
    evidence_chain = get_evidence_chain(evidence_id)
    uploaded_files = get_uploaded_files(evidence_id)
    coc_entries = get_chain_of_custody_entries(evidence_id)
    smart_contract_interactions = get_smart_contract_interactions(evidence_id)

    return render_template(
        'dashboard.html',
        evidence_id=evidence_id,
        incident_details=incident_details,
        anomaly_alerts=anomaly_alerts,
        evidence_chain=evidence_chain,
        uploaded_files=uploaded_files,
        coc_entries=coc_entries,
        smart_contract_interactions=smart_contract_interactions
    )
    
def get_incident_details(evidence_id):
    return {
        'overview': f'Incident overview for evidence ID: {evidence_id}',
        'timeline': [
            "Suspicious login attempt",
            "Data exfiltration detected"
        ],
        'affected_systems': [
            {'name': 'Server 1', 'vulnerability': 'Open Port'},
            {'name': 'Workstation 2', 'vulnerability': 'Outdated Software'}
        ],
        'performance_metrics': [
            {'name': 'Accuracy', 'value': '95%'},
            {'name': 'Precision', 'value': '90%'},
            {'name': 'Recall', 'value': '85%'}
        ],
        'rules': [
            "Rule 1: Monitor login attempts",
            "Rule 2: Alert on data exfiltration"
        ],
        'consensus_algorithm': 'Proof of Stake',
        'network_latency': 200,
        'current_block': 123456,
        'evidence_id': evidence_id,
        'immutability_status': 'Verified - No tampering detected',
        'siem_last_log': '2024-08-23 14:00:00',
        'edr_last_event': '2024-08-23 13:45:00'
    }

def get_anomaly_alerts(evidence_id):
    return [
        {'message': 'Suspicious login attempt', 'severity': 'High', 'timestamp': '2024-08-24 12:34:56'},
        {'message': 'Data exfiltration detected', 'severity': 'Critical', 'timestamp': '2024-08-24 13:22:18'}
    ]

def get_evidence_chain(evidence_id):
    return [
        {'step': 'Data Collection', 'status': 'Complete', 'timestamp': '2024-08-24 10:00:00'},
        {'step': 'Analysis', 'status': 'In Progress', 'timestamp': '2024-08-24 12:00:00'}
    ]

def get_uploaded_files(evidence_id):
    return load_json_file(METADATA_FILE)

def get_chain_of_custody_entries(evidence_id):
    return load_json_file(CHAIN_OF_CUSTODY_FILE)

def get_smart_contract_interactions(evidence_id):
    return {
        'contract': 'EvidenceContract',
        'interactions': [
            {'type': 'Verification', 'status': 'Verified', 'timestamp': '2024-08-24 11:00:00'}
        ]
    }

@app.route('/reset_coc', methods=['POST'])
def reset_coc():
    if 'username' not in session:
        return redirect(url_for('login'))

    try:
        # Reset Chain of Custody file
        if os.path.exists(CHAIN_OF_CUSTODY_FILE):
            os.remove(CHAIN_OF_CUSTODY_FILE)
        
        # Create an empty Chain of Custody file
        open(CHAIN_OF_CUSTODY_FILE, 'w').close()

        flash('Chain of Custody data has been reset.', 'success')
    except Exception as e:
        logging.error(f'Error resetting Chain of Custody data: {e}')
        flash('Error resetting Chain of Custody data. Please try again.', 'error')

    return redirect(url_for('dashboard'))

@app.route('/verify_immutability/<int:evidence_id>', methods=['GET'])
def verify_immutability(evidence_id):
    if 'username' not in session:
        return redirect(url_for('login'))

    try:
        verification_details = contract.functions.getEvidence(evidence_id).call()
        details = {
            'id': verification_details[0],
            'description': verification_details[1],
            'submittedBy': verification_details[2],
            'isVerified': verification_details[3],
            'timestamp': verification_details[4]
        }
        if details['isVerified']:
            flash('Evidence is immutable.', 'success')
        else:
            flash('Evidence has been tampered with.', 'error')
    except Exception as e:
        flash(f"Error verifying immutability: {e}", 'error')

    return redirect(url_for('dashboard', evidence_id=evidence_id))

@app.route('/reports')
def reports():
    return render_template('reports.html', incidents=incidents.values())

@app.route('/export/<format>', methods=['GET'])
def export(format):
    if format not in ['PDF', 'CSV', 'Excel']:
        return 'Unsupported format', 400

    # Convert data to DataFrame
    df = pd.DataFrame(incidents)

    if format == 'CSV':
        output = io.StringIO()
        df.to_csv(output, index=False)
        output.seek(0)
        return send_file(io.BytesIO(output.getvalue().encode()), mimetype='text/csv', as_attachment=True, attachment_filename='report.csv')

    elif format == 'Excel':
        output = io.BytesIO()
        df.to_excel(output, index=False, engine='xlsxwriter')
        output.seek(0)
        return send_file(output, mimetype='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', as_attachment=True, attachment_filename='report.xlsx')

    elif format == 'PDF':
        html = render_template('pdf_report.html', data=incidents)
        pdf = pdfkit.from_string(html, False)
        return send_file(io.BytesIO(pdf), mimetype='application/pdf', as_attachment=True, attachment_filename='report.pdf')


@app.route('/profile')
def profile():
    if 'username' not in session:
        return redirect(url_for('login'))
    return render_template('profile.html')

@app.route('/incidents')
def incidents():
    if 'username' not in session:
        return redirect(url_for('login'))
    
    # Convert dict_values to a list
    incidents_list = list(incidents.values())
    return render_template('incidents.html', incidents=incidents_list)


@app.route('/api/incident/<incident_id>', methods=['GET'])
def get_incident(incident_id):
    incident = incidents.get(incident_id)
    if not incident:
        return jsonify({'error': 'Incident not found'}), 404
    
    analysis_results = [e['analysis_result'] for e in incident['evidence']]
    evidence = incident['evidence']
    
    return jsonify({
        'incident': incident,
        'analysis_results': analysis_results,
        'evidence': evidence
    })

@app.route('/api/evidence/<evidence_id>', methods=['GET'])
def get_evidence_details(evidence_id):
    for incident in incidents.values():
        for evidence in incident['evidence']:
            if evidence['id'] == evidence_id:
                return jsonify(evidence)
    return jsonify({'error': 'Evidence not found'}), 404


@app.route('/api/evidence/<evidence_id>/status', methods=['PATCH'])
def update_evidence_status(evidence_id):
    data = request.json
    new_status = data.get('status')
    
    # Update status in-memory
    for incident in incidents.values():
        for evidence in incident['evidence']:
            if evidence['id'] == evidence_id:
                evidence['status'] = new_status
                break
    
    return jsonify({'message': 'Status updated successfully'})


@app.route('/api/incident/<incident_id>/comments', methods=['POST'])
def post_comment(incident_id):
    data = request.json
    comment = data.get('comment')
    if not comment:
        return jsonify({'error': 'Comment cannot be empty'}), 400
    
    incident = incidents.get(incident_id)
    if not incident:
        return jsonify({'error': 'Incident not found'}), 404
    
    incident['comments'].append(comment)
    return jsonify({'message': 'Comment added successfully'})



# In-memory storage
# In-memory storage
incidents = {
    'INC123456': {
        'id': 'INC123456',
        'severity': 'High',
        'status': 'Safe',  # Updated dynamically
        'start_time': '2024-09-01T10:00:00Z',
        'end_time': None,  # Updated when all evidence is analyzed
        'affected_systems': ['System1', 'System2'],
        'description': 'Example incident description.',
        'root_cause': 'Example root cause.',
        'timeline': [
            {'time': '2024-08-31 06:35:43', 'event': 'Incident escalated.'},
            {'time': '2024-08-31 06:38:15', 'event': 'Incident escalated.'},
            {'time': '2024-08-31 06:40:00', 'event': 'Incident further analyzed.'}
        ],
        'evidence': [
            {
                'id': 'EVID001', 
                'name': 'Screenshot_2024-06-14_024058.png', 
                'timestamp': 'Date - 2024-09-01 Time - 10:30:00Z', 
                'timeline': 'Collected logs', 
                'analysis_result': 'Image is large. (Analyzed on 2024-08-31 15:14:41)',
                'description': 'This screenshot captures the logs during the incident, highlighting potential unauthorized access attempts.'
            },
            {
                'id': 'EVID002', 
                'name': 'My_Card.pdf', 
                'timestamp': 'Date - 2024-09-01 Time - 11:00:00Z', 
                'timeline': 'Captured screenshot', 
                'analysis_result': 'No issues found in PDF. (Analyzed on 2024-08-31 07:00:41)',
                'description': 'The PDF contains details of the system configuration during the time of the incident.'
            },
            {
                'id': 'EVID003', 
                'name': 'Main.pdf', 
                'timestamp': 'Date - 2024-09-01 Time - 11:00:00Z', 
                'timeline': 'Captured screenshot', 
                'analysis_result': 'Pending',
                'description': 'This document contains logs that require further analysis to determine potential security breaches.'
            }
        ],
        'comments': []
    }
}

# Function stubs
def get_incident_by_id(incident_id):
    return incidents.get(incident_id, {})

def get_analysis_results(incident_id):
    # This should ideally be replaced with real analysis results from your data source
    incident = get_incident_by_id(incident_id)
    if incident:
        return {
            'incident_id': incident_id,
            'results': 'Analysis indicates potential data breach.'
        }
    return {'error': 'Incident not found'}

def get_evidence_by_incident(incident_id):
    incident = get_incident_by_id(incident_id)
    return incident.get('evidence', [])

def update_evidence_status_in_db(evidence_id, new_status):
    # Simulate status update in the in-memory storage
    for incident in incidents.values():
        for evidence in incident['evidence']:
            if evidence['id'] == evidence_id:
                evidence['status'] = new_status
                return True
    return False

def add_comment_to_incident(incident_id, comment):
    incident = get_incident_by_id(incident_id)
    if incident:
        incident['comments'].append({
            'timestamp': datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S'),
            'comment': comment
        })





@app.route('/change_password')
def change_password():
    if 'username' not in session:
        return redirect(url_for('login'))
    return render_template('change_password.html')

@app.route('/recent_emails')
def recent_emails():
    if 'username' not in session:
        return redirect(url_for('login'))
    return render_template('recent_emails.html')

# Sample data for evidence
evidence_data = [
]

@app.route('/evidence')
def evidence() :
    if 'username' not in session:
        return redirect(url_for('login'))

    # Load evidence data
    evidence_data = load_json_file(METADATA_FILE)
    return render_template('evidence.html', evidence_data=evidence_data)

@app.route('/view_evidence/<int:index>')
def view_evidence(index):
    evidence_data = load_json_file(METADATA_FILE)
    if index < 1 or index > len(evidence_data):
        return "Evidence not found", 404
    evidence = evidence_data[index - 1]
    logging.debug(f"Evidence ID: {index}, Description: {evidence.get('description')}")
    return render_template('view_evidence.html', evidence=evidence, index=index)




def get_file_type(filename):
    file_extension = os.path.splitext(filename)[1].lower()
    if file_extension in ['.txt', '.log', '.csv']:
        return "Text File"
    elif file_extension in ['.jpg', '.jpeg', '.png', '.gif']:
        return "Image File"
    elif file_extension == '.pdf':
        return "PDF File"
    else:
        return "Unknown File Type"

def analyze_text_file(file_path):
    try:
        with open(file_path, 'r') as file:
            content = file.read()
            if "suspicious" in content:
                return "Suspicious content found in text file."
            return "No issues found in text file."
    except Exception as e:
        logging.error(f"Error analyzing text file: {e}")
        return f"Analysis failed: {e}"

def analyze_image(file_path):
    try:
        image = Image.open(file_path)
        if image.size[0] > 1000 or image.size[1] > 1000:
            return "Image is large."
        return "No issues found in image."
    except Exception as e:
        logging.error(f"Error analyzing image file: {e}")
        return f"Analysis failed: {e}"

def analyze_pdf(file_path):
    try:
        with open(file_path, 'rb') as file:
            reader = PyPDF2.PdfReader(file)
            if len(reader.pages) > 10:
                return "Large PDF with more than 10 pages."
            return "No issues found in PDF."
    except Exception as e:
        logging.error(f"Error analyzing PDF file: {e}")
        return f"Analysis failed: {e}"

def perform_analysis(filename):
    file_path = os.path.join(UPLOAD_FOLDER, filename)
    logging.debug(f"Analyzing file at: {file_path}")

    if not os.path.exists(file_path):
        logging.error(f"File not found: {file_path}")
        return f"Analysis failed: File {file_path} does not exist"

    file_extension = os.path.splitext(filename)[1].lower()

    if file_extension in ['.txt', '.log', '.csv']:
        analysis_result = analyze_text_file(file_path)
    elif file_extension in ['.jpg', '.jpeg', '.png', '.gif']:
        analysis_result = analyze_image(file_path)
    elif file_extension == '.pdf':
        analysis_result = analyze_pdf(file_path)
    else:
        analysis_result = "File type not supported or no issues found."

    timestamp = datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S')
    return f"{analysis_result} (Analyzed on {timestamp})"

@app.route('/analyze_evidence/<filename>', methods=['GET', 'POST'])
def analyze_evidence(filename):
    analysis_result = perform_analysis(filename)
    
    # Update the status in the metadata
    metadata = load_json_file(METADATA_FILE)
    file_type = get_file_type(filename)
    for file_metadata in metadata:
        if file_metadata['filename'] == filename:
            file_metadata['status'] = analysis_result
            file_metadata['file_type'] = file_type
            break
    save_json_file(METADATA_FILE, metadata)
    
    # Create the evidence dictionary
    evidence = {
        'file_name': filename,
        'file_type': file_type,
        'created_on': datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S'),
    }
    
    # Update in-memory storage
    for incident in incidents.values():
        for ev in incident['evidence']:
            if ev['name'] == filename:
                ev['analysis_result'] = analysis_result
                break
    
    return render_template('analyze_evidence.html', evidence=evidence, result=analysis_result)


@app.route('/download/<filename>')
def download_evidence(filename):
    try:
        return send_from_directory(UPLOAD_FOLDER, filename)
    except FileNotFoundError:
        abort(404)


@app.route('/share_evidence/<int:index>')
def share_evidence(index):
    evidence_data = load_json_file(METADATA_FILE)
    if index < 1 or index > len(evidence_data):
        return "Evidence not found", 404
    evidence = evidence_data[index - 1]
    return render_template('share_evidence.html', evidence=evidence, index=index)



@app.route('/linked_accounts')
def linked_accounts():
    if 'username' not in session:
        return redirect(url_for('login'))
    return render_template('linked_accounts.html')

@app.route('/logged_in_accounts')
def logged_in_accounts():
    if 'username' not in session:
        return redirect(url_for('login'))
    return render_template('logged_in_accounts.html')

@app.route('/settings')
def settings():
    if 'username' not in session:
        return redirect(url_for('login'))
    return render_template('settings.html')

# Function to add notifications with a timestamp
def add_notification(message):
    notification_menu = session.get('notifications', [])
    timestamp = datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S')
    notification_menu.append(f"{message} - {timestamp}")
    session['notifications'] = notification_menu

@app.route('/notifications')
def notifications():
    return jsonify(session.get('notifications', []))

@app.route('/add_coc_entry', methods=['POST'])
def add_coc_entry():
    try:
        # Get form data
        evidence_id = request.form.get('evidence_id')
        handler_name = request.form.get('handler_name')
        timestamp = datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        action = request.form.get('action')

        # Validate inputs
        if not evidence_id or not handler_name or not action:
            flash('All fields are required.', 'error')
            return redirect(url_for('dashboard'))

        # Prepare new entry
        new_entry = {
            'evidence_id': evidence_id,
            'handler_name': handler_name,
            'timestamp': timestamp,
            'action': action
        }

        # Load existing Chain of Custody entries
        coc_entries = load_json_file(CHAIN_OF_CUSTODY_FILE)
        coc_entries.append(new_entry)
        save_json_file(CHAIN_OF_CUSTODY_FILE, coc_entries)

        flash('Chain of Custody entry added successfully.', 'success')
    except Exception as e:
        logging.error(f'Error adding Chain of Custody entry: {e}')
        flash('Error adding Chain of Custody entry. Please try again.', 'error')

    return redirect(url_for('dashboard'))
@app.route('/upload', methods=['POST'])
def upload():
    if 'file' not in request.files:
        return jsonify({'success': False, 'message': 'No file part'}), 400

    file = request.files['file']
    if file.filename == '':
        return jsonify({'success': False, 'message': 'No selected file'}), 400

    filename = secure_filename(file.filename)
    filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
    file.save(filepath)

    # Capture metadata
    timestamp = datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S')
    file_metadata = {
        'filename': filename,
        'type': filename.split('.')[-1],
        'size': os.path.getsize(filepath),
        'timestamp': timestamp,
        'status': 'Pending'
    }
    
    metadata = load_json_file(METADATA_FILE) if os.path.exists(METADATA_FILE) else []
    metadata.append(file_metadata)
    save_json_file(METADATA_FILE, metadata)

    return jsonify({
        'success': True,
        'file_name': filename,
        'size': file_metadata['size'],
        'type': file_metadata['type'],
        'timestamp': timestamp
    }), 200

@app.route('/reset_data', methods=['POST'])
def reset_data():
    if 'username' not in session:
        return jsonify({'success': False, 'message': 'User not logged in'}), 401

    try:
        # Clear the metadata file
        if os.path.exists(METADATA_FILE):
            os.remove(METADATA_FILE)

        # Clear the uploads directory
        if os.path.exists(UPLOAD_FOLDER):
            shutil.rmtree(UPLOAD_FOLDER)

        os.makedirs(UPLOAD_FOLDER)  # Recreate the uploads folder
        flash('Metadata and uploads have been reset.', 'success')
        logging.info("Metadata and uploads have been reset.")

        # Add a notification for data reset
        add_notification("Metadata and uploads have been reset")

    except Exception as e:
        logging.error(f'Error resetting data: {e}')
        flash('Error resetting data. Please try again.', 'error')

    return redirect(url_for('dashboard'))


if __name__ == '__main__':
    app.run(debug=True)