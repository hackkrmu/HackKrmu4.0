import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Send, Search, CheckCircle2, XCircle, RefreshCw } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import { generateEmailTemplate, sendApplicationEmails } from '../lib/email';
import toast from 'react-hot-toast';


// Supabase and Auth stuff
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';


interface Contact {
  id: string;
  email: string;
  title: string;
  selected: boolean;
  source: 'api' | 'manual';
  }

interface Company {
  name: string;
  contacts: Contact[];
  }


interface JobListing{
  title : string;
  location : string;
  job_id : string;
  company_name : string;
  apply_option : string;
  source: 'api' | 'manual';

  }

interface JobListings{
  job_role : '';
  job_listings : JobListing[];
}

export default function NewApplication() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [fetching, setFetching] = useState(false);
  const [jobFetching, setJobFetching] = useState(false);
  const [company, setCompany] = useState<Company>({name: '',contacts: []
  });
  const [jobRole, setJobRole] = useState('Frontend Developer');
  const [location, setLocation] = useState('India');
  const [requirements, setRequirements] = useState('Front-end developers need to be proficient in HTML, CSS, and JavaScript. They should also have an understanding of responsive design, debugging, and version control.');
  const [emailTemplate, setEmailTemplate] = useState('');
  const [userProfile, setUserProfile] = useState<any>(null);
  const [jobListing, setJobListings] = useState<JobListings>({
      job_role:'',
      job_listings :[] 
  }
   );

  useEffect(() => {
    if (user) {
      fetchUserProfile();
    }
  }, [user]);

  const fetchJobs = async () => {
    if (!jobRole.trim()) {
      toast.error("Please enter a Job Role");
      return;
    }
    // if (!location.trim()) {
    //   toast.error("Please enter a Location");
    //   return;
    // }
    setJobFetching(true);
    try {
      const response = await fetch("http://127.0.0.1:8000/fetch-job-listings/",
      {
        method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ job_role: jobRole, location:location }),
      }

      );
      if (!response.ok) {
      throw new Error(`Failed to fetch company contacts: ${response.statusText}`);
      }
      const data = await response.json();
      // Ensure results are available
      if (!data.results || data.results.length === 0) {
        toast.error("No job Roles found for this company.");
        return;
      }

      // Format contacts

      const newJobListings = data.results.map((entry: { title: string; location: string, company_name: string, job_id : string, apply_option:string }, index: number) => ({
      id: String(index + 1),
      title: entry.title || "Unknown", 
      location: entry.location || "Unknown", 
      company_name: entry.company_name || "Unknown", 
      apply_option: entry.apply_option || "Unknown", 
      selected: true,
      source: "api" as const,
      }));

      // Merge new contacts with existing manual contacts
      const existingJobListings = jobListing.job_listings.filter((c) => c.source === "manual");
      setJobListings((prev) => ({
      ...prev,
      job_listings: [...newJobListings, ...existingJobListings],
      }));
      toast.success("Job Listings fetched successfully");

    } catch (error) {
      console.error("Error fetching job listings:", error);
      toast.error("Error fetching job listings:");
    } finally{
      setJobFetching(false);
    }
  };

  const fetchUserProfile = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user?.id)
        .single();

      if (error) throw error;
      setUserProfile(data);
    } catch (error) {
      console.error('Error fetching profile:', error);
      toast.error('Failed to load profile data');
    }
  };
  const fetchCompanyEmails = async () => {
    if (!company.name.trim()) {
      toast.error("Please enter a company name");
      return;
    }
  
    setFetching(true);
    try {
      const response = await fetch("http://127.0.0.1:8000/fetch-company-emails/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ company_name: company.name }),
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch company contacts: ${response.statusText}`);
  }

  const data = await response.json();

  // Ensure results are available
  if (!data.results || data.results.length === 0) {
    toast.error("No emails found for this company.");
    return;
  }

  // Format contacts
  const newContacts = data.results.map((entry: { email: string; title: string }, index: number) => ({
    id: String(index + 1),
    email: entry.email,
    title: entry.title || "Unknown", // Default to "Unknown" if title not found
    selected: true,
    source: "api" as const,
      }));
  
      // Merge new contacts with existing manual contacts
      const existingManualContacts = company.contacts.filter((c) => c.source === "manual");
      setCompany((prev) => ({
        ...prev,
        contacts: [...newContacts, ...existingManualContacts],
      }));
  
      toast.success("Company contacts fetched successfully");
    } catch (error) {
      console.error("Error fetching company emails:", error);
      toast.error("Failed to fetch company contacts");
    } finally {
      setFetching(false);
    }
  };
    

  const toggleContact = (id: string) => {
    setCompany(prev => ({
      ...prev,
      contacts: prev.contacts.map(contact =>
        contact.id === id ? { ...contact, selected: !contact.selected } : contact
      )
    }));
  };

  const addNewContact = () => {
  const newContact: Contact = {
    id: Date.now().toString(),
    email: '',
    title: '',
    selected: true,
    source: 'manual'
  };
    setCompany(prev => ({
      ...prev,
      contacts: [...prev.contacts, newContact]
    }));
  };

  const updateContact = (id: string, field: keyof Contact, value: string) => {
    setCompany(prev => ({
  ...prev,
  contacts: prev.contacts.map(contact =>
    contact.id === id ? { ...contact, [field]: value } : contact
      )
    }));
  };

  const removeContact = (id: string) => {
    setCompany(prev => ({
      ...prev,
      contacts: prev.contacts.filter(contact => contact.id !== id)
    }));
  };

  const generateTemplate = async () => {
    if (!userProfile) {
      toast.error('Please complete your profile first');
      return;
    }

    try {
    setGenerating(true);
    const template = await generateEmailTemplate(jobRole, requirements, userProfile, company.name);
    setEmailTemplate(template);
      toast.success('Email template generated successfully');
  } catch (error) {
    console.error('Error generating template:', error);
    toast.error('Failed to generate email template');
  } finally {
      setGenerating(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    const selectedContacts = company.contacts.filter(contact => contact.selected);
    if (selectedContacts.length === 0) {
      toast.error('Please select at least one contact');
      return;
    }

    try {
      setLoading(true);

      // Prepare applications data
      const applications = selectedContacts.map(contact => ({
      user_id: user.id,
      company_name: company.name,
      job_role: jobRole,
      contact_email: contact.email,
    contact_person: contact.title,
        requirements: requirements || null,
        email_template: emailTemplate || null,
        status: 'pending' as const,
      }));

      // Send emails and save to database
      await sendApplicationEmails(applications);

      toast.success('Applications sent successfully');
      navigate('/dashboard');
    } catch (error) {
      console.error('Error sending applications:', error);
      toast.error('Failed to send applications');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold text-gray-900 mb-8">New Application</h1>
      
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Job Details */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Job Details</h2>
          <div className="space-y-4">
            <div>
              <label htmlFor="jobRole" className="block text-sm font-medium text-gray-700">
          Job Role
        </label>
        <input
          type="text"
          id="jobRole"
          required
          value={jobRole}
          onChange={(e) => setJobRole(e.target.value)}
          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
          placeholder="EG - Senior Frontend Developer"
              />
            </div>
            <div className="flex gap-4 items-end">
              <div className="flex-1">
                <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                  Location
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            </div>
            <input
              type="text"
              id="location"
              required
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    placeholder="EG-  Noida"
                  />
                </div>
              </div>
              <button
                type="button"
              onClick={fetchJobs}
              disabled={fetching}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <RefreshCw className={`h-4 w-4 mr-2 ${jobFetching ? 'animate-spin' : ''}`} />
                {fetching ? 'Fetching...' : 'Fetch Job openings'}
              </button>
            </div>

            {/* Jobs Table */}
            <div className="mt-4 overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Job Title
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Job Location
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Source
                </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Company
                </th>
                
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Apply Option
                </th>
              </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {jobListing.job_listings.map((job) => (
                    <tr key={job.job_id} className={job.source === 'api' ? 'bg-blue-50' : ''}>
                   
                      <td className="px-6 py-4 whitespace-nowrap">
                    
                        {job.title}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    
                    {job.location}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      job.source === 'api' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {job.source === 'api' ? 'API' : 'Manual'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    
                    {job.company_name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                       
                        <button
                      type="button"
                      onClick={() => window.open(`${job.apply_option}`, "_blank", "noopener,noreferrer")}
                      disabled={fetching}
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Apply
                    </button>
                  </td>
                  
                    </tr>
                  ))}
                  {jobListing.job_listings.length === 0 && (
                    <tr>
                      <td colSpan={5} className="px-6 py-4 text-center text-gray-500">
                        Search for a job role to view latest openings.
                      </td>
                    </tr>
                  )}
            </tbody>
          </table>
        </div>
  
            <div>
                <label htmlFor="requirements" className="block text-sm font-medium text-gray-700">
                  Job Requirements
                </label>
                <textarea
                  id="requirements"
                  rows={4}
                  value={requirements}
                onChange={(e) => setRequirements(e.target.value)}
                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                placeholder="Paste the job requirements here..."
              />
            </div>
          </div>
        </div>

        {/* Company Details */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-medium text-gray-900">Company Details</h2>
                  <div className="flex gap-2">
                    <button
                type="button"
                onClick={addNewContact}
                className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <Plus className="h-4 w-4 mr-1" />
            Add Contact
          </button>
            </div>
          </div>

          <div className="space-y-4">
            {/* Company Name with Fetch Button */}
        <div className="flex gap-4 items-end">
          <div className="flex-1">
            <label htmlFor="companyName" className="block text-sm font-medium text-gray-700">
              Company Name
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                    id="companyName"
                      required
                      value={company.name}
                      onChange={(e) => setCompany(prev => ({ ...prev, name: e.target.value }))}
                      className="pl-10 focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="Enter company name..."
                  />
                </div>
              </div>
              <button
                type="button"
            onClick={fetchCompanyEmails}
            disabled={fetching}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${fetching ? 'animate-spin' : ''}`} />
                {fetching ? 'Fetching...' : 'Fetch Emails'}
                </button>
              </div>

              {/* Contacts Table */}
              <div className="mt-4 overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Select
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Title
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Email
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Source
                      </th>
                      <th scope="col" className="relative px-6 py-3">
                        <span className="sr-only">Actions</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {company.contacts.map((contact) => (
                      <tr key={contact.id} className={contact.source === 'api' ? 'bg-blue-50' : ''}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <button
                            type="button"
                            onClick={() => toggleContact(contact.id)}
                            className="text-indigo-600 hover:text-indigo-900"
                          >
                            {contact.selected ? (
                              <CheckCircle2 className="h-5 w-5" />
                            ) : (
                              <XCircle className="h-5 w-5" />
                            )}
                          </button>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <input
                            type="text"
                            value={contact.title}
                            onChange={(e) => updateContact(contact.id, 'title', e.target.value)}
                            className="focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                            placeholder="Job title"
                          />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <input
                            type="email"
                            value={contact.email}
                            onChange={(e) => updateContact(contact.id, 'email', e.target.value)}
                            className="focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                            placeholder="Email address"
                          />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            contact.source === 'api' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'
                          }`}>
                            {contact.source === 'api' ? 'API' : 'Manual'}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button
                            type="button"
                            onClick={() => removeContact(contact.id)}
                            className="text-red-600 hover:text-red-900"
                          >
                            <Trash2 className="h-5 w-5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                    {company.contacts.length === 0 && (
                      <tr>
                        <td colSpan={5} className="px-6 py-4 text-center text-gray-500">
                          Add contacts manually or fetch them from the company.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
        </div>

        {/* Email Template */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-medium text-gray-900">Email Template</h2>
        <button
          type="button"
          onClick={generateTemplate}
          disabled={generating}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
              {generating ? 'Generating...' : 'Generate Template'}
            </button>
          </div>
          
          <textarea
          rows={8}
          value={emailTemplate}
          onChange={(e) => setEmailTemplate(e.target.value)}
          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
            placeholder="Your email template will appear here..."
          />
        </div>

        {/* Submit Button */}
              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="h-4 w-4 mr-2" />
                  {loading ? 'Sending...' : 'Send Applications'}
                </button>
        </div>
      </form>
    </div>
  );
}