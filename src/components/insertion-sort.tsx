/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useEffect, useState } from 'react'
import { SortCard } from './sort-card'
import { BetweenVerticalStart } from 'lucide-react'
import { cn } from '@/lib/utils'
import { insertionSort } from '@/utils/sort'
import { useSortingState } from '@/contexts/sorting-state'

interface InsertionSortCardProps {
  data: any[]
  sortBy: 'number' | 'name' | 'id'
}

export const InsertionSortCard: React.FC<InsertionSortCardProps> = ({
  data,
  sortBy,
}) => {
  const { nowSorting, updateNowSorting } = useSortingState()

  const [isSorting, setIsSorting] = useState(true)
  const [time, setTime] = useState(0)
  const [error, setError] = useState('')

  const sortAndMeasureTime = useCallback(
    async (arr: any[]) => {
      console.log('📥 Insertion by', sortBy)

      try {
        setIsSorting(true)

        const startInsertionSort = performance.now()
        await new Promise((resolve) => resolve(insertionSort(arr, sortBy)))
        const endInsertionSort = performance.now()
        const insertionSortTimeSpend = endInsertionSort - startInsertionSort

        setTime(insertionSortTimeSpend)
      } catch (error: any) {
        setError(error?.message ?? 'Insertion sort error')

        return 0
      } finally {
        setIsSorting(false)
      }
    },
    [sortBy],
  )

  useEffect(() => {
    if (data?.length && nowSorting === 'insertion') {
      sortAndMeasureTime(data).then(() => updateNowSorting('merge'))
    }
  }, [data, sortAndMeasureTime, nowSorting, updateNowSorting])

  return (
    <SortCard
      name="Insertion Sort"
      time={time}
      count={data?.length}
      isSorting={isSorting}
      isActive={nowSorting === 'insertion'}
      error={error}
      icon={
        <BetweenVerticalStart
          className={cn(
            'h-4 w-4 text-muted-foreground',
            isSorting && 'animate-spin',
          )}
        />
      }
    />
  )
}

InsertionSortCard.displayName = 'InsertionSortCard'
