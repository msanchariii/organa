import MatchCard from "@/components/match-card";
import H2 from "@/components/typography/H2";
import H4 from "@/components/typography/H4";
import { Separator } from "@/components/ui/separator";
import { Bell } from "lucide-react";

const MatcherPage = () => {
    return (
        <div className="space-y-4">
            <div className="flex justify-between">
                <H2>Match Alerts</H2>
                <Bell size={36} className="text-primary" />
            </div>
            <div className="flex w-full justify-between gap-4">
                <div className="shadow-border/50 mb-8 grid flex-grow grid-cols-1 items-center justify-center gap-4 rounded-xl border p-4 shadow-lg">
                    <H4 className="mb-4 mt-2">New Updates</H4>
                    <Separator />
                    <div className="grid grid-cols-1 gap-4">
                        <MatchCard></MatchCard>
                        <MatchCard></MatchCard>
                        <MatchCard></MatchCard>
                    </div>
                </div>
                <div className="shadow-border/50 max-h-96 w-72 rounded-xl border shadow-lg"></div>
            </div>
        </div>
    );
};
export default MatcherPage;
