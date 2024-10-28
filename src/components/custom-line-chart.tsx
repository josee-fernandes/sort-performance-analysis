import { CartesianGrid, LabelList, Line, LineChart } from 'recharts'

import { Card, CardContent } from '@/components/ui/card'
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'

export const description = 'A line chart with a custom label'

const chartData = [
  { algorithm: 'quick', time: 275 },
  { algorithm: 'bubble', time: 200 },
  { algorithm: 'cocktail', time: 187 },
  { algorithm: 'insertion', time: 173 },
  { algorithm: 'merge', time: 90 },
  { algorithm: 'selection', time: 90 },
  { algorithm: 'heap', time: 90 },
  { algorithm: 'js-native', time: 90 },
]

const chartConfig = {
  time: {
    label: 'Time',
    color: 'hsl(var(--chart-2))',
  },
  quick: {
    label: 'Quick',
    color: 'hsl(var(--chart-1))',
  },
  bubble: {
    label: 'Bubble',
    color: 'hsl(var(--chart-2))',
  },
  cocktail: {
    label: 'Cocktail',
    color: 'hsl(var(--chart-3))',
  },
  insertion: {
    label: 'Insertion',
    color: 'hsl(var(--chart-4))',
  },
  merge: {
    label: 'Merge',
    color: 'hsl(var(--chart-1))',
  },
  selection: {
    label: 'Selection',
    color: 'hsl(var(--chart-2))',
  },
  heap: {
    label: 'Heap',
    color: 'hsl(var(--chart-3))',
  },
  'js-native': {
    label: 'JS Native',
    color: 'hsl(var(--chart-4))',
  },
} satisfies ChartConfig

export const CustomLineChart: React.FC = () => {
  return (
    <Card>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              top: 30,
              left: 30,
              right: 30,
            }}
          >
            <CartesianGrid vertical={false} />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  indicator="line"
                  nameKey="time"
                  hideLabel
                />
              }
            />
            <Line
              dataKey="time"
              type="natural"
              stroke="hsl(var(--foreground))"
              strokeWidth={2}
              dot={{
                fill: 'hsl(var(--foreground))',
              }}
              activeDot={{
                r: 6,
              }}
            >
              <LabelList
                position="top"
                offset={20}
                className="fill-foreground"
                fontSize={12}
                dataKey="algorithm"
                formatter={(value: keyof typeof chartConfig) =>
                  chartConfig[value]?.label
                }
              />
            </Line>
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

CustomLineChart.displayName = 'CustomLineChart'
