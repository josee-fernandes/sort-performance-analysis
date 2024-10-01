/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useEffect, useState } from 'react'
import { SortCard } from './sort-card'
import { Network } from 'lucide-react'
import { cn } from '@/lib/utils'
import { heapSort } from '@/utils/sort'
import { useSortingState } from '@/contexts/sorting-state'

interface HeapSortCardProps {
  data: any[]
  sortBy: 'number' | 'name' | 'id'
}

export const HeapSortCard: React.FC<HeapSortCardProps> = ({ data, sortBy }) => {
  const { nowSorting, updateNowSorting } = useSortingState()

  const [isSorting, setIsSorting] = useState(true)
  const [time, setTime] = useState(0)
  const [error, setError] = useState('')

  const sortAndMeasureTime = useCallback(
    async (arr: any[]) => {
      console.log('🌿 Heap by', sortBy)

      try {
        setIsSorting(true)

        const startHeapSort = performance.now()
        await new Promise((resolve) => resolve(heapSort(arr, sortBy)))
        const endHeapSort = performance.now()
        const heapSortTimeSpend = endHeapSort - startHeapSort

        setTime(heapSortTimeSpend)
      } catch (error: any) {
        setError(error?.message ?? 'Heap sort error')

        return 0
      } finally {
        setIsSorting(false)
      }
    },
    [sortBy],
  )

  useEffect(() => {
    if (data?.length && nowSorting === 'heap') {
      sortAndMeasureTime(data).then(() => updateNowSorting('none'))
    }
  }, [data, sortAndMeasureTime, nowSorting, updateNowSorting])

  return (
    <SortCard
      name="Heap Sort"
      time={time}
      count={data?.length}
      isSorting={isSorting}
      isActive={nowSorting === 'heap'}
      error={error}
      icon={
        <Network
          className={cn(
            'h-4 w-4 text-muted-foreground',
            isSorting && 'animate-spin',
          )}
        />
      }
    />
  )
}

HeapSortCard.displayName = 'HeapSortCard'
