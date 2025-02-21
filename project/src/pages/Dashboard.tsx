import React, { useState, useEffect } from 'react';
import { Plus, Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';

import { useAuth } from '../contexts/AuthContext';
import toast from 'react-hot-toast';

// SUpabase DB stuff
import type { Database } from '../lib/database.types';

type Application = Database['public']['Tables']['applications']['Row'];



{/* This is the dashboard page
  
  The dashboard page
  Has a tracker - Accept/ Decline/ Reject
  Potentially add a follow up page
  
  */}

export default function Dashboard() {
    const { user } = useAuth();
    const [applications, setApplications] = useState<Application[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (user) {
      fetchApplications();
    }
  }, [user]);

  const fetchApplications = async () => {
    try {
      const { data, error } = await supabase
    .from('applications')
    .select('*')
    .eq('user_id', user?.id)
    .order('applied_at', { ascending: false });

      if (error) throw error;
      setApplications(data || []);
    } catch (error) {
      console.error('Error fetching applications:', error);
      toast.error('Failed to load applications');
    } finally {
      setLoading(false);
    }
  };

  const updateApplicationStatus = async (id: string, status: Application['status']) => {
    try {
      const { error } = await supabase
      .from('applications')
      .update({ status, updated_at: new Date().toISOString() })
      .eq('id', id);

      if (error) throw error;
      
      setApplications(prev =>
      prev.map(app =>
        app.id === id ? { ...app, status, updated_at: new Date().toISOString() } : app
        )
      );
    
    toast.success('Application status updated');
  } catch (error) {
    console.error('Error updating application status:', error);
    toast.error('Failed to update status');
    }
  };
  const statusColors = {
    pending: 'bg-yellow-100 text-yellow-800',
    accepted: 'bg-green-100 text-green-800',
    rejected: 'bg-red-100 text-red-800',
  };
  const deleteApplication = async (id: string) => {
    if (!confirm('Are you sure you want to delete this application?')) return;

    try {
      const { error } = await supabase
        .from('applications')
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      setApplications(prev => prev.filter(app => app.id !== id));
      toast.success('Application deleted');
    } catch (error) {
      console.error('Error deleting application:', error);
      toast.error('Failed to delete application');
    }
  };

  const filteredApplications = applications.filter(app =>
    app.company_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    app.job_role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  return (
      <div className="py-8 px-4">
        <div className="sm:flex sm:items-center sm:justify-between mb-8">
        <div>
        <h1 className="text-2xl font-bold text-gray-900">Job Applications</h1>
        <p className="mt-2 text-sm text-gray-700">
          Track and manage all your job applications in one place
          </p>
        </div>
        <div className="mt-4 sm:mt-0">
        <Link
          to="/new-application"
          className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
        <Plus className="h-4 w-4 mr-2" />
        New Application
      </Link>
          </div>
        </div>

      {/* Search and Filter */}
      <div className="mb-6">
        <div className="relative rounded-md shadow-sm max-w-md">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Search className="h-5 w-5 text-gray-400" />
      </div>
      <input
      type="text"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
      placeholder="Search applications..."
      />
        </div>
      </div>

      {/* Applications Table */}
          <div className="bg-white shadow overflow-hidden sm:rounded-lg border border-gray-200">
            <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-gray-50">
        <tr>
        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
        Company
      </th>
      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
        Job Role
      </th>
      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
        Apply Date
      </th>
      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
        Status
          </th>
          <th scope="col" className="relative px-6 py-3">
            <span className="sr-only">Actions</span>
          </th>
        </tr>
            </thead>
        <tbody className="bg-white divide-y divide-gray-200">
        {filteredApplications.map((application) => (
          <tr key={application.id}>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm font-medium text-gray-900">{application.company_name}</div>
            <div className="text-sm text-gray-500">{application.contact_email}</div>
          </td>
          <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-900">{application.job_role}</div>
        {application.contact_person && (
          <div className="text-sm text-gray-500">Contact: {application.contact_person}</div>
            )}
          </td>
          <td className="px-6 py-4 whitespace-nowrap">
            <div className="text-sm text-gray-500">
              {new Date(application.applied_at).toLocaleDateString()}
            </div>
          </td>
          <td className="px-6 py-4 whitespace-nowrap">
            <select
          value={application.status}
          onChange={(e) => updateApplicationStatus(application.id, e.target.value as Application['status'])}
          className={`text-sm font-semibold rounded-full px-2 py-1 ${statusColors[application.status]}`}
        >
          <option value="pending">Pending</option>
          <option value="accepted">Accepted</option>
              <option value="rejected">Rejected</option>
            </select>
          </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
          <button
            onClick={() => deleteApplication(application.id)}
          className="text-red-600 hover:text-red-900 ml-4"
          >
            Delete
            </button>
          </td>
              </tr>
            ))}
            {filteredApplications.length === 0 && (
            <tr>
              <td colSpan={5} className="px-6 py-4 text-center text-gray-500">
                No applications found
              </td>
            </tr>
          )}
          </tbody>
        </table>
        </div>
        </div>
  );
}