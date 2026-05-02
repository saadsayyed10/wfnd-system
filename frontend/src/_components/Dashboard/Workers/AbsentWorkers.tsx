import { CartesianGrid, Line, LineChart, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";

export const description = "A line chart with step";

const chartData = [
  { week: "Monday", present: 5 },
  { week: "Tuesday", present: 3 },
  { week: "Wednesday", present: 0 },
  { week: "Thursday", present: 0 },
  { week: "Friday", present: 12 },
  { week: "Saturday", present: 3 },
  { week: "Sunday", present: 0 },
];

const chartConfig = {
  desktop: {
    label: "Present",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

export default function AbsentWorkers() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Attendance Absent Chart</CardTitle>
        <CardDescription>April 20 - April 22</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="week"
              interval={0}
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Line
              dataKey="present"
              type="step"
              stroke="red"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="leading-none text-muted-foreground">
          Showing total absent workers for the last 7 days
        </div>
      </CardFooter>
    </Card>
  );
}
