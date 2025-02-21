import React, { useState, useEffect } from 'react';
import { DayPicker } from 'react-day-picker';
import { format, parseISO } from 'date-fns';
import { Calendar, Plus, X, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import { fetchWorks } from '../services/work';

function ShowWork() {
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
        <div className=' fixed right-2 bottom-4'>
            <img src='/manWorking.png'/>
        </div>
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
  );
}

export default ShowWork;