import { BubbleSortCard } from '@/components/bubble-sort'
import { CocktailSortCard } from '@/components/cocktail-sort'
import { QuickSortCard } from '@/components/quick-sort'
import { ThemeToggle } from '@/components/theme-toggle'
import { getPhotos } from '@/services/placeholder-api'
import { useQuery } from '@tanstack/react-query'
import { NextPage } from 'next'

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
    <div className="bg-background min-h-screen">
      <div className="border-b ">
        <div className="flex h-16 items-center px-8 justify-between space-y-2">
          <p className="text-xl font-bold tracking-tight">APS</p>
          <div>
            <ThemeToggle />
          </div>
        </div>
      </div>
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Sorting</h2>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <QuickSortCard data={photos ?? []} sortBy="id" />
          <BubbleSortCard data={photos ?? []} sortBy="id" />
          <CocktailSortCard data={photos ?? []} sortBy="id" />
        </div>
        {isLoadingPhotos && <div>Loading photos...</div>}
      </div>
    </div>
  )
}

HomePage.displayName = 'HomePage'

export default HomePage
