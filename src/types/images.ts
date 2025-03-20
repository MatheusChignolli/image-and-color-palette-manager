import { Comment } from './comments'

export interface Image {
  id: string
  createdAt: string
  updatedAt: string
  name: string
  tags: string[]
  groups: string[]
  content: string
  comments: Comment[]
}
