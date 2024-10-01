/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useEffect, useState } from 'react'
import { SortCard } from './sort-card'
import { Braces } from 'lucide-react'
import { cn } from '@/lib/utils'
import { nativeSort } from '@/utils/sort'
import { useSortingState } from '@/contexts/sorting-state'

interface NativeSortCardProps {
  data: any[]
  sortBy: 'number' | 'name' | 'id'
}

export const NativeSortCard: React.FC<NativeSortCardProps> = ({
  data,
  sortBy,
}) => {
  const { nowSorting, updateNowSorting } = useSortingState()

  const [isSorting, setIsSorting] = useState(true)
  const [time, setTime] = useState(0)
  const [error, setError] = useState('')

  const sortAndMeasureTime = useCallback(
    async (arr: any[]) => {
      console.log('🟨 Native by', sortBy)

      try {
        setIsSorting(true)

        const startNativeSort = performance.now()
        await new Promise((resolve) => resolve(nativeSort(arr, sortBy)))
        const endNativeSort = performance.now()
        const nativeSortTimeSpend = endNativeSort - startNativeSort

        setTime(nativeSortTimeSpend)
      } catch (error: any) {
        setError(error?.message ?? 'Native sort error')

        return 0
      } finally {
        setIsSorting(false)
      }
    },
    [sortBy],
  )

  useEffect(() => {
    if (data?.length && nowSorting === 'native') {
      sortAndMeasureTime(data).then(() => updateNowSorting('none'))
    }
  }, [data, sortAndMeasureTime, nowSorting, updateNowSorting])

  return (
    <SortCard
      name="JS Native Sort"
      time={time}
      count={data?.length}
      isSorting={isSorting}
      isActive={nowSorting === 'native'}
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
