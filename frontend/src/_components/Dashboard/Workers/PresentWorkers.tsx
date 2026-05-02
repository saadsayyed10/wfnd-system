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
  { week: "Monday", present: 186 },
  { week: "Tuesday", present: 305 },
  { week: "Wednesday", present: 237 },
  { week: "Thursday", present: 73 },
  { week: "Friday", present: 209 },
  { week: "Saturday", present: 214 },
  { week: "Sunday", present: 250 },
];

const chartConfig = {
  desktop: {
    label: "Present",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

export default function PresentWorkers() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Attendance Present Chart</CardTitle>
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
              stroke="green"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="leading-none text-muted-foreground">
          Showing total present workers for the last 7 days
        </div>
      </CardFooter>
    </Card>
  );
}
