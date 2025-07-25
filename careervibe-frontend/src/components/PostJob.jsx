// src/components/PostJob.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function PostJob() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    salary: "",
    requirements: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/api/jobs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        alert("Job posted successfully!");
        navigate("/dashboard"); // or another redirect
      } else {
        alert("Failed to post job.");
      }
    } catch (err) {
      console.error("Error posting job:", err);
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-12 bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-6">Post a New Job</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="title"
          placeholder="Job Title"
          className="w-full p-2 border rounded"
          onChange={handleChange}
          required
        />
        <textarea
          name="description"
          placeholder="Job Description"
          className="w-full p-2 border rounded"
          rows={4}
          onChange={handleChange}
          required
        />
        <input
          name="location"
          placeholder="Location"
          className="w-full p-2 border rounded"
          onChange={handleChange}
          required
        />
        <input
          name="salary"
          placeholder="Salary"
          className="w-full p-2 border rounded"
          onChange={handleChange}
        />
        <textarea
          name="requirements"
          placeholder="Requirements"
          className="w-full p-2 border rounded"
          rows={3}
          onChange={handleChange}
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
