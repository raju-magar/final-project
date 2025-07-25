import { useState } from "react";
import { motion } from "framer-motion";
import { User, Mail, Phone, MapPin, Briefcase, Building, Edit, Save, X } from "lucide-react";

export default function ProfileView({ user, isEditable = true }) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    fullName: user.profile?.fullName || "",
    email: user.email || "",
    mobile: user.mobile || "",
    location: user.profile?.location || "",
    bio: user.profile?.bio || "",
    website: user.profile?.website || "",
    // Job seeker specific fields
    skills: user.profile?.skills || [],
    education: user.profile?.education || [],
    experience: user.profile?.experience || [],
    // Employer specific fields
    companyName: user.profile?.companyName || user.profile?.fullName || "",
    industry: user.profile?.industry || "",
    companySize: user.profile?.companySize || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSkillChange = (e) => {
    const skills = e.target.value.split(",").map(skill => skill.trim());
    setFormData((prev) => ({ ...prev, skills }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, this would call an API to update the user's profile
    console.log("Updating profile with:", formData);
    
    // For now, just simulate a successful update
    setTimeout(() => {
      setIsEditing(false);
      alert("Profile updated successfully!");
    }, 1000);
  };

  const renderViewMode = () => {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-800">Profile Information</h2>
          {isEditable && (
            <button
              onClick={() => setIsEditing(true)}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              <Edit size={16} />
              <span>Edit Profile</span>
            </button>
          )}
        </div>

        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="p-6 bg-gradient-to-r from-blue-500 to-purple-600 text-white">
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center">
                {user.profile?.avatar ? (
                  <img
                    src={user.profile.avatar}
                    alt={user.profile?.fullName || user.username}
                    className="w-full h-full rounded-full object-cover"
                  />
                ) : (
                  <User size={40} className="text-blue-500" />
                )}
              </div>
              <div>
                <h3 className="text-2xl font-bold">
                  {user.role === "employer"
                    ? formData.companyName
                    : formData.fullName}
                </h3>
                <p className="text-blue-100">
                  {user.role === "employer" ? "Employer" : "Job Seeker"}
                </p>
              </div>
            </div>
          </div>

          <div className="p-6 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Mail className="text-blue-500 mt-1" size={18} />
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Email</h4>
                    <p className="text-gray-800">{formData.email}</p>
                  </div>
                </div>

                {formData.mobile && (
                  <div className="flex items-start gap-3">
                    <Phone className="text-blue-500 mt-1" size={18} />
                    <div>
                      <h4 className="text-sm font-medium text-gray-500">Mobile</h4>
                      <p className="text-gray-800">{formData.mobile}</p>
                    </div>
                  </div>
                )}

                {formData.location && (
                  <div className="flex items-start gap-3">
                    <MapPin className="text-blue-500 mt-1" size={18} />
                    <div>
                      <h4 className="text-sm font-medium text-gray-500">Location</h4>
                      <p className="text-gray-800">{formData.location}</p>
                    </div>
                  </div>
                )}

                {formData.website && (
                  <div className="flex items-start gap-3">
                    <Building className="text-blue-500 mt-1" size={18} />
                    <div>
                      <h4 className="text-sm font-medium text-gray-500">Website</h4>
                      <a
                        href={formData.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        {formData.website}
                      </a>
                    </div>
                  </div>
                )}
              </div>

              <div className="space-y-4">
                {user.role === "employer" && (
                  <>
                    {formData.industry && (
                      <div className="flex items-start gap-3">
                        <Briefcase className="text-blue-500 mt-1" size={18} />
                        <div>
                          <h4 className="text-sm font-medium text-gray-500">Industry</h4>
                          <p className="text-gray-800">{formData.industry}</p>
                        </div>
                      </div>
                    )}

                    {formData.companySize && (
                      <div className="flex items-start gap-3">
                        <Building className="text-blue-500 mt-1" size={18} />
                        <div>
                          <h4 className="text-sm font-medium text-gray-500">Company Size</h4>
                          <p className="text-gray-800">{formData.companySize}</p>
                        </div>
                      </div>
                    )}
                  </>
                )}

                {user.role === "job-seeker" && formData.skills && formData.skills.length > 0 && (
                  <div className="flex items-start gap-3">
                    <Briefcase className="text-blue-500 mt-1" size={18} />
                    <div>
                      <h4 className="text-sm font-medium text-gray-500">Skills</h4>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {formData.skills.map((skill, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {formData.bio && (
              <div className="pt-4 border-t border-gray-200">
                <h4 className="text-sm font-medium text-gray-500 mb-2">Bio</h4>
                <p className="text-gray-800 whitespace-pre-line">{formData.bio}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  const renderEditMode = () => {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-800">Edit Profile</h2>
          <button
            onClick={() => setIsEditing(false)}
            className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
          >
            <X size={16} />
            <span>Cancel</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="p-6 bg-gradient-to-r from-blue-500 to-purple-600 text-white">
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center relative group">
                {user.profile?.avatar ? (
                  <img
                    src={user.profile.avatar}
                    alt={user.profile?.fullName || user.username}
                    className="w-full h-full rounded-full object-cover"
                  />
                ) : (
                  <User size={40} className="text-blue-500" />
                )}
                <div className="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                  <Edit size={20} className="text-white" />
                </div>
              </div>
              <div>
                <input
                  type="text"
                  name={user.role === "employer" ? "companyName" : "fullName"}
                  value={user.role === "employer" ? formData.companyName : formData.fullName}
                  onChange={handleChange}
                  className="bg-transparent border-b border-white text-2xl font-bold text-white w-full focus:outline-none"
                  placeholder={user.role === "employer" ? "Company Name" : "Full Name"}
                />
                <p className="text-blue-100">
                  {user.role === "employer" ? "Employer" : "Job Seeker"}
                </p>
              </div>
            </div>
          </div>

          <div className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="Email"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Mobile</label>
                <input
                  type="text"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="Mobile"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="Location"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Website</label>
                <input
                  type="text"
                  name="website"
                  value={formData.website}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="Website"
                />
              </div>

              {user.role === "employer" && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Industry</label>
                    <input
                      type="text"
                      name="industry"
                      value={formData.industry}
                      onChange={handleChange}
                      className="w-full p-2 border border-gray-300 rounded-md"
                      placeholder="Industry"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Company Size</label>
                    <select
                      name="companySize"
                      value={formData.companySize}
                      onChange={handleChange}
                      className="w-full p-2 border border-gray-300 rounded-md"
                    >
                      <option value="">Select company size</option>
                      <option value="1-10">1-10 employees</option>
                      <option value="11-50">11-50 employees</option>
                      <option value="51-200">51-200 employees</option>
                      <option value="201-500">201-500 employees</option>
                      <option value="501+">501+ employees</option>
                    </select>
                  </div>
                </>
              )}

              {user.role === "job-seeker" && (
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Skills (comma separated)</label>
                  <input
                    type="text"
                    name="skills"
                    value={formData.skills.join(", ")}
                    onChange={handleSkillChange}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    placeholder="e.g. JavaScript, React, Node.js"
                  />
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                rows={4}
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder="Tell us about yourself or your company"
              ></textarea>
            </div>

            <div className="flex justify-end pt-4">
              <button
                type="submit"
                className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                <Save size={16} />
                <span>Save Changes</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      {isEditing ? renderEditMode() : renderViewMode()}
    </motion.div>
  );
}