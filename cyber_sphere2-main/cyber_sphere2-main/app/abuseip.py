
import streamlit as st
import requests

st.title("🔍 AbuseIPDB IP Address Checker")

API_KEY = "43a12597815bc0ffff77dbf9a093ab68a465b733941071fc98c0e8daa098ed595e5d6ac0cc626286"  
def get_abuse_info(ip_address):
    url = "https://api.abuseipdb.com/api/v2/check"
    headers = {
        'Accept': 'application/json',
        'Key': API_KEY
    }
    params = {
        'ipAddress': ip_address,
        'maxAgeInDays': 90,  
        'verbose': True
    }

    response = requests.get(url, headers=headers, params=params)

    if response.status_code == 200:
        return response.json()
    else:
        st.error(f"❌ API Error: {response.status_code}")
        st.write(f"**Response:** {response.text}")  
        return None

def display_abuse_report(data):
    """Format and display the abuse report in a structured way."""
    st.subheader("📜 Abuse Report Summary")

    ip = data.get("ipAddress", "N/A")
    abuse_score = data.get("abuseConfidenceScore", 0)
    total_reports = data.get("totalReports", 0)
    last_reported = data.get("lastReportedAt", "Unknown")

    
    if abuse_score >= 75:
        risk_status = "🚨 High Risk - This IP is likely malicious!"
        st.error(risk_status)
    elif abuse_score >= 30:
        risk_status = "⚠️ Moderate Risk - Suspicious activity detected."
        st.warning(risk_status)
    else:
        risk_status = "✅ Low Risk - No major issues detected."
        st.success(risk_status)

    st.write(f"🔹 **IP Address:** `{ip}`")
    st.write(f"📊 **Abuse Confidence Score:** `{abuse_score}/100`")
    st.write(f"📌 **Total Reports:** `{total_reports}`")
    st.write(f"📅 **Last Reported:** `{last_reported}`")

   
    reports = data.get("reports", [])
    if reports:
        st.write("### 📝 User-Submitted Reports:")
        for report in reports[:5]:  
            st.write(f"🗓 **Date:** `{report.get('dateReported', 'Unknown')}`")
            st.write(f"📍 **Reporter Country:** `{report.get('reporterCountry', 'Unknown')}`")
            st.write(f"💬 **Comment:** {report.get('comment', 'No comment provided')}")
            st.markdown("---")  
    else:
        st.write("✅ No user-submitted abuse reports found for this IP.")


ip_address = st.text_input("🔢 Enter an IP Address:")

if st.button("🔎 Check IP"):
    if ip_address:
        abuse_info = get_abuse_info(ip_address)

        if abuse_info and 'data' in abuse_info:
            display_abuse_report(abuse_info['data'])
        else:
            st.warning("⚠️ No abuse information found.")
    else:
        st.warning("⚠️ Please enter a valid IP address.")


hide_st_style = """
            <style>
            #MainMenu {visibility: hidden;}
            footer {visibility: hidden;}
            header {visibility: hidden;}
            </style>
            """
st.markdown(hide_st_style, unsafe_allow_html=True)
