import React, { useState, useEffect } from 'react';
import { DayPicker } from 'react-day-picker';
import { format } from 'date-fns';
import { Star, X } from 'lucide-react';
import { fetchFeedback } from '../services/feedback';
import ProfileSection from '../components/ProfileSection';

function ProfileManagement() {
  const [selectedDays, setSelectedDays] = useState([]);
  const [skills, setSkills] = useState(['React', 'TypeScript', 'Node.js']);
  const [newSkill, setNewSkill] = useState('');
  const [feedback, setFeedback] = useState([]);
  const [loading, setLoading] = useState(true);
  const [goals, setGoals] = useState([])
  useEffect(() => {
    const loadFeedback = async () => {
      try {
        const data = await fetchFeedback();
        setFeedback(data);
        console.log(data);
        console.log(feedback);
        
      } catch (error) {
        console.error('Error fetching feedback:', error);
      } finally {
        setLoading(false);
      }
    };
    loadFeedback();
  }, []);

  const handleAddSkill = (e) => {
    e.preventDefault();
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      setSkills([...skills, newSkill.trim()]);
      setNewSkill('');
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    setSkills(skills.filter(skill => skill !== skillToRemove));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
        <div className='fixed right-0 bottom-0 z-10 opacity-70 floating'>
            <img src='/man.png'/>
        </div>
      <div className="max-w-4xl mx-auto space-y-8 z-20">
        <h1 className="text-3xl font-bold text-gray-900">Profile Management</h1>
    
    <div className='w-full'> 
    <ProfileSection/>
    </div>
        {/* Workload Calendar */}
        <section className="bg-white p-6 rounded-lg shadow-md w-full">
        <h2 className="text-xl font-semibold mb-4">Workload</h2>
        <div className="border rounded-lg p-4 w-full flex justify-center">
            <DayPicker
            mode="multiple"
            selected={selectedDays}
            onSelect={setSelectedDays}
            className="w-full flex justify-center"
            classNames={{
                day: "w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 flex items-center justify-center rounded-md transition-all text-sm sm:text-base md:text-lg",
                selected: "bg-blue-500 text-white font-bold",
                today: "border border-blue-500 text-red-600 font-semibold",
                disabled: "text-gray-300 cursor-not-allowed",
                month: "space-y-4 w-full",
                caption: "text-lg font-semibold mb-2 text-center",
                weekdays: "text-gray-500 font-medium text-center",
            }}
            />
        </div>
        </section>



        {/* Skills */}
        <section className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Skills</h2>
          <form onSubmit={handleAddSkill} className="mb-4">
            <div className="flex gap-2">
              <input
                type="text"
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                placeholder="Add a new skill"
                className="flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Add
              </button>
            </div>
          </form>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill) => (
              <div
                key={skill}
                className="bg-gray-100 px-3 py-1 rounded-full flex items-center gap-2"
              >
                <span>{skill}</span>
                <button
                  onClick={() => handleRemoveSkill(skill)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X size={14} />
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Feedback */}
        <section className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Feedback</h2>
          {loading ? (
            <p>Loading feedback...</p>
          ) : (
            <div className="space-y-4">
              {Array.isArray(feedback) && feedback.map((item) => (
                <div key={item.id} className="border rounded-lg p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium">{item.author}</p>
                      <p className="text-sm text-gray-500">{format(new Date(item.date), 'PPP')}</p>
                    </div>
                    <div className="flex">
                      {[...Array(item.rating)].map((_, i) => (
                        <Star
                          key={i}
                          size={16}
                          className="text-yellow-400 fill-current"
                        />
                      ))}
                    </div>
                  </div>
                  <p className="mt-2 text-gray-700">{item.content}</p>
                </div>
              ))}
            </div>
          )}
        </section>

          {/* Goals */}
        <section className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Goals</h2>
        {loading ? (
            <p>Loading goals...</p>
        ) : (
            <div className="space-y-4">
            {Array.isArray(goals) && goals.map((goal) => (
                <div key={goal.id} className="border rounded-lg p-4">
                <div className="flex justify-between items-start">
                    <div>
                    <p className="font-medium">{goal.title}</p>
                    <p className="text-sm text-gray-500">{format(new Date(goal.deadline), 'PPP')}</p>
                    </div>
                    <span className={`px-2 py-1 text-sm rounded-full ${goal.completed ? 'bg-green-200 text-green-700' : 'bg-red-200 text-red-700'}`}>
                    {goal.completed ? 'Completed' : 'Pending'}
                    </span>
                </div>
                <p className="mt-2 text-gray-700">{goal.description}</p>
                </div>
            ))}
            </div>
        )}
        </section>
      </div>
    </div>
  );
}

export default ProfileManagement;