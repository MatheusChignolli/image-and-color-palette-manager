import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type Comment = {
  id: string
  createdAt: string
  updatedAt: string
  content: string
  deleted: boolean
}

interface ImageEntity {
  id: string
  createdAt: string
  updatedAt: string
  tags: string[]
  groups: string[]
  content: string
  comments: Comment[]
}

interface ImageStore {
  images: Record<string, ImageEntity> // Store image entities with the key as the image ID
  setItem: (key: string, value: ImageEntity) => void
  getItem: (key: string) => ImageEntity | undefined
  deleteItem: (key: string) => void
}

export const useImageStore = create(
  persist<ImageStore>(
    set => ({
      images: {},
      setItem: (key, value) =>
        set(state => ({
          images: {
            ...state.images,
            [key]: value
          }
        })),
      getItem: key => state => state.images[key],
      deleteItem: key =>
        set(state => {
          const { [key]: _, ...rest } = state.images
          return { images: rest }
        })
    }),
    {
      name: 'image-storage' // Key used for localStorage
    }
  )
)
