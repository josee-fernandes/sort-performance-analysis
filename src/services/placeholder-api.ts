import { placeholderApi } from '@/lib/axios'
import { shuffle } from '@/utils/array'

type GetPhotosFnParams = void

type GetPhotosFnResponse = Photo[]

type GetPhotosFn = (params: GetPhotosFnParams) => Promise<GetPhotosFnResponse>

export const getPhotos: GetPhotosFn = async () => {
  try {
    const response = await placeholderApi.get<GetPhotosFnResponse>('/photos')

    return shuffle(response?.data ?? [])
  } catch (error) {
    console.error(error)
    throw error
  }
}
