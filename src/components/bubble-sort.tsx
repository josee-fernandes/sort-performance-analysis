/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useEffect, useState } from 'react'
import { SortCard } from './sort-card'
import { Circle } from 'lucide-react'
import { cn } from '@/lib/utils'
import { bubbleSort } from '@/utils/sort'

interface BubbleSortCardProps {
  data: any[]
  sortBy: 'numeric' | 'alphabetical' | 'id'
}

export const BubbleSortCard: React.FC<BubbleSortCardProps> = ({
  data,
  sortBy,
}) => {
  const [isSorting, setIsSorting] = useState(false)

  const [time, setTime] = useState(0)

  const sortAndMeasureTime = useCallback(
    (arr: any[]) => {
      console.log('by', sortBy)

      setIsSorting(true)

      const startBubbleSort = performance.now()
      bubbleSort(arr)
      const endBubbleSort = performance.now()
      const bubbleSortTimeSpend = endBubbleSort - startBubbleSort

      setIsSorting(false)

      return bubbleSortTimeSpend
    },
    [sortBy],
  )

  useEffect(() => {
    if (data?.length) {
      setTime(sortAndMeasureTime(data))
    }
  }, [data, sortAndMeasureTime])

  return (
    <SortCard
      name="Bubble Sort"
      time={time}
      count={data?.length}
      icon={
        <Circle
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
