import React, { useState, useEffect } from 'react';
import { DayPicker } from 'react-day-picker';
import { format, parseISO } from 'date-fns';
import { Calendar, Plus, X, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import { fetchWorks } from '../services/work';

function WorkManagement() {
  const [works, setWorks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dateRange, setDateRange] = useState();
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [showForm, setShowForm] = useState(false);

  const availableSkills = [
    'React', 'TypeScript', 'JavaScript', 'Node.js', 'Python',
    'GraphQL', 'REST API', 'AWS', 'Docker', 'Kubernetes',
    'MongoDB', 'PostgreSQL', 'Redis', 'Vue.js', 'Angular'
  ];

  useEffect(() => {
    const loadWorks = async () => {
      try {
        const data = await fetchWorks();
        setWorks(data);
        console.log(data);
        
      } catch (error) {
        console.error('Error fetching works:', error);
      } finally {
        setLoading(false);
      }
    };
    loadWorks();
  }, []);

  const handleAddSkill = (skill) => {
    if (!selectedSkills.includes(skill)) {
      setSelectedSkills([...selectedSkills, skill]);
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    setSelectedSkills(selectedSkills.filter(skill => skill !== skillToRemove));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!dateRange?.from || !dateRange?.to || selectedSkills.length === 0 || !title) {
      alert('Please fill in all required fields');
      return;
    }

    const newWork = {
      id: (works.length + 1).toString(),
      title,
      startDate: format(dateRange.from, 'yyyy-MM-dd'),
      endDate: format(dateRange.to, 'yyyy-MM-dd'),
      skills: selectedSkills,
      description,
      status: 'pending'
    };

    setWorks([...works, newWork]);
    setShowForm(false);
    resetForm();
  };

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setDateRange(undefined);
    setSelectedSkills([]);
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="text-green-500" size={20} />;
      case 'in-progress':
        return <Clock className="text-blue-500" size={20} />;
      case 'pending':
        return <AlertCircle className="text-yellow-500" size={20} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-200 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Work Management</h1>
          <button
            onClick={() => setShowForm(!showForm)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <Plus size={20} />
            Add New Work
          </button>
        </div>

        {showForm && (
          <div className="bg-white p-6 rounded-lg shadow-md mb-8">
            <h2 className="text-xl font-semibold mb-6">Add New Work</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Title *</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter work title"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Time Period *</label>
                <div className="border rounded-lg p-4">
                  <DayPicker mode="range" selected={dateRange} onSelect={setDateRange} className="mx-auto" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Required Skills *</label>
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    {selectedSkills.map(skill => (
                      <div key={skill} className="bg-blue-100 px-3 py-1 rounded-full flex items-center gap-2">
                        <span className="text-blue-800">{skill}</span>
                        <button type="button" onClick={() => handleRemoveSkill(skill)} className="text-blue-600 hover:text-blue-800">
                          <X size={14} />
                        </button>
                      </div>
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {availableSkills.filter(skill => !selectedSkills.includes(skill)).map(skill => (
                      <button key={skill} type="button" onClick={() => handleAddSkill(skill)} className="px-3 py-1 border border-gray-300 rounded-full hover:bg-gray-100">
                        {skill}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={4}
                  placeholder="Enter work description"
                />
              </div>

              <div className="flex gap-4">
                <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Add Work</button>
                <button type="button" onClick={() => setShowForm(false)} className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300">Cancel</button>
              </div>
            </form>
          </div>
        )}

        <div className="bg-gray-300 p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-6">Work List</h2>
          {loading ? (
            <p>Loading works...</p>
          ) : (
            <div className="space-y-4">
              {works.map((work) => (
                <div key={work.id} className="glass-card border rounded-lg p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-medium">{work.title}</h3>
                      <p className="text-sm text-gray-500">{format(parseISO(work.startDate), 'PPP')} - {format(parseISO(work.endDate), 'PPP')}</p>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {work.skills.map(skill => (
                          <span key={skill} className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">{skill}</span>
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {getStatusIcon(work.status)}
                    </div>
                  </div>
                  <p className="mt-2 text-gray-700">{work.description}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default WorkManagement;