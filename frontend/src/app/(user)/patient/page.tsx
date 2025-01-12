import H2 from "@/components/typography/H2";
import H4 from "@/components/typography/H4";
import { Button } from "@/components/ui/button";
import DataTable from "@/components/data-table";
import Link from "next/link";

interface Patient {
    id: number;
    name: string;
    age: number;
    bloodType: string;
    organNeeded: string;
    priorityStatus: number;
    status: "Waiting" | "Matched" | "Transplanted" | "Deceased";
}

const patients: Patient[] = [
    {
        id: 1,
        name: "Alice Johnson",
        age: 45,
        bloodType: "O+",
        organNeeded: "Kidney",
        status: "Waiting",
        priorityStatus: 1.9,
    },
    {
        id: 2,
        name: "Bob Smith",
        age: 52,
        bloodType: "A-",
        organNeeded: "Liver",
        status: "Matched",
        priorityStatus: 2.6,
    },
    {
        id: 3,
        name: "Charlie Davis",
        age: 36,
        bloodType: "B+",
        organNeeded: "Heart",
        status: "Transplanted",
        priorityStatus: 3.2,
    },
];

const headers: (keyof Patient)[] = [
    "id",
    "name",
    "age",
    "bloodType",
    "organNeeded",
    "status",
];

const PatientPage = () => {
    return (
        // <div>
        <div className="space-y-4">
            <div className="flex justify-between">
                <H2>Match Alerts</H2>
                <Button asChild>
                    <Link href="/patient/add">Add Patient</Link>
                </Button>
                {/* <Bell size={36} className="text-primary" /> */}
            </div>
            <div className="flex w-full justify-between gap-4">
                <div className="shadow-border/50 mb-8 grid flex-grow grid-cols-1 items-center justify-center gap-4 rounded-xl border p-4 shadow-lg">
                    <H4 className="mb-4 mt-2">Waitlist</H4>
                    <DataTable
                        headers={headers}
                        data={patients}
                        caption="Current Waitlist for Organ Donation"
                    />
                </div>
                <div className="shadow-border/50 max-h-96 w-72 rounded-xl border p-4 shadow-lg">
                    <h6 className="text-xl font-bold">Filter</h6>
                </div>
            </div>
        </div>
    );
};
export default PatientPage;
