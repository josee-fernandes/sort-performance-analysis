/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useEffect, useState } from 'react'
import { SortCard } from './sort-card'
import { Zap } from 'lucide-react'
import { cn } from '@/lib/utils'
import { quickSort } from '@/utils/sort'

interface QuickSortCardProps {
  data: any[]
  sortBy: 'number' | 'name' | 'id'
}

export const QuickSortCard: React.FC<QuickSortCardProps> = ({
  data,
  sortBy,
}) => {
  console.log('Renderizado', sortBy)

  const [isSorting, setIsSorting] = useState(true)
  const [time, setTime] = useState(0)
  const [error, setError] = useState('')

  const sortAndMeasureTime = useCallback(
    async (arr: any[]) => {
      console.log('by', sortBy)

      try {
        setIsSorting(true)

        const startQuickSort = performance.now()
        await new Promise((resolve) =>
          resolve(quickSort(arr, 0, arr.length - 1, sortBy)),
        )
        const endQuickSort = performance.now()
        const quickSortTimeSpend = endQuickSort - startQuickSort

        setTime(quickSortTimeSpend)
      } catch (error: any) {
        setError(error?.message ?? 'Quick sort error')

        return 0
      } finally {
        setIsSorting(false)
      }
    },
    [sortBy],
  )

  useEffect(() => {
    console.log(isSorting)
  }, [isSorting])

  useEffect(() => {
    if (data?.length) {
      sortAndMeasureTime(data)
    }
  }, [data, sortAndMeasureTime])

  return (
    <SortCard
      name="Quick Sort"
      time={time}
      count={data?.length}
      isSorting={isSorting}
      error={error}
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
