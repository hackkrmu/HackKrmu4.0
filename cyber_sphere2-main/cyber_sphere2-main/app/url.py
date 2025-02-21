import streamlit as st
import requests
import time


st.title("🔍 URL Scanner ")
st.write("Enter a URL to check if it’s malicious or safe.")


user_url = st.text_input("Enter URL", placeholder="https://example.com")


API_KEY = "4e6d4ab35e0fb46ff31d249d8acaccfb8b5a67489773cee7db60ad23c10b8891"


def scan_url(url):
    scan_url = "https://www.virustotal.com/api/v3/urls"
    headers = {
        "x-apikey": API_KEY,
        "accept": "application/json",
        "content-type": "application/x-www-form-urlencoded"
    }
    data = {"url": url}

    response = requests.post(scan_url, headers=headers, data=data)
    
    if response.status_code == 200:
        return response.json()
    else:
        st.error(f"Error: {response.status_code} - {response.text}")
        return None


def get_url_report(analysis_id):
    report_url = f"https://www.virustotal.com/api/v3/analyses/{analysis_id}"
    headers = {"x-apikey": API_KEY}
    
   
    time.sleep(10)
    
    response = requests.get(report_url, headers=headers)
    if response.status_code == 200:
        return response.json()
    else:
        st.error(f"Error: {response.status_code} - {response.text}")
        return None


if st.button("Scan URL"):
    if user_url:
        with st.spinner("Scanning... Please wait."):
            scan_response = scan_url(user_url)
            if scan_response:
                analysis_id = scan_response["data"]["id"]
                report = get_url_report(analysis_id)
                
                if report:
                    stats = report["data"]["attributes"]["stats"]
                    total_scanners = sum(stats.values())  
                    harmless_count = stats["harmless"]
                    malicious_count = stats["malicious"]
                    suspicious_count = stats["suspicious"]
                    undetected_count = stats["undetected"]

                    st.subheader("🔎 Scan Results:")
                    st.write(f"- **Harmless:** {harmless_count}")
                    st.write(f"- **Malicious:** {malicious_count}")
                    st.write(f"- **Suspicious:** {suspicious_count}")
                    st.write(f"- **Undetected:** {undetected_count}")

                    
                    if malicious_count > 0:
                        st.error("⚠️ This URL is **Malicious**! Avoid visiting.")
                    elif suspicious_count > 0:
                        st.warning("⚠️ This URL is **Suspicious**. Proceed with caution.")
                    elif undetected_count > harmless_count:
                        st.warning("⚠️ This URL has **very few reports**. No strong data available, be cautious.")
                    elif harmless_count == total_scanners:
                        st.success("✅ This URL appears to be **completely safe**.")
                    else:
                        st.info("ℹ️ This URL has **inconclusive data**. No strong indications of being harmful.")
    else:
        st.warning("Please enter a valid URL.")
