/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useEffect, useState } from 'react'
import { SortCard } from './sort-card'
import { Merge } from 'lucide-react'
import { cn } from '@/lib/utils'
import { appApi } from '@/lib/axios'
import { SourceLength } from '@/constants/sort'

interface MergeSortCardProps {
  sortBy: SortBy
  source: Source
}

export const MergeSortCard: React.FC<MergeSortCardProps> = ({
  sortBy,
  source,
}) => {
  const [isSorting, setIsSorting] = useState(true)
  const [time, setTime] = useState(0)
  const [error, setError] = useState('')

  const sortAndMeasureTime = useCallback(async () => {
    console.log('➕ Merge by', sortBy)

    try {
      setIsSorting(true)

      const response = await appApi.post('/sort', {
        sortBy,
        algorithm: 'merge',
        source,
      })

      setTime(response.data.result)
    } catch (error: any) {
      setError(error?.message ?? 'Merge sort error')

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
      name="Merge Sort"
      time={time}
      count={SourceLength[source]}
      isSorting={isSorting}
      isActive={isSorting}
      error={error}
      icon={
        <Merge
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
