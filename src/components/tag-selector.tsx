'use client'

import { Settings } from 'lucide-react'

import defaultValues from '@/constants/defaults'
import limits from '@/constants/limits'
import { useTagsStorage } from '@/storage/tags'

interface Props {
  form: any
}

function TagSelector({ form }: Props) {
  const { tags, getTag } = useTagsStorage()
  const formTags = form.state.values.tags
  const tagsList = Object.values(tags).filter(tag => !formTags.includes(tag.id))

  const handleTagChange = (e: any) => {
    const id = (e.target as HTMLInputElement).value.trim()

    if (!formTags.some((tag: string) => tag === id)) {
      if (formTags.length >= limits.MAX_TAGS) {
        return
      }

      const updatedTags = [...formTags, id]

      form.setFieldValue('tags', updatedTags)
    }
    ;(e.target as HTMLInputElement).value = ''
  }

  const handleRemoveTag = (id: string) => {
    const updatedTags = form.state.values.tags.filter((tag: string) => tag !== id)
    form.setFieldValue('tags', updatedTags)
  }

  return (
    <fieldset className="fieldset">
      <legend className="fieldset-legend">Custom Tags</legend>
      <div className="flex gap-2">
        <select
          defaultValue="Select a tag"
          className="select"
          disabled={!tagsList.length || formTags.length >= limits.MAX_TAGS}
          onChange={handleTagChange}
        >
          <option>Select a tag</option>
          {tagsList.map(({ id, name }) => {
            return (
              <option key={id} value={id}>
                {name}
              </option>
            )
          })}
        </select>
        <button
          type="button"
          className="btn"
          onClick={() =>
            (document.getElementById('tag-modal') as HTMLDialogElement)?.showModal()
          }
        >
          <Settings size={20} />
          Manage tags
        </button>
      </div>
      <p className="fieldset-label">You can add {limits.MAX_TAGS} tags</p>
      {form.state.values.tags.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-2">
          {form.state.values.tags.map((id: string, index: number) => {
            const tag = getTag(id)

            if (!tag) {
              return null
            }

            const tagColor = tag?.color || defaultValues.DEFAULT_TAG_COLOR

            return (
              <span key={`${tag.name}-${index}`} className={`badge badge-sm ${tagColor}`}>
                {tag.name}
                <button
                  type="button"
                  className="ml-1 cursor-pointer"
                  onClick={() => handleRemoveTag(tag.id)}
                >
                  ✕
                </button>
              </span>
            )
          })}
        </div>
      )}
    </fieldset>
  )
}

export default TagSelector
