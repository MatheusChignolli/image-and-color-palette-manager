import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { v4 } from 'uuid'
import toast from 'react-hot-toast'

interface Tag {
  name: string
  color: string
}

interface Comment {
  id: string
  createdAt: string
  updatedAt: string
  content: string
}

interface ImageEntity {
  id: string
  createdAt: string
  updatedAt: string
  name: string
  tags: Tag[]
  groups: string[]
  content: string
  comments: Comment[]
}

interface ImageStore {
  images: Record<string, ImageEntity>
  getImage: (key: string) => ImageEntity | undefined
  deleteImage: (key: string) => void
  createImage: (name: string, content: string, tags?: Tag[], groups?: string[]) => void
  editImage: (
    key: string,
    name: string,
    content?: string,
    tags?: Tag[],
    groups?: string[]
  ) => void
  addComment: (imageId: string, content: string) => void
  deleteComment: (imageId: string, commentId: string) => void
}

export const useImageStorage = create<ImageStore>()(
  persist(
    (set, get) => ({
      images: {},
      getImage: key => get().images[key],
      deleteImage: key => {
        set(state => {
          const images = { ...state.images }
          delete images[key]
          return { images }
        })
        toast(`Image deleted`)
      },
      createImage: (name, content, tags = [], groups = []) => {
        const id = v4()
        const timestamp = new Date().toISOString()

        const newImage: ImageEntity = {
          id,
          createdAt: timestamp,
          updatedAt: timestamp,
          name,
          tags,
          groups,
          content,
          comments: []
        }

        set(state => ({
          images: {
            ...state.images,
            [id]: newImage
          }
        }))
        toast.success(`Image "${name}" created`)
      },
      editImage: (key, name, content, tags, groups) => {
        set(state => {
          const image = state.images[key]
          if (image) {
            const updatedImage = {
              ...image,
              name,
              updatedAt: new Date().toISOString(),
              ...(content !== undefined && { content }),
              ...(tags !== undefined && { tags }),
              ...(groups !== undefined && { groups })
            }
            return {
              images: {
                ...state.images,
                [key]: updatedImage
              }
            }
          }
          return state
        })
        toast.success(`Image "${name}" edited`)
      },
      addComment: (imageId, content) => {
        set(state => {
          const image = state.images[imageId]
          if (image) {
            const newComment: Comment = {
              id: v4(),
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
              content
            }
            return {
              images: {
                ...state.images,
                [imageId]: {
                  ...image,
                  comments: [...image.comments, newComment],
                  updatedAt: new Date().toISOString()
                }
              }
            }
          }
          return state
        })
        toast.success(`Comment added`)
      },
      deleteComment: (imageId, commentId) => {
        set(state => {
          const image = state.images[imageId]
          if (image) {
            return {
              images: {
                ...state.images,
                [imageId]: {
                  ...image,
                  comments: image.comments.filter(comment => comment.id !== commentId),
                  updatedAt: new Date().toISOString()
                }
              }
            }
          }
          return state
        })
        toast(`Comment deleted`)
      }
    }),
    {
      name: 'image-storage'
    }
  )
)
