import { HlaMatchSuccessRate } from "@/components/charts/HlaMatchSuccessRate";
import { OperationSuccessRate } from "@/components/charts/OperationSuccessRate";
import { PatientWaitingByOrganType } from "@/components/charts/PatientWaitingByOrganType";
import { TransplantCompleted } from "@/components/charts/TransplantCompleted";
import H3 from "@/components/typography/H3";
import { Heart } from "lucide-react";

const DashboardPage = () => {
    return (
        <div className="space-y-4 pb-4">
            <div className="grid grid-cols-5 gap-4">
                <div className="bg-primary text-primary-foreground col-span-2 rounded-xl border p-4">
                    <h1 className="font-semibold">
                        Hello, <br />{" "}
                        <span className="text-3xl font-bold">
                            Hospital Staff
                        </span>
                    </h1>
                    <p></p>
                </div>
                <div className="border-primary col-span-2 space-y-8 rounded-xl border p-4 text-center">
                    <H3>Statistics</H3>
                    <div className="divide-y px-4">
                        <StatComponent title="Total Patients" value="100" />
                        <StatComponent title="Transplants" value="50" />
                        <StatComponent title="Available Organs" value="3" />
                    </div>
                </div>
                <OperationSuccessRate />
            </div>
            <div className="">
                <TransplantCompleted />
            </div>
            <div className="grid grid-cols-2 gap-4">
                <PatientWaitingByOrganType />
                <HlaMatchSuccessRate />
            </div>
        </div>
    );
};
export default DashboardPage;

const StatComponent = ({
    title,
    value,
    children,
}: {
    title: string;
    value: string | number;
    children?: React.ReactNode;
}) => {
    return (
        // <div className="flex w-full cursor-pointer flex-col items-center justify-center p-4 text-center">
        //     <div>
        //         <Heart size={32} />
        //     </div>
        <div className="flex h-16 w-full cursor-pointer flex-col items-center justify-center p-4 text-center">
            <p className="mx-auto font-bold">{value}</p>
            <p className="mx-auto text-xs">{title}</p>
        </div>
        // </div>
    );
};
