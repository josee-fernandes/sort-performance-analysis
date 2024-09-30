/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useEffect, useState } from 'react'
import { SortCard } from './sort-card'
import { Zap } from 'lucide-react'
import { cn } from '@/lib/utils'
import { quickSort } from '@/utils/sort'

interface QuickSortCardProps {
  data: any[]
  sortBy: 'numeric' | 'alphabetical' | 'id'
}

export const QuickSortCard: React.FC<QuickSortCardProps> = ({
  data,
  sortBy,
}) => {
  const [isSorting, setIsSorting] = useState(false)

  const [time, setTime] = useState(0)

  const sortAndMeasureTime = useCallback(
    (arr: any[]) => {
      console.log('by', sortBy)

      setIsSorting(true)

      const startQuickSort = performance.now()
      quickSort(arr, 0, arr.length - 1)
      const endQuickSort = performance.now()
      const quickSortTimeSpend = endQuickSort - startQuickSort

      setIsSorting(false)

      return quickSortTimeSpend
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
      name="Quick Sort"
      time={time}
      count={data?.length}
      icon={
        <Zap
          className={cn(
            'h-4 w-4 text-muted-foreground',
            isSorting && 'animate-spin',
          )}
        />
      }
    />
  )
}

QuickSortCard.displayName = 'QuickSortCard'
