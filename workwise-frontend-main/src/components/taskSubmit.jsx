import { useState } from "react";
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "../components/ui/select";

export default function TaskDashboard() {
  const [task, setTask] = useState({
    name: "",
    skills: "Custom",
    description: "",
    quality: "",
    status: "Open",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://192.168.224.229:8000/task_submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(task),
      });
      const data = await response.json();
      console.log("Task submitted:", data);
    } catch (error) {
      console.error("Error submitting task:", error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-lg p-6 bg-white shadow-lg rounded-lg">
        <CardContent>
          <h2 className="text-xl font-semibold mb-4">Create Task</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input name="name" placeholder="Task Name" value={task.name} onChange={handleChange} required />
            <Input name="skills" placeholder="Skills" value={task.skills} onChange={handleChange} required />
            <Input name="description" placeholder="Description" value={task.description} onChange={handleChange} required />
            
            <Select onValueChange={(value) => setTask({ ...task, quality: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Select Quality (1-10)" />
              </SelectTrigger>
              <SelectContent>
                {[...Array(10)].map((_, i) => (
                  <SelectItem key={i + 1} value={(i + 1).toString()}>{i + 1}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Select onValueChange={(value) => setTask({ ...task, status: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Select Status" />
              </SelectTrigger>
              <SelectContent>
                {["Open", "On Hold", "Completed", "Closed"].map((status) => (
                  <SelectItem key={status} value={status}>{status}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Button type="submit" className="w-full">Submit Task</Button>

            {message && <p className={`text-center mt-2 ${message.startsWith("✅") ? "text-green-600" : "text-red-600"}`}>{message}</p>}
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
