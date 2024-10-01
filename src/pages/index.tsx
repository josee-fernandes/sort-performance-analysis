import { BubbleSortCard } from '@/components/bubble-sort'
import { CocktailSortCard } from '@/components/cocktail-sort'
import { QuickSortCard } from '@/components/quick-sort'
import { ThemeToggle } from '@/components/theme-toggle'
import { getPhotos } from '@/services/placeholder-api'
import { useQuery } from '@tanstack/react-query'
import { NextPage } from 'next'

import sample from '@/services/sample.json'
import { shuffle } from '@/utils/array'
import { InsertionSortCard } from '@/components/insertion-sort'
import { SortingStateContextProvider } from '@/contexts/sorting-state'
import { MergeSortCard } from '@/components/merge-sort'
import { SelectionSortCard } from '@/components/selection-sort'
import { HeapSortCard } from '@/components/heap-sort'
import { NativeSortCard } from '@/components/native-sort'
import Head from 'next/head'
import { FlaskConical } from 'lucide-react'

const numbers = shuffle(Array.from({ length: 20000 }, (_, i) => i))
const shuffledSample = shuffle(sample as Sample)

const HomePage: NextPage = () => {
  const {
    data: photos,
    isLoading: isLoadingPhotos,
    error: photosError,
  } = useQuery({
    queryKey: ['photos'],
    queryFn: () => getPhotos(),
    staleTime: Infinity,
  })

  if (photosError) return <div>Error loading photos</div>

  return (
    <>
      <Head>
        <title>Sorting Performance Analysis</title>
      </Head>
      <div className="bg-background min-h-screen">
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
        <SortingStateContextProvider>
          <div className="flex-1 p-8 pt-6">
            <div className="flex flex-col gap-4 mt-10">
              <div className="flex items-center justify-between space-y-2">
                <h2 className="text-3xl font-bold tracking-tight">
                  JSON Placeholder API (id)
                </h2>
                {isLoadingPhotos && <div>Loading photos...</div>}
              </div>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <QuickSortCard data={photos ?? []} sortBy="id" />
                <BubbleSortCard data={photos ?? []} sortBy="id" />
                <CocktailSortCard data={photos ?? []} sortBy="id" />
                <InsertionSortCard data={photos ?? []} sortBy="id" />
                <MergeSortCard data={photos ?? []} sortBy="id" />
                <SelectionSortCard data={photos ?? []} sortBy="id" />
                <HeapSortCard data={photos ?? []} sortBy="id" />
                <NativeSortCard data={photos ?? []} sortBy="id" />
              </div>
            </div>
            <div className="flex flex-col gap-4 mt-10">
              <div className="flex items-center justify-between space-y-2">
                <h2 className="text-3xl font-bold tracking-tight">
                  Sample JSON data (name)
                </h2>
              </div>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <QuickSortCard data={shuffledSample} sortBy="name" />
                <BubbleSortCard data={shuffledSample} sortBy="name" />
                <CocktailSortCard data={shuffledSample} sortBy="name" />
                <InsertionSortCard data={shuffledSample} sortBy="name" />
                <MergeSortCard data={shuffledSample} sortBy="name" />
                <SelectionSortCard data={shuffledSample} sortBy="name" />
                <HeapSortCard data={shuffledSample} sortBy="name" />
                <NativeSortCard data={shuffledSample} sortBy="name" />
              </div>
            </div>
            <div className="flex flex-col gap-4 mt-10">
              <div className="flex items-center justify-between space-y-2">
                <h2 className="text-3xl font-bold tracking-tight">
                  Numeric array
                </h2>
              </div>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <QuickSortCard data={numbers} sortBy="number" />
                <BubbleSortCard data={numbers} sortBy="number" />
                <CocktailSortCard data={numbers} sortBy="number" />
                <InsertionSortCard data={numbers} sortBy="number" />
                <MergeSortCard data={numbers} sortBy="number" />
                <SelectionSortCard data={numbers} sortBy="number" />
                <HeapSortCard data={numbers} sortBy="number" />
                <NativeSortCard data={numbers} sortBy="number" />
              </div>
            </div>
          </div>
        </SortingStateContextProvider>
      </div>
    </>
  )
}

HomePage.displayName = 'HomePage'

export default HomePage
