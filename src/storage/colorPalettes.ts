import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { v4 } from 'uuid'
import toast from 'react-hot-toast'
import { Comment } from '@/types/comments'

interface Color {
  id: string
  name: string
  hex: string
}

interface ColorPalette {
  id: string
  createdAt: string
  updatedAt: string
  name: string
  colors: Color[]
  tags: string[]
  groups: string[]
  comments: Comment[]
}

interface ColorPaletteStore {
  palettes: Record<string, ColorPalette>
  getPalette: (key: string) => ColorPalette | undefined
  deletePalette: (key: string) => void
  createPalette: (
    name: string,
    colors?: Color[],
    tags?: string[],
    groups?: string[]
  ) => void
  editPalette: (
    key: string,
    name: string,
    colors?: Color[],
    tags?: string[],
    groups?: string[]
  ) => void
  addColor: (paletteId: string, name: string, hex: string) => void
  deleteColor: (paletteId: string, colorId: string) => void
  addComment: (paletteId: string, content: string) => void
  deleteComment: (paletteId: string, commentId: string) => void
  removeGroupFromPalettes: (groupId: string) => void
  removeTagFromPalettes: (tag: string) => void
}

export const useColorPalettesStorage = create<ColorPaletteStore>()(
  persist(
    (set, get) => ({
      palettes: {},
      getPalette: key => get().palettes[key],
      deletePalette: key => {
        set(state => {
          const palettes = { ...state.palettes }
          delete palettes[key]
          return { palettes }
        })
        toast(`Palette deleted`)
      },
      createPalette: (name, colors = [], tags = [], groups = []) => {
        const id = v4()
        const timestamp = new Date().toISOString()

        const newPalette: ColorPalette = {
          id,
          createdAt: timestamp,
          updatedAt: timestamp,
          name,
          colors,
          tags,
          groups,
          comments: []
        }

        set(state => ({
          palettes: {
            ...state.palettes,
            [id]: newPalette
          }
        }))
        toast.success(`Palette "${name}" created`)
      },
      editPalette: (key, name, colors, tags, groups) => {
        set(state => {
          const palette = state.palettes[key]
          if (palette) {
            const updatedPalette = {
              ...palette,
              name,
              updatedAt: new Date().toISOString(),
              ...(colors !== undefined && { colors }),
              ...(tags !== undefined && { tags }),
              ...(groups !== undefined && { groups })
            }
            return {
              palettes: {
                ...state.palettes,
                [key]: updatedPalette
              }
            }
          }
          return state
        })
        toast.success(`Palette "${name}" edited`)
      },
      addColor: (paletteId, name, hex) => {
        set(state => {
          const palette = state.palettes[paletteId]
          if (palette) {
            const newColor: Color = {
              id: v4(),
              name,
              hex
            }
            return {
              palettes: {
                ...state.palettes,
                [paletteId]: {
                  ...palette,
                  colors: [...palette.colors, newColor],
                  updatedAt: new Date().toISOString()
                }
              }
            }
          }
          return state
        })
        toast.success(`Color "${name}" added`)
      },
      deleteColor: (paletteId, colorId) => {
        set(state => {
          const palette = state.palettes[paletteId]
          if (palette) {
            return {
              palettes: {
                ...state.palettes,
                [paletteId]: {
                  ...palette,
                  colors: palette.colors.filter(color => color.id !== colorId),
                  updatedAt: new Date().toISOString()
                }
              }
            }
          }
          return state
        })
        toast(`Color deleted`)
      },
      addComment: (paletteId, content) => {
        set(state => {
          const palette = state.palettes[paletteId]
          if (palette) {
            const newComment: Comment = {
              id: v4(),
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
              content
            }
            return {
              palettes: {
                ...state.palettes,
                [paletteId]: {
                  ...palette,
                  comments: [...palette.comments, newComment],
                  updatedAt: new Date().toISOString()
                }
              }
            }
          }
          return state
        })
        toast.success(`Comment added`)
      },
      deleteComment: (paletteId, commentId) => {
        set(state => {
          const palette = state.palettes[paletteId]
          if (palette) {
            return {
              palettes: {
                ...state.palettes,
                [paletteId]: {
                  ...palette,
                  comments: palette.comments.filter(comment => comment.id !== commentId),
                  updatedAt: new Date().toISOString()
                }
              }
            }
          }
          return state
        })
        toast(`Comment deleted`)
      },
      removeGroupFromPalettes: (groupId: string) => {
        set(state => {
          const updatedPalettes = Object.keys(state.palettes).reduce(
            (acc, key) => {
              const palette = state.palettes[key]
              acc[key] = {
                ...palette,
                groups: palette.groups.filter(g => g !== groupId),
                updatedAt: new Date().toISOString()
              }
              return acc
            },
            {} as Record<string, ColorPalette>
          )
          return { palettes: updatedPalettes }
        })
        toast.success(`Group removed from palettes`)
      },
      removeTagFromPalettes: (tag: string) => {
        set(state => {
          const updatedPalettes = Object.keys(state.palettes).reduce(
            (acc, key) => {
              const palette = state.palettes[key]
              acc[key] = {
                ...palette,
                tags: palette.tags.filter(t => t !== tag),
                updatedAt: new Date().toISOString()
              }
              return acc
            },
            {} as Record<string, ColorPalette>
          )
          return { palettes: updatedPalettes }
        })
        toast.success(`Tag removed from palettes`)
      }
    }),
    {
      name: 'color-palettes-storage'
    }
  )
)
