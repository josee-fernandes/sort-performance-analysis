/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useEffect, useState } from 'react'
import { SortCard } from './sort-card'
import { Braces } from 'lucide-react'
import { cn } from '@/lib/utils'
import { appApi } from '@/lib/axios'
import { SourceLength } from '@/constants/sort'
import { useChartData } from '@/contexts/chart-data'

interface NativeSortCardProps {
  sortBy: SortBy
  source: Source
}

export const NativeSortCard: React.FC<NativeSortCardProps> = ({
  sortBy,
  source,
}) => {
  const {
    setPlaceholderApiNativeTime,
    setSampleNativeTime,
    setNumbersNativeTime,
  } = useChartData()

  const [isSorting, setIsSorting] = useState(true)
  const [time, setTime] = useState(0)
  const [error, setError] = useState('')

  const sortAndMeasureTime = useCallback(async () => {
    console.log('🟨 Native by', sortBy)

    try {
      setIsSorting(true)

      const response = await appApi.post('/sort', {
        sortBy,
        algorithm: 'native',
        source,
      })

      switch (source) {
        case 'placeholderApi':
          setPlaceholderApiNativeTime(response.data.result)
          break
        case 'sample':
          setSampleNativeTime(response.data.result)
          break
        case 'numbers':
          setNumbersNativeTime(response.data.result)
          break
      }

      setTime(response.data.result)
    } catch (error: any) {
      setError(error?.message ?? 'Native sort error')

      return 0
    } finally {
      setIsSorting(false)
    }
  }, [
    setNumbersNativeTime,
    setPlaceholderApiNativeTime,
    setSampleNativeTime,
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
      name="JS Native Sort"
      time={time}
      count={SourceLength[source]}
      isSorting={isSorting}
      isActive={isSorting}
      error={error}
      icon={
        <Braces
          className={cn(
            'h-4 w-4 text-muted-foreground',
            isSorting && 'animate-spin',
          )}
        />
      }
    />
  )
}

NativeSortCard.displayName = 'NativeSortCard'
