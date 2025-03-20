import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { v4 } from 'uuid'
import toast from 'react-hot-toast'

import { Tag } from '@/types/tags'

interface TagStore {
  tags: Record<string, Tag>
  getTag: (key: string) => Tag | undefined
  deleteTag: (key: string) => void
  createTag: (name: string, color: string) => void
  editTag: (key: string, name: string) => void
}

export const useTagsStorage = create<TagStore>()(
  persist(
    (set, get) => ({
      tags: {},
      getTag: key => get().tags[key],
      deleteTag: key => {
        set(state => {
          const tags = { ...state.tags }
          delete tags[key]
          return { tags }
        })
        toast(`Tag deleted`)
      },
      createTag: (name: string, color: string) => {
        const id = v4()
        const timestamp = new Date().toISOString()

        const newTag: Tag = {
          id,
          createdAt: timestamp,
          updatedAt: timestamp,
          name,
          color
        }

        set(state => ({
          tags: {
            ...state.tags,
            [id]: newTag
          }
        }))
        toast.success(`Tag "${name}" created`)
      },
      editTag: (key: string, name: string) => {
        set(state => {
          const tag = state.tags[key]
          if (tag) {
            const updatedTag = {
              ...tag,
              name,
              updatedAt: new Date().toISOString()
            }
            return {
              tags: {
                ...state.tags,
                [key]: updatedTag
              }
            }
          }
          return state
        })
        toast.success(`Tag "${name}" edited`)
      }
    }),
    {
      name: 'tag-storage'
    }
  )
)
