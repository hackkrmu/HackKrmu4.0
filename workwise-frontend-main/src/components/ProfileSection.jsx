import { Mail, Linkedin } from "lucide-react";

export default function ProfileSection() {
  return (
    <section className="flex w-full h-full justify-center items-center p-6">
      <div className="w-full h-full flex bg-white shadow-md rounded-lg ">
        {/* Left Section: Profile Image */}
        <div className="w-1/2 m-3">
          <img src="/profile.png" alt="Profile Photo" className="w-60 h-60 object-cover" />
        </div>

        {/* Right Section: Info */}
        <div className="w-1/2 p-6 flex flex-col justify-center items-center">
          <h2 className="text-2xl font-semibold">Manish Kumar Sinha</h2>
          <p className="text-gray-500 mb-4">Full-Stack Developer</p>

          {/* Contact Info */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Mail className="w-5 h-5 text-gray-500" />
              <a href="mailto:your.email@example.com" className="text-blue-600 hover:underline">
                your.email@example.com
              </a>
            </div>
            <div className="flex items-center gap-2">
              <Linkedin className="w-5 h-5 text-gray-500" />
              <a
                href="https://www.linkedin.com/in/your-profile"
                target="_blank"
                className="text-blue-600 hover:underline"
              >
                linkedin.com/in/your-profile
              </a>
            </div>
            <div className="flex items-center gap-2">
              
                Joining Data
            </div>
            <div className="flex items-center gap-2">
              
                Emp_id
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
