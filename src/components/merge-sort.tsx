/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useEffect, useState } from 'react'
import { SortCard } from './sort-card'
import { BetweenVerticalStart } from 'lucide-react'
import { cn } from '@/lib/utils'
import { mergeSort } from '@/utils/sort'
import { useSortingState } from '@/contexts/sorting-state'

interface MergeSortCardProps {
  data: any[]
  sortBy: 'number' | 'name' | 'id'
}

export const MergeSortCard: React.FC<MergeSortCardProps> = ({
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

        const startMergeSort = performance.now()
        await new Promise((resolve) => resolve(mergeSort(arr, sortBy)))
        const endMergeSort = performance.now()
        const mergeSortTimeSpend = endMergeSort - startMergeSort

        setTime(mergeSortTimeSpend)
      } catch (error: any) {
        setError(error?.message ?? 'Merge sort error')

        return 0
      } finally {
        setIsSorting(false)
      }
    },
    [sortBy],
  )

  useEffect(() => {
    if (data?.length && nowSorting === 'merge') {
      sortAndMeasureTime(data).then(() => updateNowSorting('none'))
    }
  }, [data, sortAndMeasureTime, nowSorting, updateNowSorting])

  return (
    <SortCard
      name="Merge Sort"
      time={time}
      count={data?.length}
      isSorting={isSorting}
      isActive={nowSorting === 'merge'}
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

MergeSortCard.displayName = 'MergeSortCard'
