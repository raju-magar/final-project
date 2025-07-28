import JobSeekerDashboard from "./JobSeekerDashboard";
import EmployerDashboard from  "./EmployerDashboard";

export default function RoleBasedDashboard({ user }) {
    if (!user?.role) {
        return <p>No Role found</p>;
    }

    switch (user.role) {
        case "Job-seeker":
            return <JobSeekerDashboard user={user} />;
            case "employer":
                return <EmployerDashboard user={user} />;
                default: 
                return <p>Unknown role: {user.role}</p>;
    }
}