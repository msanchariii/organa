import { HlaMatchSuccessRate } from "@/components/charts/HlaMatchSuccessRate";
import { OperationSuccessRate } from "@/components/charts/OperationSuccessRate";
import { PatientWaitingByOrganType } from "@/components/charts/PatientWaitingByOrganType";
import { TransplantCompleted } from "@/components/charts/TransplantCompleted";

const DashboardPage = () => {
    return <div>
        <PatientWaitingByOrganType />
        <TransplantCompleted />
        <HlaMatchSuccessRate />
        <OperationSuccessRate />
    </div>;
};
export default DashboardPage;
