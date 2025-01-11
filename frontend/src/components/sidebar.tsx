import {
    Bell,
    LayoutDashboard,
    ClipboardMinus,
    HeartPulse,
    Settings,
} from "lucide-react";

const Sidebar = () => {
    return (
        <div className="bg-accent h-full w-full max-w-64 space-y-4 p-8">
            <h1 className="text-primary text-2xl font-bold">Organa</h1>
            <div className="flex flex-col gap-4">
                <div className="flex gap-2">
                    <LayoutDashboard></LayoutDashboard>
                    Dashboard
                </div>
                <div className="flex gap-2">
                    <HeartPulse></HeartPulse>
                    Organ
                </div>
                <div className="flex gap-2">
                    <Bell></Bell>
                    Matches
                </div>
                <div className="flex gap-2">
                    <ClipboardMinus></ClipboardMinus>
                    Patient
                </div>
                <div className="flex gap-2">
                    <Settings></Settings>
                    Settings
                </div>
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
