/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useEffect, useState } from 'react'
import { SortCard } from './sort-card'
import { Merge } from 'lucide-react'
import { cn } from '@/lib/utils'
import { appApi } from '@/lib/axios'
import { SourceLength } from '@/constants/sort'
import { useChartData } from '@/contexts/chart-data'

interface MergeSortCardProps {
  sortBy: SortBy
  source: Source
}

export const MergeSortCard: React.FC<MergeSortCardProps> = ({
  sortBy,
  source,
}) => {
  const {
    setPlaceholderApiMergeTime,
    setSampleMergeTime,
    setNumbersMergeTime,
  } = useChartData()

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

      switch (source) {
        case 'placeholderApi':
          setPlaceholderApiMergeTime(response.data.result)
          break
        case 'sample':
          setSampleMergeTime(response.data.result)
          break
        case 'numbers':
          setNumbersMergeTime(response.data.result)
          break
      }

      setTime(response.data.result)
    } catch (error: any) {
      setError(error?.message ?? 'Merge sort error')

      return 0
    } finally {
      setIsSorting(false)
    }
  }, [
    setNumbersMergeTime,
    setPlaceholderApiMergeTime,
    setSampleMergeTime,
    sortBy,
    source,
  ])

  useEffect(() => {
    if (time === 0) {
      sortAndMeasureTime()
    }
  }, [sortAndMeasureTime, time])

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
