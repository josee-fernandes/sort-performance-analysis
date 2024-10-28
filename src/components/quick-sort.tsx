/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useEffect, useState } from 'react'
import { SortCard } from './sort-card'
import { Zap } from 'lucide-react'
import { cn } from '@/lib/utils'
import { appApi } from '@/lib/axios'
import { SourceLength } from '@/constants/sort'
import { useChartData } from '@/contexts/chart-data'

interface QuickSortCardProps {
  sortBy: SortBy
  source: Source
}

export const QuickSortCard: React.FC<QuickSortCardProps> = ({
  sortBy,
  source,
}) => {
  const {
    setPlaceholderApiQuickTime,
    setSampleQuickTime,
    setNumbersQuickTime,
  } = useChartData()

  const [isSorting, setIsSorting] = useState(true)
  const [time, setTime] = useState(0)
  const [error, setError] = useState('')

  const sortAndMeasureTime = useCallback(async () => {
    console.log('⚡ Quick by', sortBy)

    try {
      setIsSorting(true)

      const response = await appApi.post('/sort', {
        sortBy,
        algorithm: 'quick',
        source,
      })

      switch (source) {
        case 'placeholderApi':
          setPlaceholderApiQuickTime(response.data.result)
          break
        case 'sample':
          setSampleQuickTime(response.data.result)
          break
        case 'numbers':
          setNumbersQuickTime(response.data.result)
          break
      }

      setTime(response.data.result)
    } catch (error: any) {
      setError(error?.message ?? 'Quick sort error')

      return 0
    } finally {
      setIsSorting(false)
    }
  }, [
    setNumbersQuickTime,
    setPlaceholderApiQuickTime,
    setSampleQuickTime,
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
      name="Quick Sort"
      time={time}
      count={SourceLength[source]}
      isSorting={isSorting}
      isActive={isSorting}
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
