/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useEffect, useState } from 'react'
import { SortCard } from './sort-card'
import { Wand } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useSortingState } from '@/contexts/sorting-state'
import { appApi } from '@/lib/axios'

interface SelectionSortCardProps {
  data: any[]
  sortBy: 'number' | 'name' | 'id'
}

export const SelectionSortCard: React.FC<SelectionSortCardProps> = ({
  data,
  sortBy,
}) => {
  const [isSorting, setIsSorting] = useState(true)
  const [time, setTime] = useState(0)
  const [error, setError] = useState('')

  const sortAndMeasureTime = useCallback(
    async (arr: any[]) => {
      console.log('🔎 Selection by', sortBy)

      try {
        setIsSorting(true)

        const response = await appApi.post('/sort', {
          data: arr,
          sortBy,
          algorithm: 'selection',
        })

        setTime(response.data.result)
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
    if (data?.length) {
      sortAndMeasureTime(data)
    }
  }, [data, sortAndMeasureTime])

  return (
    <SortCard
      name="Selection Sort"
      time={time}
      count={data?.length}
      isSorting={isSorting}
      isActive={isSorting}
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
