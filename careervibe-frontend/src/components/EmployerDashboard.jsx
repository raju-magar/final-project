export default function EmployerDashboard({ user }) {
  return (
    <div>
      <h2>Welcome, {user.fullName} (Employer)</h2>
      <p>You have posted {user.jobsPostedCount || 0} jobs.</p>
      <p>You have {user.applicantsCount || 0} new applicants.</p>
      {/* Add more employer specific UI */}
    </div>
  );
}
