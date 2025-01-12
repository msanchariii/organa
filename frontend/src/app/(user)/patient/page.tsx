import { Button } from "@/components/ui/button";
import Link from "next/link";

const PatientPage = () => {
    return (
        // <div>
        <div className="flex items-center justify-between">
            <h1>Patients</h1>
            <Button asChild>
                <Link href="/patient/add">Add Patient</Link>
            </Button>
        </div>
        // </div>
    );
};
export default PatientPage;
