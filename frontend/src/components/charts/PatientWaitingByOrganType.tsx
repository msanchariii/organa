"use client"

import * as React from "react"
import { TrendingUp } from "lucide-react"
import { Label, Pie, PieChart } from "recharts"

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    ChartConfig,
    ChartContainer,
    ChartLegend,
    ChartLegendContent,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"

const chartData = [
    { organ: "Kidney", donors: 300, fill: "var(--color-kidney)" },
    { organ: "Heart", donors: 120, fill: "var(--color-heart)" },
    { organ: "Liver", donors: 200, fill: "var(--color-liver)" },
    { organ: "Lungs", donors: 150, fill: "var(--color-lungs)" },
    { organ: "Eyes", donors: 250, fill: "var(--color-eyes)" },
    { organ: "Intestine", donors: 90, fill: "var(--color-intestine)" },
]



const chartConfig = {
    donors: {
        label: "Donors",
    },
    kidney: {
        label: "Kidney",
        color: "hsl(var(--chart-1))",
    },
    heart: {
        label: "Heart",
        color: "hsl(var(--chart-2))",
    },
    liver: {
        label: "Liver",
        color: "hsl(var(--chart-3))",
    },
    lungs: {
        label: "Lungs",
        color: "hsl(var(--chart-4))",
    },
    eyes: {
        label: "Eyes",
        color: "hsl(var(--chart-5))",
    },
    intestine: {
        label: "Intestine",
        color: "hsl(var(--chart-6))",
    },
} satisfies ChartConfig


export function PatientWaitingByOrganType() {
    const totalVisitors = React.useMemo(() => {
        return chartData.reduce((acc, curr) => acc + curr.donors, 0)
    }, [])

    return (
        <Card className="flex flex-col bg-transparent h-full w-full">
            <CardHeader className="items-center pb-0">
                <CardTitle>Pie Chart - Donut with Text</CardTitle>
                <CardDescription>January - June 2024</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 pb-0">
                <ChartContainer
                    config={chartConfig}
                    className="mx-auto aspect-square max-h-[250px]"
                >
                    <PieChart>
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent hideLabel />}
                        />
                        <ChartLegend
                            content={<ChartLegendContent nameKey="organ" />}
                            className="-translate-y-2 flex-wrap gap-2 [&>*]:basis-1/4 [&>*]:justify-center"
                        />

                        <Pie
                            data={chartData}
                            dataKey="donors"
                            nameKey="organ"
                            innerRadius={60}
                            strokeWidth={5}
                        >
                            <Label
                                content={({ viewBox }) => {
                                    if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                                        return (
                                            <text
                                                x={viewBox.cx}
                                                y={viewBox.cy}
                                                textAnchor="middle"
                                                dominantBaseline="middle"
                                            >
                                                <tspan
                                                    x={viewBox.cx}
                                                    y={viewBox.cy}
                                                    className="fill-foreground text-3xl font-bold"
                                                >
                                                    {totalVisitors.toLocaleString()}
                                                </tspan>
                                                <tspan
                                                    x={viewBox.cx}
                                                    y={(viewBox.cy || 0) + 24}
                                                    className="fill-muted-foreground"
                                                >
                                                    Patients
                                                </tspan>
                                            </text>
                                        )
                                    }
                                }}
                            />
                        </Pie>
                    </PieChart>
                </ChartContainer>
            </CardContent>

        </Card>
    )
}
