import React from 'react';
import {
  Users,
  Target,
  TrendingUp,
  Clock,
  Briefcase,
  FileText,
  User,
  MessageSquare
} from 'lucide-react';
import { Link } from 'react-router-dom';

function Dashboard() {
  return (
    <div className="space-y-10 p-6">
      <section>
        <h2 className="text-xl font-semibold text-gray-900">Management Actions</h2>
        <p className="text-gray-600 mb-4">Manage work, employees, and feedback efficiently using the tools below.</p>
        <div className="flex flex-wrap gap-4">
          <Link to={'/workmanagement'}>
          <button  className="flex items-center gap-2 px-4 py-2 border rounded-md text-gray-700 hover:bg-gray-100">
            <Briefcase className="h-5 w-5" /> Work Management
          </button>
          </Link>
          <Link to={'/showwork'}>
          <button className="flex items-center gap-2 px-4 py-2 border rounded-md text-gray-700 hover:bg-gray-100">
            <FileText className="h-5 w-5" /> Show Work
          </button>
          </Link>
          <Link to={'profilemanagement'}>
          <button className="flex items-center gap-2 px-4 py-2 border rounded-md text-gray-700 hover:bg-gray-100">
            <User className="h-5 w-5" /> Profile Management
          </button>
          </Link>
          <Link to={'/feedback'}>
          <button className="flex items-center gap-2 px-4 py-2 border rounded-md text-gray-700 hover:bg-gray-100">
            <MessageSquare className="h-5 w-5" /> Feedback Form
          </button>
          </Link>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-gray-900">Key Metrics</h2>
        <p className="text-gray-600 mb-4">Track essential statistics related to employee management and productivity.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <StatCard
            icon={<Users className="h-6 w-6 text-blue-600" />}
            title="Total Employees"
            value="156"
            change="+12%"
            trend="up"
          />
          <StatCard
            icon={<Target className="h-6 w-6 text-green-600" />}
            title="Projects Completed"
            value="89"
            change="+24%"
            trend="up"
          />
          <StatCard
            icon={<Clock className="h-6 w-6 text-purple-600" />}
            title="Avg. Productivity"
            value="94%"
            change="+8%"
            trend="up"
          />
        </div>
      </section>
    </div>
  );
}

function StatCard({ icon, title, value, change, trend }) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-gray-50 rounded-lg">
            {icon}
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500">{title}</h3>
            <div className="text-2xl font-semibold text-gray-900">{value}</div>
          </div>
        </div>
        <div className={`flex items-center ${trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
          <TrendingUp className="h-4 w-4" />
          <span className="text-sm font-medium ml-1">{change}</span>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;