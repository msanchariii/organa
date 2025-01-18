"use client";

import MatchCard from "@/components/match-card";
import H2 from "@/components/typography/H2";
import H3 from "@/components/typography/H3";
import { Separator } from "@/components/ui/separator";
import useAuth from "@/store/AuthStore";
import { Bell } from "lucide-react";
import { formatDistanceToNow, parseISO } from "date-fns";

const MatcherPage = () => {
    const notifications = useAuth((state) => state.user?.notifications);

    const formatTimeAgo = (isoDate: string) => {
        return formatDistanceToNow(parseISO(isoDate), { addSuffix: true });
    };

    return (
        <div className="space-y-4">
            <div className="flex justify-between">
                <H2>Match Alerts</H2>
                <Bell size={36} className="text-primary" />
            </div>
            <div className="flex w-full justify-between gap-4">
                <div className="shadow-border/50 mb-8 grid flex-grow grid-cols-1 items-center justify-center gap-4 rounded-xl border p-4 shadow-lg">
                    <H3>New Updates</H3>
                    <Separator />
                    <div className="grid grid-cols-1 gap-4">
                        {notifications?.map((n, index) => (
                            <MatchCard
                                // notificationData={n}
                                key={index}
                                notification={{
                                    time: formatTimeAgo(n.date), // Use the formatted time
                                }}
                                organ={{
                                    organType: n.recipientData.organ_type,
                                    organViability:
                                        n.recipientData
                                            .expected_preservation_time,
                                    organSize: n.recipientData.organ_size,
                                    priorityStatus:
                                        n.patientData.priority_status,
                                    organCondition:
                                        n.recipientData.organ_condition_rating,
                                }}
                                donor={{
                                    // name: n.recipientData.name || "KANKAN",
                                    bloodGroup: n.patientData.blood_type,
                                    hlaA: n.patientData.hla_test?.hlaA,
                                    hlaB: n.patientData.hla_test?.hlaB,
                                    hlaC: n.patientData.hla_test?.hlaC,
                                    hlaDRB1: n.patientData.hla_test?.hlaDRB1,
                                    hlaDQB1: n.patientData.hla_test?.hlaDQB1,
                                }}
                                recepient={{
                                    name: n.patientData.name,
                                    age: n.recipientData.donor_age,
                                    gender: n.patientData.gender,
                                    location: n.patientData.location,
                                    bloodGroup: n.patientData.blood_type,
                                    hlaA: n.patientData.hla_test?.hlaA,
                                    hlaB: n.patientData.hla_test?.hlaB,
                                    hlaC: n.patientData.hla_test?.hlaC,
                                    hlaDRB1: n.patientData.hla_test?.hlaDRB1,
                                    hlaDQB1: n.patientData.hla_test?.hlaDQB1,
                                }}
                                compatibility={{
                                    score: n.patientData.pra_score.toString(),
                                    geminiSummary:
                                        n.patientData.priority_status.toString(),
                                }}
                            />
                        ))}
                    </div>
                </div>
                <div className="shadow-border/50 max-h-96 w-72 rounded-xl border shadow-lg"></div>
            </div>
        </div>
    );
};
export default MatcherPage;
