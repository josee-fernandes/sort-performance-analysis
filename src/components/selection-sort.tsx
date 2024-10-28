/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useEffect, useState } from 'react'
import { SortCard } from './sort-card'
import { Wand } from 'lucide-react'
import { cn } from '@/lib/utils'
import { appApi } from '@/lib/axios'
import { SourceLength } from '@/constants/sort'
import { useChartData } from '@/contexts/chart-data'

interface SelectionSortCardProps {
  sortBy: SortBy
  source: Source
}

export const SelectionSortCard: React.FC<SelectionSortCardProps> = ({
  sortBy,
  source,
}) => {
  const {
    setPlaceholderApiSelectionTime,
    setSampleSelectionTime,
    setNumbersSelectionTime,
  } = useChartData()

  const [isSorting, setIsSorting] = useState(true)
  const [time, setTime] = useState(0)
  const [error, setError] = useState('')

  const sortAndMeasureTime = useCallback(async () => {
    console.log('🔎 Selection by', sortBy)

    try {
      setIsSorting(true)

      const response = await appApi.post('/sort', {
        sortBy,
        algorithm: 'selection',
        source,
      })

      switch (source) {
        case 'placeholderApi':
          setPlaceholderApiSelectionTime(response.data.result)
          break
        case 'sample':
          setSampleSelectionTime(response.data.result)
          break
        case 'numbers':
          setNumbersSelectionTime(response.data.result)
          break
      }

      setTime(response.data.result)
    } catch (error: any) {
      setError(error?.message ?? 'Selection sort error')

      return 0
    } finally {
      setIsSorting(false)
    }
  }, [
    setNumbersSelectionTime,
    setPlaceholderApiSelectionTime,
    setSampleSelectionTime,
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
      name="Selection Sort"
      time={time}
      count={SourceLength[source]}
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
