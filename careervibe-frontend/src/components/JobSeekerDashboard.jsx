export default function JobSeekerDashboard({ user }) {
  return (
    <div>
      <h2>Welcome, {user.fullName} (Job Seeker)</h2>
      <p>You have applied to {user.appliedJobsCount || 0} jobs.</p>
      <p>You have saved {user.savedJobsCount || 0} jobs.</p>
      {/* Add more job seeker specific UI */}
    </div>
  );
}
