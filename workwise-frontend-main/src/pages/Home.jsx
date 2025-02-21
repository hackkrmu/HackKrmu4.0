import React, { useState } from 'react';
import { Brain, Users, Calendar, Target, Shield, BarChart as ChartBar, Clock, Zap, CheckCircle, Mail, Phone, MapPin, Star } from 'lucide-react';
import { AuthModal } from '../components/AuthModal';

function Home() {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState('login');

  const openAuthModal = (mode) => {
    setAuthMode(mode);
    setIsAuthModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <header className="bg-white shadow-sm">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <Brain className="h-8 w-8 text-indigo-600" />
              <span className="text-2xl font-bold text-gray-900">Workwise</span>
            </div>
            <div className="flex items-center space-x-4">
              
              <button onClick={() => openAuthModal('signup')} className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors font-semibold">
               Request Demo
              </button>
            </div>
          </div>
        </nav>
      </header>

      <main>
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                  <div>
                    <h1 className="text-5xl font-bold text-gray-900 mb-6">
                      Transform Your Workplace with AI-Powered Management
                    </h1>
                    <p className="text-xl text-gray-600 mb-8">
                      Revolutionize your organization with our intelligent intranet solution that optimizes work allocation, enhances productivity, and creates a harmonious workplace environment.
                    </p>
                    <div className="flex gap-4">
                      <button
                        onClick={() => openAuthModal('signup')}
                        className="bg-indigo-600 text-white px-8 py-3 rounded-lg hover:bg-indigo-700 transition-colors text-lg font-semibold"
                      >
                        Get Started
                      </button>
                      <button className="border-2 border-indigo-600 text-indigo-600 px-8 py-3 rounded-lg hover:bg-indigo-50 transition-colors text-lg font-semibold">
                        Learn More
                      </button>
                    </div>
                  </div>
                  <div className="space-y-6">
                    {/* Calendar Preview */}
                    <div className="bg-white rounded-xl shadow-lg p-6">
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-semibold text-gray-900">Team Schedule</h3>
                        <Calendar className="h-5 w-5 text-indigo-600" />
                      </div>
                      <div className="space-y-3">
                        {['Monday', 'Tuesday', 'Wednesday'].map((day, index) => (
                          <div key={day} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                            <div className="w-24 text-sm font-medium text-gray-700">{day}</div>
                            <div className={`flex-1 p-2 rounded ${
                              index === 0 ? 'bg-indigo-100 text-indigo-700' :
                              index === 1 ? 'bg-green-100 text-green-700' :
                              'bg-purple-100 text-purple-700'
                            }`}>
                              <div className="text-sm font-medium">Team Meeting</div>
                              <div className="text-xs">9:00 AM - 10:00 AM</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Employee ID Card */}
                    <div className="bg-white rounded-xl shadow-lg p-6">
                      <div className="flex gap-4">
                        <div className="w-24 h-24 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                          <Users className="h-12 w-12 text-white" />
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="text-xl font-semibold text-gray-900">Sarah Anderson</h3>
                              <p className="text-indigo-600 font-medium">Senior Developer</p>
                            </div>
                            <div className="flex gap-1">
                              {[...Array(5)].map((_, i) => (
                                <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                              ))}
                            </div>
                          </div>
                          <div className="mt-4 space-y-2">
                            <div className="flex items-center gap-2 text-gray-600">
                              <Mail className="h-4 w-4" />
                              <span className="text-sm">sarah.anderson@Workwise.com</span>
                            </div>
                            <div className="flex items-center gap-2 text-gray-600">
                              <Phone className="h-4 w-4" />
                              <span className="text-sm">+1 (555) 123-4567</span>
                            </div>
                            <div className="flex items-center gap-2 text-gray-600">
                              <MapPin className="h-4 w-4" />
                              <span className="text-sm">Engineering Department</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="mt-4 pt-4 border-t">
                        <div className="grid grid-cols-3 gap-4">
                          <div className="text-center">
                            <div className="text-lg font-semibold text-indigo-600">98%</div>
                            <div className="text-xs text-gray-600">Task Completion</div>
                          </div>
                          <div className="text-center">
                            <div className="text-lg font-semibold text-indigo-600">127</div>
                            <div className="text-xs text-gray-600">Projects</div>
                          </div>
                          <div className="text-center">
                            <div className="text-lg font-semibold text-indigo-600">4.9</div>
                            <div className="text-xs text-gray-600">Rating</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

      </main>


      <section className="bg-white py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
                    Intelligent Workplace Management
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <FeatureCard
                      icon={<Users className="h-8 w-8 text-indigo-600" />}
                      title="Smart Team Allocation"
                      description="AI-driven matching of employees to projects based on skills, experience, and workload."
                    />
                    <FeatureCard
                      icon={<Calendar className="h-8 w-8 text-indigo-600" />}
                      title="Intelligent Scheduling"
                      description="Automated scheduling and resource management optimized for maximum efficiency."
                    />
                    <FeatureCard
                      icon={<Target className="h-8 w-8 text-indigo-600" />}
                      title="Performance Analytics"
                      description="Real-time insights into team performance and project progress."
                    />
                    <FeatureCard
                      icon={<Shield className="h-8 w-8 text-indigo-600" />}
                      title="Conflict Prevention"
                      description="Advanced algorithms to identify and prevent potential workplace conflicts."
                    />
                    <FeatureCard
                      icon={<ChartBar className="h-8 w-8 text-indigo-600" />}
                      title="Productivity Optimization"
                      description="Data-driven recommendations for improving team productivity and engagement."
                    />
                    <FeatureCard
                      icon={<Clock className="h-8 w-8 text-indigo-600" />}
                      title="Time Management"
                      description="Efficient time tracking and workload balancing across teams and projects."
                    />
                  </div>
                </div>
              </section>



      <section className="py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
                    Why Choose Workwise?
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="bg-white p-8 rounded-xl shadow-sm">
                      <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                        <Zap className="h-6 w-6 text-indigo-600" />
                        Increased Efficiency
                      </h3>
                      <ul className="space-y-3">
                        <BenefitItem text="30% reduction in project allocation time" />
                        <BenefitItem text="40% improvement in resource utilization" />
                        <BenefitItem text="25% increase in team productivity" />
                      </ul>
                    </div>
                    <div className="bg-white p-8 rounded-xl shadow-sm">
                      <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                        <Shield className="h-6 w-6 text-indigo-600" />
                        Better Workplace Culture
                      </h3>
                      <ul className="space-y-3">
                        <BenefitItem text="50% reduction in workplace conflicts" />
                        <BenefitItem text="Improved employee satisfaction scores" />
                        <BenefitItem text="Enhanced team collaboration" />
                      </ul>
                    </div>
                  </div>
                </div>
              </section>


      <section className="bg-indigo-600 py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                  <h2 className="text-3xl font-bold text-white mb-6">
                    Ready to Transform Your Workplace?
                  </h2>
                  <p className="text-xl text-indigo-100 mb-8 max-w-2xl mx-auto">
                    Join the growing number of organizations using Workwise to create more efficient and harmonious workplaces.
                  </p>
                  <button
                    onClick={() => openAuthModal('signup')}
                    className="bg-white text-indigo-600 px-8 py-3 rounded-lg hover:bg-indigo-50 transition-colors text-lg font-semibold"
                  >
                    Schedule a Demo
                  </button>
                </div>
              </section>

      <footer className="bg-gray-900 text-gray-400 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Brain className="h-8 w-8 text-indigo-400" />
              <span className="text-2xl font-bold text-white">Workwise</span>
            </div>
            <p>© 2025 Workwise. All rights reserved.</p>
          </div>
        </div>
      </footer>

      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} initialMode={authMode} />
    </div>
  );
}

export default Home;


function FeatureCard({ icon, title, description }) {
    return (
      <div className="bg-gray-50 p-6 rounded-xl">
        <div className="mb-4">{icon}</div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
    );
  }

  
  function BenefitItem({ text }) {
    return (
      <li className="flex items-center gap-2">
        <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
        <span className="text-gray-700">{text}</span>
      </li>
    );
  }
  