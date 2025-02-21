import streamlit as st
import requests
import time

VT_API_KEY = '4e6d4ab35e0fb46ff31d249d8acaccfb8b5a67489773cee7db60ad23c10b8891' 

def submit_file(file):
    """Submit a file to VirusTotal for analysis and return the analysis ID."""
    url = 'https://www.virustotal.com/api/v3/files'
    headers = {
        'x-apikey': VT_API_KEY
    }
    files = {'file': file}
    response = requests.post(url, headers=headers, files=files)
    return response.json()

def get_analysis_report(analysis_id):
    """Fetch the analysis report from VirusTotal using the analysis ID."""
    headers = {
        'x-apikey': VT_API_KEY
    }
    response = requests.get(f'https://www.virustotal.com/api/v3/analyses/{analysis_id}', headers=headers)
    return response.json()


st.title("Cyber Sentinel")

uploaded_files = st.file_uploader("Upload files to check their safety", type=["jpg", "jpeg", "png", "pdf", "docx", "zip", "exe"], accept_multiple_files=True)

if uploaded_files:
    for uploaded_file in uploaded_files:
        st.write("File Name:", uploaded_file.name)

        if st.button(f"Check Safety of {uploaded_file.name}"):
            
            with st.spinner('Submitting file for analysis...'):
                submission_response = submit_file(uploaded_file)

            if 'data' in submission_response and 'id' in submission_response['data']:
                analysis_id = submission_response['data']['id']
                st.success("File submitted for analysis. Analysis ID: " + analysis_id)

            
                time.sleep(5)

               
                with st.spinner('Fetching analysis report...'):
                    report = get_analysis_report(analysis_id)

                if 'data' in report and 'attributes' in report['data']:
                    attributes = report['data']['attributes']
                    stats = attributes.get('stats', {})
                    malicious = stats.get('malicious', 0)
                    undetected = stats.get('undetected', 0)
                    suspicious = stats.get('suspicious', 0)
                    harmless = stats.get('harmless', 0)
                    timeout = stats.get('timeout', 0)
                    
                
                    detailed_info = attributes.get('results', {})
                    detections = []
                    for scanner, result in detailed_info.items():
                        if result['category'] == 'malicious':
                            detections.append(f"<li><strong>{scanner}:</strong> {result['result']}</li>")
                    detections_html = "<ul>" + "".join(detections) + "</ul>" if detections else "<p>No detailed malicious information available.</p>"
                    
                    
                    st.markdown(f"""
                    <div style='text-align: center;'>
                        <h3>Analysis Summary for {uploaded_file.name}</h3>
                        <div style='display: flex; justify-content: center; flex-wrap: wrap;'>
                            <div style='margin: 10px; padding: 20px; border: 1px solid #ddd; border-radius: 10px; width: 150px;'>
                                <strong style='color: green;'>Undetected:</strong> {undetected}
                            </div>
                            <div style='margin: 10px; padding: 20px; border: 1px solid #ddd; border-radius: 10px; width: 150px;'>
                                <strong style='color: orange;'>Suspicious:</strong> {suspicious}
                            </div>
                            <div style='margin: 10px; padding: 20px; border: 1px solid #ddd; border-radius: 10px; width: 150px;'>
                                <strong style='color: red;'>Malicious:</strong> {malicious}
                            </div>
                            <div style='margin: 10px; padding: 20px; border: 1px solid #ddd; border-radius: 10px; width: 150px;'>
                                <strong style='color: blue;'>Harmless:</strong> {harmless}
                            </div>
                            <div style='margin: 10px; padding: 20px; border: 1px solid #ddd; border-radius: 10px; width: 150px;'>
                                <strong style='color: grey;'>Timeout:</strong> {timeout}
                            </div>
                        </div>
                        <h4>Detailed Malicious Detections</h4>
                        {detections_html}
                    </div>
                    """, unsafe_allow_html=True)
                else:
                    st.error("Error fetching analysis report. Please try again later.")
            else:
                st.error("Error submitting file. Please try again.")

hide_st_style = """
            <style>
            #MainMenu {visibility: hidden;}
            footer {visibility: hidden;}
            header {visibility: hidden;}
            </style>
            """
st.markdown(hide_st_style, unsafe_allow_html=True)
