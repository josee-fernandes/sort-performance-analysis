import {
  CartesianGrid,
  LabelList,
  Line,
  LineChart,
  XAxis,
  YAxis,
} from 'recharts'

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useChartData } from '@/contexts/chart-data'

export const description = 'A line chart with a custom label'

type ChartDataItem = {
  algorithm: string
  time: string
}

const chartConfig = {
  time: {
    label: 'Time (ms)',
    color: 'hsl(var(--chart-2))',
  },
  // quick: {
  //   label: 'Quick',
  //   color: 'hsl(var(--chart-1))',
  // },
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
  native: {
    label: 'JS Native',
    color: 'hsl(var(--chart-4))',
  },
} satisfies ChartConfig

interface CustomLineChartProps {
  source: Source
}

const min = 0

export const CustomLineChart: React.FC<CustomLineChartProps> = ({ source }) => {
  const {
    placeholderApiQuickTime,
    placeholderApiBubbleTime,
    placeholderApiCocktailTime,
    placeholderApiInsertionTime,
    placeholderApiMergeTime,
    placeholderApiSelectionTime,
    placeholderApiHeapTime,
    placeholderApiNativeTime,
    sampleQuickTime,
    sampleBubbleTime,
    sampleCocktailTime,
    sampleInsertionTime,
    sampleMergeTime,
    sampleSelectionTime,
    sampleHeapTime,
    sampleNativeTime,
    numbersQuickTime,
    numbersBubbleTime,
    numbersCocktailTime,
    numbersInsertionTime,
    numbersMergeTime,
    numbersSelectionTime,
    numbersHeapTime,
    numbersNativeTime,
  } = useChartData()

  const [chartData, setChartData] = useState<ChartDataItem[]>([])

  const max = useMemo(
    () => Math.ceil(Math.max(...chartData.map((d) => Number(d.time)))) + 10,
    [chartData],
  )

  const loadPlaceholderApiData = useCallback(() => {
    const updatedData = [
      { algorithm: 'quick', time: placeholderApiQuickTime.toFixed(2) },
      { algorithm: 'bubble', time: placeholderApiBubbleTime.toFixed(2) },
      { algorithm: 'cocktail', time: placeholderApiCocktailTime.toFixed(2) },
      { algorithm: 'insertion', time: placeholderApiInsertionTime.toFixed(2) },
      { algorithm: 'merge', time: placeholderApiMergeTime.toFixed(2) },
      { algorithm: 'selection', time: placeholderApiSelectionTime.toFixed(2) },
      { algorithm: 'heap', time: placeholderApiHeapTime.toFixed(2) },
      { algorithm: 'native', time: placeholderApiNativeTime.toFixed(2) },
    ]

    setChartData(updatedData)
  }, [
    placeholderApiQuickTime,
    placeholderApiBubbleTime,
    placeholderApiCocktailTime,
    placeholderApiInsertionTime,
    placeholderApiMergeTime,
    placeholderApiSelectionTime,
    placeholderApiHeapTime,
    placeholderApiNativeTime,
  ])

  const loadSampleData = useCallback(() => {
    const updatedData = [
      { algorithm: 'quick', time: sampleQuickTime.toFixed(2) },
      { algorithm: 'bubble', time: sampleBubbleTime.toFixed(2) },
      { algorithm: 'cocktail', time: sampleCocktailTime.toFixed(2) },
      { algorithm: 'insertion', time: sampleInsertionTime.toFixed(2) },
      { algorithm: 'merge', time: sampleMergeTime.toFixed(2) },
      { algorithm: 'selection', time: sampleSelectionTime.toFixed(2) },
      { algorithm: 'heap', time: sampleHeapTime.toFixed(2) },
      { algorithm: 'native', time: sampleNativeTime.toFixed(2) },
    ]

    setChartData(updatedData)
  }, [
    sampleQuickTime,
    sampleBubbleTime,
    sampleCocktailTime,
    sampleInsertionTime,
    sampleMergeTime,
    sampleSelectionTime,
    sampleHeapTime,
    sampleNativeTime,
  ])

  const loadNumbersData = useCallback(() => {
    const updatedData: ChartDataItem[] = [
      { algorithm: 'quick', time: numbersQuickTime.toFixed(2) },
      { algorithm: 'bubble', time: numbersBubbleTime.toFixed(2) },
      { algorithm: 'cocktail', time: numbersCocktailTime.toFixed(2) },
      { algorithm: 'insertion', time: numbersInsertionTime.toFixed(2) },
      { algorithm: 'merge', time: numbersMergeTime.toFixed(2) },
      { algorithm: 'selection', time: numbersSelectionTime.toFixed(2) },
      { algorithm: 'heap', time: numbersHeapTime.toFixed(2) },
      { algorithm: 'native', time: numbersNativeTime.toFixed(2) },
    ]

    setChartData(updatedData)
  }, [
    numbersQuickTime,
    numbersBubbleTime,
    numbersCocktailTime,
    numbersInsertionTime,
    numbersMergeTime,
    numbersSelectionTime,
    numbersHeapTime,
    numbersNativeTime,
  ])

  useEffect(() => {
    if (source === 'placeholderApi') loadPlaceholderApiData()
  }, [loadPlaceholderApiData, source])

  useEffect(() => {
    if (source === 'sample') loadSampleData()
  }, [loadSampleData, source])

  useEffect(() => {
    if (source === 'numbers') loadNumbersData()
  }, [loadNumbersData, source])

  if (!chartData.length) return <></>

  if (chartData.find((d) => d.time === '0.00')) return <></>

  return (
    <>
      <div>
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
            <XAxis
              dataKey="algorithm"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            <YAxis tickCount={10} type="number" unit="ms" domain={[min, max]} />
            <Line
              dataKey="time"
              type="monotone"
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
      </div>
    </>
  )
}

CustomLineChart.displayName = 'CustomLineChart'
