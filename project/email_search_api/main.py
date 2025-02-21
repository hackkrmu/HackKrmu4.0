from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import requests
import json
from pprint import pprint

from dotenv import load_dotenv
load_dotenv()
import os


ANYMAILFINDER_API_KEY = os.getenv('ANYMAILFINDER_API_KEY')
SERP_API_KEY = os.getenv('SERP_API_KEY')
JOBS_API_KEY = os.getenv('JOBS_API_KEY')


app = FastAPI()

# ✅ Enable CORS for React (localhost:5173)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ✅ API Keys
ANYMAILFINDER_URL = "https://api.anymailfinder.com/v5.0/search/company.json"

SERP_API_URL = "https://google.serper.dev/search"

# ✅ Request model
class CompanyRequest(BaseModel):
    company_name: str

class JobRequest(BaseModel):
    job_role : str
    location : str

def fetch_company_emails(company_name):
    """Fetch emails from Anymailfinder API."""
    headers = {
        "Authorization": f"Bearer {ANYMAILFINDER_API_KEY}",
        "Content-Type": "application/json",
    }
    payload = {"company_name": company_name}

    try:
        response = requests.post(ANYMAILFINDER_URL, json=payload, headers=headers)
        response.raise_for_status()
        response_json = response.json()

        if response_json.get("success"):
            return response_json.get("results", {}).get("emails", [])
        else:
            return []

    except requests.RequestException as e:
        raise HTTPException(status_code=500, detail=f"Error contacting Anymailfinder API: {str(e)}")

def fetch_email_titles(emails):
    """Fetch job titles from Google Search via SerpAPI."""
    email_title_map = {}

    for email in emails:
        headers = {
            "X-API-KEY": SERP_API_KEY,
            "Content-Type": "application/json",
        }
        payload = {"q": email}

        try:
            response = requests.post(SERP_API_URL, json=payload, headers=headers)
            response.raise_for_status()
            response_json = response.json()

            # Extract title from the first search result (likely LinkedIn)
            search_results = response_json.get("organic", [])
            title = search_results[0].get("title", "Unknown") if search_results else "No relevant result"

            email_title_map[email] = title

        except requests.RequestException:
            email_title_map[email] = "Error fetching title"

    return email_title_map

@app.post("/fetch-company-emails/")
async def fetch_company_data(data: CompanyRequest):
    """Fetch company emails and their job titles."""
    emails = fetch_company_emails(data.company_name)

    print("----------------------")
    print("Emails Recieved")
    pprint(emails)

    filtered_emails = emails[:5]
    if not emails:
        raise HTTPException(status_code=404, detail="No emails found for this company.")

    email_title_map = fetch_email_titles(filtered_emails)

    print("----------------------")
    print("Profiles Recieved")
    pprint(email_title_map)

    # Format output as a list of { email, title }
    results = [{"email": email, "title": email_title_map[email]} for email in filtered_emails]

    return {"results": results}

def fetch_job_listings_data(
        job_role,
        location
        ):

    api_url = f"https://serpapi.com/search?engine=google_jobs&q={requests.utils.quote(job_role)}&location={requests.utils.quote(location)}&api_key={JOBS_API_KEY}"
    print(api_url)
    # headers = {
    #         "X-API-KEY": SERP_API_KEY,
    #         "Content-Type": "application/json",
    #     }

    try:
        response = requests.get(api_url)
        response.raise_for_status()
        data = response.json()

    except requests.RequestException:
        data = {"error" : "Error retrieving job roles"}

    return data

@app.post("/fetch-job-listings/")
async def fetch_jobs_data(job_data : JobRequest):
    """Fetch Job Listings given a job role"""
    print("Trying to get roles....")
    data = fetch_job_listings_data(job_role=job_data.job_role, location=job_data.location)
    jobs_results = data['jobs_results']

    if 'error' in data.keys():
        raise HTTPException(status_code=404, detail="No roles found for this job.")
    
    print("-----------------")
    print("Job results data")
    pprint(jobs_results[0])
    results = [
        {
            'title' : job['title'],
            'company_name' : job['company_name'],
            'location' : job['location'],
            'job_id' : job['job_id'],
            'description' : job['description'],
            "apply_option" : job['apply_options'][0]['link']
        }
        for job in jobs_results
    ]

    return {"results" : results}

    