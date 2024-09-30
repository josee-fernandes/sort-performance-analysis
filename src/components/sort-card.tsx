import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { ArrowDown01 } from 'lucide-react'
import { cn } from '@/lib/utils'

interface SortCardProps {
  name: string
  time: number
  count: number
  isSorting: boolean
  error?: string
  icon?: React.ReactNode
}

export const SortCard: React.FC<SortCardProps> = ({
  name,
  time,
  count,
  isSorting,
  error,
  icon,
}) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{name}</CardTitle>
        {icon ? (
          <>{icon}</>
        ) : (
          <ArrowDown01 className="h-4 w-4 text-muted-foreground" />
        )}
      </CardHeader>
      <CardContent>
        <p
          className={cn(
            'text-2xl font-bold transition-colors',
            error && !isSorting ? 'text-rose-500' : 'text-emerald-500',
            isSorting && 'text-amber-500',
          )}
        >
          {time}ms
        </p>
        <p className="text-xs text-muted-foreground">
          {isSorting && `Sorting ${count} items`}
          {error && `Could not sort ${count} items`}
          {!isSorting && !error && `${count} items sorted`}
        </p>
      </CardContent>
    </Card>
  )
}
