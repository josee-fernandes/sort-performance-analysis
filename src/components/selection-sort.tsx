/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useEffect, useState } from 'react'
import { SortCard } from './sort-card'
import { Wand } from 'lucide-react'
import { cn } from '@/lib/utils'
import { selectionSort } from '@/utils/sort'
import { useSortingState } from '@/contexts/sorting-state'

interface SelectionSortCardProps {
  data: any[]
  sortBy: 'number' | 'name' | 'id'
}

export const SelectionSortCard: React.FC<SelectionSortCardProps> = ({
  data,
  sortBy,
}) => {
  const { nowSorting, updateNowSorting } = useSortingState()

  const [isSorting, setIsSorting] = useState(true)
  const [time, setTime] = useState(0)
  const [error, setError] = useState('')

  const sortAndMeasureTime = useCallback(
    async (arr: any[]) => {
      console.log('🔎 Selection by', sortBy)

      try {
        setIsSorting(true)

        const startSelectionSort = performance.now()
        await new Promise((resolve) => resolve(selectionSort(arr, sortBy)))
        const endSelectionSort = performance.now()
        const selectionSortTimeSpend = endSelectionSort - startSelectionSort

        setTime(selectionSortTimeSpend)
      } catch (error: any) {
        setError(error?.message ?? 'Selection sort error')

        return 0
      } finally {
        setIsSorting(false)
      }
    },
    [sortBy],
  )

  useEffect(() => {
    if (data?.length && nowSorting === 'selection') {
      sortAndMeasureTime(data).then(() => updateNowSorting('none'))
    }
  }, [data, sortAndMeasureTime, nowSorting, updateNowSorting])

  return (
    <SortCard
      name="Selection Sort"
      time={time}
      count={data?.length}
      isSorting={isSorting}
      isActive={nowSorting === 'selection'}
      error={error}
      icon={
        <Wand
          className={cn(
            'h-4 w-4 text-muted-foreground',
            isSorting && 'animate-spin',
          )}
        />
      }
    />
  )
}

SelectionSortCard.displayName = 'SelectionSortCard'
