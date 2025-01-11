import { Bell } from "lucide-react";

const Sidebar = () => {
    return (
        <div className="max-w-64 w-full bg-accent h-full p-6">
            <h1>Organa</h1>
            <div className="flex flex-col p-4">
                <div>Dashboard</div>
                <div>Organ</div>
                <div>
                    <Bell></Bell>
                    Matches
                </div>
                <div>Patient</div>
                <div>Settings</div>
            </div>
        </div>
    );
};
export default Sidebar;

/*
Top - Logo & Name
Middle - Navigation (Dashboard, Organ, matches, patient, settings)
Bottom - Logout
*/
