interface Photo {
  albumId: number
  id: number
  title: string
  url: string
  thumbnailUrl: string
}

type SortBy = 'id' | 'name' | 'number'
