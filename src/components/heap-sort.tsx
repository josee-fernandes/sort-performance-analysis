/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useEffect, useState } from 'react'
import { SortCard } from './sort-card'
import { Network } from 'lucide-react'
import { cn } from '@/lib/utils'
import { appApi } from '@/lib/axios'
import { SourceLength } from '@/constants/sort'
import { useChartData } from '@/contexts/chart-data'

interface HeapSortCardProps {
  sortBy: SortBy
  source: Source
}

export const HeapSortCard: React.FC<HeapSortCardProps> = ({
  sortBy,
  source,
}) => {
  const { setPlaceholderApiHeapTime, setSampleHeapTime, setNumbersHeapTime } =
    useChartData()

  const [isSorting, setIsSorting] = useState(true)
  const [time, setTime] = useState(0)
  const [error, setError] = useState('')

  const sortAndMeasureTime = useCallback(async () => {
    console.log('🌿 Heap by', sortBy)

    try {
      setIsSorting(true)

      const response = await appApi.post('/sort', {
        sortBy,
        algorithm: 'heap',
        source,
      })

      switch (source) {
        case 'placeholderApi':
          setPlaceholderApiHeapTime(response.data.result)
          break
        case 'sample':
          setSampleHeapTime(response.data.result)
          break
        case 'numbers':
          setNumbersHeapTime(response.data.result)
          break
      }

      setTime(response.data.result)
    } catch (error: any) {
      setError(error?.message ?? 'Heap sort error')

      return 0
    } finally {
      setIsSorting(false)
    }
  }, [
    setNumbersHeapTime,
    setPlaceholderApiHeapTime,
    setSampleHeapTime,
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
      name="Heap Sort"
      time={time}
      count={SourceLength[source]}
      isSorting={isSorting}
      isActive={isSorting}
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
