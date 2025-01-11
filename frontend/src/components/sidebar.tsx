import { Bell } from "lucide-react";

const Sidebar = () => {
    return (
        <div className="max-w-xs w-full bg-primary h-full p-6">
            sidebar
            <nav>
                <Bell></Bell>
            </nav>
        </div>
    );
};
export default Sidebar;

/*
Top - Logo & Name
Middle - Navigation (Dashboard, Organ, matches, patient, settings)
Bottom - Logout
*/
