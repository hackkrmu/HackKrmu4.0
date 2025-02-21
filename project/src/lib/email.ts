import { supabase } from './supabase';
import emailjs from "@emailjs/browser";


const OPENROUTER_API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY;
const SITE_URL = import.meta.env.VITE_SITE_URL || window.location.origin;

export async function generateEmailTemplate(
  jobRole: string,
  requirements: string,
  userProfile: any,
  companyName :any
) {
  try {
    const prompt = `Generate a professional job application email for the role of ${jobRole}. 
    Here are the job requirements: ${requirements}
    
    Company Name : ${companyName}

    Include the following information in the mail, after my final regards:
    - My phone number: ${userProfile.phone}
    - My portfolio: ${userProfile.portfolio_url}
    - My LinkedIn: ${userProfile.linkedin_url}
    Identify the Sender's name from the given information.
    
    Make the email professional, concise, and highlight how my profile matches the job requirements.
    Do not generate a subject.
    Do not generate greeting salutation. Example Dear John - dont generate that, generate only the body and regards.`;

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
        "HTTP-Referer": SITE_URL,
        "X-Title": "JobBlast",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "deepseek/deepseek-chat:free",
        messages: [
          {
            role: "user",
            content: prompt
          }
        ]
      })
    });

    const data = await response.json();
    return data.choices[0].message.content;
  } catch (error) {
    console.error('Error generating email:', error);
    throw new Error('Failed to generate email template');
  }
}

export async function sendApplicationEmails(applications: any[]) {
  console.log("Secret Keys");
  console.log(OPENROUTER_API_KEY); // Keep this if needed
  console.log("Secret Keys");

  try {
    const { error } = await supabase
      .from("applications")
      .upsert(
        applications.map((app) => ({
          ...app,
          applied_at: new Date().toISOString(),
          status: "pending",
        }))
      );

    if (error) throw error;

    // Iterate over applications and send emails using EmailJS
    for (const app of applications) {
      if (!app.contact_email) continue; // Skip if no email

      const emailParams = {
        to_email: app.contact_email,
        to_name: app.contact_person || app.company_name,
        job_role: app.job_role || "Job Role",
        // company_name: app.company_name || "Company",
        message: app.email_template || `Hello ${app.contact_person},\n\nYour application for ${app.job_role} is being processed.`,
      };

      try {
        const response = await emailjs.send(
          "service_107anjp",  // Replace with your EmailJS service ID
          "template_fuxwkvo", // Replace with your EmailJS template ID
          emailParams,
          "eJkPdrzP0kIH0FFGb"   // Replace with your EmailJS public key
        );

        console.log(`Email sent to ${app.contact_email}:`, response);
      } catch (err) {
        console.error(`Failed to send email to ${app.contact_email}:`, err);
      }
    }

    return true;
  } catch (error) {
    console.error("Error sending application emails:", error);
    throw error;
  }
}
