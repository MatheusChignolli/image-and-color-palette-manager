/* eslint-disable @typescript-eslint/no-unused-vars */
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { v4 } from 'uuid'
import toast from 'react-hot-toast'

import { Group } from '@/types/groups'

interface GroupStore {
  groups: Record<string, Group>
  getGroup: (key: string) => Group | undefined
  deleteGroup: (key: string) => void
  createGroup: (name: string) => void
  editGroup: (key: string, name: string) => void
}

export const useGroupsStorage = create<GroupStore>()(
  persist(
    (set, get) => ({
      groups: {},
      getGroup: key => get().groups[key],
      deleteGroup: key => {
        set(state => {
          const { [key]: _, ...updatedGroups } = state.groups
          return { groups: updatedGroups }
        })
        toast(`Group deleted`)
      },
      createGroup: (name: string) => {
        const id = v4()
        const timestamp = new Date().toISOString()

        const newGroup: Group = {
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
