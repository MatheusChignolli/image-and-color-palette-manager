'use client'

import limits from '@/constants/limits'

const TAG_COLORS = [
  'badge-primary',
  'badge-secondary',
  'badge-accent',
  'badge-neutral',
  'badge-info',
  'badge-success',
  'badge-warning',
  'badge-error',
  'badge-primary'
]

const getRandomColor = () => TAG_COLORS[Math.floor(Math.random() * TAG_COLORS.length)]

interface Props {
  form: any
  field: any
}

function TagSelector({ form, field }: Props) {
  const handleTagChange = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const tagName = (e.target as HTMLInputElement).value.trim()
    const formTags = form.state.values.tags

    if (e.key === 'Enter' && tagName && !formTags.some(tag => tag.name === tagName)) {
      e.preventDefault()

      if (formTags.length >= limits.MAX_TAGS) {
        return
      }

      const newTag = { name: tagName, color: getRandomColor() }

      const updatedTags = [...formTags, newTag]

      form.setFieldValue('tags', updatedTags)
      ;(e.target as HTMLInputElement).value = ''
    }
  }

  const handleRemoveTag = (tagName: string) => {
    const updatedTags = form.state.values.tags.filter(tag => tag.name !== tagName)
    form.setFieldValue('tags', updatedTags)
  }

  return (
    <fieldset className="fieldset">
      <legend className="fieldset-legend">Custom tags</legend>
      <input
        type="text"
        className="input"
        disabled={form.getFieldValue('tags').length >= limits.MAX_TAGS}
        placeholder="Enter tag and press Enter"
        id={field.name}
        name={field.name}
        onKeyDown={handleTagChange}
      />
      <p className="fieldset-label">You can add {limits.MAX_TAGS} tags</p>
      {form.state.values.tags.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-2">
          {form.state.values.tags.map((tag, index: number) => (
            <span key={`${tag.name}-${index}`} className={`badge badge-sm ${tag.color}`}>
              {tag.name}
              <button
                type="button"
                className="ml-1 cursor-pointer"
                onClick={() => handleRemoveTag(tag.name)}
              >
                ✕
              </button>
            </span>
          ))}
        </div>
      )}
    </fieldset>
  )
}

export default TagSelector
