import { BubbleSortCard } from '@/components/bubble-sort'
import { CocktailSortCard } from '@/components/cocktail-sort'
import { QuickSortCard } from '@/components/quick-sort'
import { ThemeToggle } from '@/components/theme-toggle'
import { NextPage } from 'next'

import { InsertionSortCard } from '@/components/insertion-sort'
import { MergeSortCard } from '@/components/merge-sort'
import { SelectionSortCard } from '@/components/selection-sort'
import { HeapSortCard } from '@/components/heap-sort'
import { NativeSortCard } from '@/components/native-sort'
import Head from 'next/head'
import { FlaskConical } from 'lucide-react'
import { CustomLineChart } from '@/components/custom-line-chart'

const HomePage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Sorting Performance Analysis</title>
      </Head>
      <div className="bg-background min-h-screen pb-10">
        <div className="border-b ">
          <div className="flex h-16 items-center px-8 justify-between space-y-2">
            <div className="flex items-center gap-1">
              <FlaskConical className="h-4 w-4" />
              <p className="text-lg font-bold tracking-tight">APS</p>
            </div>
            <div>
              <ThemeToggle />
            </div>
          </div>
        </div>
        <div className="flex-1 p-8 pt-6 max-w-[1200px] w-full mx-auto">
          <div className="flex flex-col gap-4 mt-10">
            <div className="flex items-center justify-between space-y-2">
              <h2 className="text-3xl font-bold tracking-tight">
                JSON Placeholder API (id)
              </h2>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <QuickSortCard source="placeholderApi" sortBy="id" />
              <BubbleSortCard source="placeholderApi" sortBy="id" />
              <CocktailSortCard source="placeholderApi" sortBy="id" />
              <InsertionSortCard source="placeholderApi" sortBy="id" />
              <MergeSortCard source="placeholderApi" sortBy="id" />
              <SelectionSortCard source="placeholderApi" sortBy="id" />
              <HeapSortCard source="placeholderApi" sortBy="id" />
              <NativeSortCard source="placeholderApi" sortBy="id" />
            </div>
            <CustomLineChart />
          </div>
          <div className="flex flex-col gap-4 mt-10">
            <div className="flex items-center justify-between space-y-2">
              <h2 className="text-3xl font-bold tracking-tight">
                Sample JSON data (name)
              </h2>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <QuickSortCard source="sample" sortBy="name" />
              <BubbleSortCard source="sample" sortBy="name" />
              <CocktailSortCard source="sample" sortBy="name" />
              <InsertionSortCard source="sample" sortBy="name" />
              <MergeSortCard source="sample" sortBy="name" />
              <SelectionSortCard source="sample" sortBy="name" />
              <HeapSortCard source="sample" sortBy="name" />
              <NativeSortCard source="sample" sortBy="name" />
            </div>
            <CustomLineChart />
          </div>
          <div className="flex flex-col gap-4 mt-10">
            <div className="flex items-center justify-between space-y-2">
              <h2 className="text-3xl font-bold tracking-tight">
                Numeric array
              </h2>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <QuickSortCard source="numbers" sortBy="number" />
              <BubbleSortCard source="numbers" sortBy="number" />
              <CocktailSortCard source="numbers" sortBy="number" />
              <InsertionSortCard source="numbers" sortBy="number" />
              <MergeSortCard source="numbers" sortBy="number" />
              <SelectionSortCard source="numbers" sortBy="number" />
              <HeapSortCard source="numbers" sortBy="number" />
              <NativeSortCard source="numbers" sortBy="number" />
            </div>
            <CustomLineChart />
          </div>
        </div>
      </div>
    </>
  )
}

HomePage.displayName = 'HomePage'

export default HomePage
