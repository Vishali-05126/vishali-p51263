"use client"

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent
} from "@/components/ui/chart"

const chartData = [
  { week: "Week 1", acute: 186, chronic: 80 },
  { week: "Week 2", acute: 305, chronic: 200 },
  { week: "Week 3", acute: 237, chronic: 120 },
  { week: "Week 4", acute: 273, chronic: 190 },
  { week: "Week 5", acute: 209, chronic: 130 },
  { week: "Week 6", acute: 214, chronic: 140 },
  { week: "Week 7", acute: 350, chronic: 200 },
  { week: "Week 8", acute: 180, chronic: 220 },
]

const chartConfig = {
  acute: {
    label: "Acute Workload",
    color: "hsl(var(--chart-1))",
  },
  chronic: {
    label: "Chronic Workload",
    color: "hsl(var(--chart-2))",
  },
}

export function LoadChart() {
  return (
    <div className="w-full">
        <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
            <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
                dataKey="week"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tickFormatter={(value) => value.slice(0, 6)}
            />
            <YAxis />
            <ChartTooltip content={<ChartTooltipContent />} />
            <ChartLegend content={<ChartLegendContent />} />
            <Bar dataKey="chronic" fill="var(--color-chronic)" radius={4} />
            <Bar dataKey="acute" fill="var(--color-acute)" radius={4} />
            </BarChart>
        </ChartContainer>
    </div>
  )
}
