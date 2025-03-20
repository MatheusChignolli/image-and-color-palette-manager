export interface Color {
  id: string
  name: string
  hex: string
}

export interface ColorPalette {
  id: string
  createdAt: string
  updatedAt: string
  name: string
  colors: Color[]
  tags: string[]
  groups: string[]
  comments: Comment[]
}
