import { create } from 'zustand'
import { persist } from 'zustand/middleware'

// Define the Group entity structure
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
      deleteGroup: key =>
        set(state => {
          const { [key]: _, ...rest } = state.groups
          return { groups: rest }
        }),
      createGroup: (name: string) => {
        // TODO: add a uuidv4
        const id = Math.random().toString(36).substr(2, 9)
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
      },
      editGroup: (key: string, name: string) =>
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
    }),
    {
      name: 'group-storage'
    }
  )
)
