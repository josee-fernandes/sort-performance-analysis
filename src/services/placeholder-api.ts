import { placeholderApi } from '@/lib/axios'

type GetPhotosFnParams = void

type GetPhotosFnResponse = Photo[]

type GetPhotosFn = (params: GetPhotosFnParams) => Promise<GetPhotosFnResponse>

export const getPhotos: GetPhotosFn = async () => {
  const response = await placeholderApi.get<GetPhotosFnResponse>('/photos')

  return response.data
}
