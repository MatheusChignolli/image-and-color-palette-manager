/* eslint-disable @typescript-eslint/no-unused-vars */
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { v4 } from 'uuid'
import toast from 'react-hot-toast'

import { Comment } from '@/types/comments'
import { Image } from '@/types/images'

interface ImageStore {
  images: Record<string, Image>
  getImage: (key: string) => Image | undefined
  deleteImage: (key: string) => void
  createImage: (name: string, content: string, tags?: string[], groups?: string[]) => void
  editImage: (
    key: string,
    name: string,
    content?: string,
    tags?: string[],
    groups?: string[]
  ) => void
  addComment: (imageId: string, content: string) => void
  deleteComment: (imageId: string, commentId: string) => void
  removeGroupFromImages: (groupId: string) => void
  removeTagFromImages: (tagId: string) => void
}

export const useImagesStorage = create<ImageStore>()(
  persist(
    (set, get) => ({
      images: {},
      getImage: key => get().images[key],
      deleteImage: key => {
        set(state => {
          const { [key]: _, ...updatedImages } = state.images
          return { images: updatedImages }
        })
        toast(`Image deleted`)
      },
      createImage: (name, content, tags = [], groups = []) => {
        const id = v4()
        const timestamp = new Date().toISOString()

        const newImage: Image = {
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
      },
      removeGroupFromImages: (groupId: string) => {
        set(state => {
          const updatedImages = Object.keys(state.images).reduce(
            (acc, key) => {
              const image = state.images[key]
              acc[key] = {
                ...image,
                groups: image.groups.filter(g => g !== groupId),
                updatedAt: new Date().toISOString()
              }
              return acc
            },
            {} as Record<string, Image>
          )

          return { images: updatedImages }
        })
        toast.success(`Group removed from images`)
      },
      removeTagFromImages: (tag: string) => {
        set(state => {
          const updatedImages = Object.keys(state.images).reduce(
            (acc, key) => {
              const image = state.images[key]
              acc[key] = {
                ...image,
                tags: image.tags.filter(t => t !== tag),
                updatedAt: new Date().toISOString()
              }
              return acc
            },
            {} as Record<string, Image>
          )

          return { images: updatedImages }
        })
        toast.success(`Tag removed from images`)
      }
    }),
    {
      name: 'image-storage'
    }
  )
)
