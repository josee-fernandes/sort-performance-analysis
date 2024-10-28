/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useEffect, useState } from 'react'
import { SortCard } from './sort-card'
import { BetweenVerticalStart } from 'lucide-react'
import { cn } from '@/lib/utils'
import { appApi } from '@/lib/axios'
import { SourceLength } from '@/constants/sort'

interface InsertionSortCardProps {
  sortBy: SortBy
  source: Source
}

export const InsertionSortCard: React.FC<InsertionSortCardProps> = ({
  sortBy,
  source,
}) => {
  const [isSorting, setIsSorting] = useState(true)
  const [time, setTime] = useState(0)
  const [error, setError] = useState('')

  const sortAndMeasureTime = useCallback(async () => {
    console.log('📥 Insertion by', sortBy)

    try {
      setIsSorting(true)

      const response = await appApi.post('/sort', {
        sortBy,
        algorithm: 'insertion',
        source,
      })

      setTime(response.data.result)
    } catch (error: any) {
      setError(error?.message ?? 'Insertion sort error')

      return 0
    } finally {
      setIsSorting(false)
    }
  }, [sortBy, source])

  useEffect(() => {
    sortAndMeasureTime()
  }, [sortAndMeasureTime])

  return (
    <SortCard
      name="Insertion Sort"
      time={time}
      count={SourceLength[source]}
      isSorting={isSorting}
      isActive={isSorting}
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
