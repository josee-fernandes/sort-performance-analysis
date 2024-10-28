/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useEffect, useState } from 'react'
import { SortCard } from './sort-card'
import { CircleDashed } from 'lucide-react'
import { cn } from '@/lib/utils'
import { appApi } from '@/lib/axios'
import { SourceLength } from '@/constants/sort'
import { useChartData } from '@/contexts/chart-data'

interface BubbleSortCardProps {
  sortBy: SortBy
  source: Source
}

export const BubbleSortCard: React.FC<BubbleSortCardProps> = ({
  sortBy,
  source,
}) => {
  const {
    setPlaceholderApiBubbleTime,
    setSampleBubbleTime,
    setNumbersBubbleTime,
  } = useChartData()

  const [isSorting, setIsSorting] = useState(true)
  const [time, setTime] = useState(0)
  const [error, setError] = useState('')

  const sortAndMeasureTime = useCallback(async () => {
    console.log('🫧 Bubble by', sortBy)

    try {
      setIsSorting(true)

      const response = await appApi.post('/sort', {
        sortBy,
        algorithm: 'bubble',
        source,
      })

      switch (source) {
        case 'placeholderApi':
          setPlaceholderApiBubbleTime(response.data.result)
          break
        case 'sample':
          setSampleBubbleTime(response.data.result)
          break
        case 'numbers':
          setNumbersBubbleTime(response.data.result)
          break
      }

      setTime(response.data.result)
    } catch (error: any) {
      setError(error?.message ?? 'Bubble sort error')

      return 0
    } finally {
      setIsSorting(false)
    }
  }, [
    setNumbersBubbleTime,
    setPlaceholderApiBubbleTime,
    setSampleBubbleTime,
    sortBy,
    source,
  ])

  useEffect(() => {
    if (time === 0) {
      sortAndMeasureTime()
    }
  }, [sortAndMeasureTime, time])

  return (
    <SortCard
      name="Bubble Sort"
      time={time}
      count={SourceLength[source]}
      isSorting={isSorting}
      isActive={isSorting}
      error={error}
      icon={
        <CircleDashed
          className={cn(
            'h-4 w-4 text-muted-foreground',
            isSorting && 'animate-spin',
          )}
        />
      }
    />
  )
}

BubbleSortCard.displayName = 'BubbleSortCard'
