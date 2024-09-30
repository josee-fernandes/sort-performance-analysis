import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { ArrowDown01 } from 'lucide-react'

interface SortCardProps {
  name: string
  time: number
  count: number
  icon?: React.ReactNode
}

export const SortCard: React.FC<SortCardProps> = ({
  name,
  time,
  count,
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
        <p className="text-2xl font-bold">{time}ms</p>
        <p className="text-xs text-muted-foreground">{count} items sorted</p>
      </CardContent>
    </Card>
  )
}
