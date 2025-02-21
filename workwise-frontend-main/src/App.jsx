import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProfileManagement from '././pages/ProfileManagement';
import WorkManagement from './pages/WorkManagement';
import ShowWork from './pages/ShowWork';
import Dashboard from './pages/Dashboard';
import Home from './pages/Home';
import FeedbackPage from './pages/FeedbackForm';
import CreateTask from './pages/CreateTask';

function App() {
  return (
      <Routes>
        <Route path="/profilemanagement" element={<ProfileManagement />} />
        {/* <Route path="/workmanagement" element={<WorkManagement />} /> */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/showwork" element={<ShowWork />} />
        <Route path='/' element={<Home/>}/>
        <Route path='/feedback' element={<FeedbackPage/>}/>
        <Route path="/createtask" element={<CreateTask />} />
      </Routes>
  );
}

export default App;