import React from "react";

import { Area, AreaChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer } from "recharts";
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
} from "@/components/ui/chart";

export const description = "A simple area chart";

const chartData = [
  { month: "Jan", desktop: 500 },
  { month: "Feb", desktop: 200 },
  { month: "Mar", desktop: 250 },
  { month: "Apr", desktop: 350 },
  { month: "May", desktop: 400 },
  { month: "Jun", desktop: 450 },
  { month: "Jul", desktop: 380 },
  { month: "Aug", desktop: 300 },
  { month: "Sep", desktop: 350 },
  { month: "Oct", desktop: 280 },
  { month: "Nov", desktop: 400 },
  { month: "Dec", desktop: 430 },
];

const Charts: React.FC = () => {
  const chartConfig = {
    desktop: {
      label: "Desktop",
      color: "var(--chart-1)",
    },
  };

  return (
    <Card
      style={{ backgroundImage: "url(/images/bgImage.png)" }}
      className="bg-custom-gradient bg-no-repeat bg-cover  mt-5 h-[700px] overflow-scroll  shadow-none border-none"
    >
      <CardHeader>
        <CardTitle className="text-3xl text-white">Sales overview</CardTitle>
        <CardDescription className="text-2xl"><span className="text-green-600">(+5) more</span> in 2021</CardDescription>
      </CardHeader>

      <CardContent>
        <ChartContainer config={chartConfig}>
         <ResponsiveContainer width="100%" height={0}>
  <AreaChart
    className="text-white"
    data={chartData}
    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
  >
    <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="#e0e0e0" />
    <XAxis
      dataKey="month"
      tickLine={false}
      axisLine={false}
      tickMargin={8}
      tickFormatter={(value) => value.slice(0, 3)}            
      stroke="#fff"
    />
    <YAxis
      tickLine={false}
      axisLine={false}
      tickMargin={8}
      stroke="#fff" 
    />
    <ChartTooltip
      cursor={false}
      content={<ChartTooltipContent indicator="line" />}
    />
    <Area
      dataKey="desktop"
      type="monotone"
      fill="#1E40AF"
      fillOpacity={0.6}
      stroke="#3B82F6"
      strokeWidth={4}
    />
  </AreaChart>
</ResponsiveContainer>
        </ChartContainer>
      </CardContent>

      <CardFooter></CardFooter>
    </Card>
  );
};

export default Charts;
