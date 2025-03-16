import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { v4 } from 'uuid'
import toast from 'react-hot-toast'

interface GroupEntity {
  id: string
  createdAt: string
  updatedAt: string
  name: string
}

interface GroupStore {
  groups: Record<string, GroupEntity>
  getGroup: (key: string) => GroupEntity | undefined
  deleteGroup: (key: string) => void
  createGroup: (name: string) => void
  editGroup: (key: string, name: string) => void
}

export const useGroupStorage = create<GroupStore>()(
  persist(
    (set, get) => ({
      groups: {},
      getGroup: key => get().groups[key],
      deleteGroup: key => {
        set(state => {
          const groups = state.groups
          delete groups[key]
          return { groups }
        })
        toast(`Group deleted`)
      },
      createGroup: (name: string) => {
        const id = v4()
        const timestamp = new Date().toISOString()

        const newGroup: GroupEntity = {
          id,
          createdAt: timestamp,
          updatedAt: timestamp,
          name
        }

        set(state => ({
          groups: {
            ...state.groups,
            [id]: newGroup
          }
        }))
        toast.success(`Group "${name}" created`)
      },
      editGroup: (key: string, name: string) => {
        set(state => {
          const group = state.groups[key]
          if (group) {
            const updatedGroup = {
              ...group,
              name,
              updatedAt: new Date().toISOString()
            }
            return {
              groups: {
                ...state.groups,
                [key]: updatedGroup
              }
            }
          }
          return state
        })
        toast.success(`Group "${name}" edited`)
      }
    }),
    {
      name: 'group-storage'
    }
  )
)
