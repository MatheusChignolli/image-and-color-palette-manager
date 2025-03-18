'use client'

import { useForm } from '@tanstack/react-form'
import { ArrowUpRight, X } from 'lucide-react'
import FieldsetError from '@/app/_components/fieldset-error'
import limits from '@/constants/limits'
import { useTagsStorage } from '@/storage/tags'
import tagsUtils from '@/utils/tags'
import TagListItem from './tag-list-item'

function CreateTagModal() {
  const { tags, createTag } = useTagsStorage()
  const tagsList = Object.values(tags)

  const form = useForm({
    defaultValues: {
      name: ''
    },
    onSubmit: async ({ value }) => {
      createTag(value.name, tagsUtils.getRandomColor())
      resetForm()
    },
    validators: {
      onSubmit: ({ value }) => {
        if (!!value.name && value.name.length > limits.MAX_NAME_CHARACTERS) {
          return {
            fields: {
              name: `Tag name must be ${limits.MAX_NAME_CHARACTERS} characters or fewer`
            }
          }
        }

        return {
          fields: {
            name: !value.name ? 'Tag name is required' : undefined
          }
        }
      }
    }
  })

  const resetForm = () => {
    form.reset()
  }

  return (
    <dialog onClose={resetForm} id="tag-modal" className="modal">
      <div className="modal-box">
        <form method="dialog">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            <X size={20} />
          </button>
        </form>
        <form
          id="tag-form"
          onSubmit={e => {
            e.preventDefault()
            e.stopPropagation()
            form.handleSubmit()
          }}
        >
          <h3 className="font-bold text-lg">Tags</h3>
          <form.Field name="name">
            {field => (
              <fieldset className="fieldset">
                <legend className="fieldset-legend">Tag name</legend>
                <div className="flex gap-2">
                  <input
                    type="text"
                    className="input"
                    placeholder="Summer book"
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onChange={e => field.handleChange(e.target.value)}
                  />
                  <button type="submit" className="btn btn-primary flex-1">
                    Create
                  </button>
                </div>
                {field.state.meta.errors ? (
                  <FieldsetError>{field.state.meta.errors.join(', ')}</FieldsetError>
                ) : null}
              </fieldset>
            )}
          </form.Field>
        </form>
        <div className="divider" />
        <div className="flex flex-col">
          <h4 className="text-md font-bold mb-2">Tags list</h4>
          {!!tagsList.length ? (
            <div className="flex flex-col max-h-[300px] overflow-auto p-4 rounded-md gap-2 bg-base-300">
              {tagsList.map(({ id, name, color }) => {
                return (
                  <TagListItem
                    key={`tags-list-${id}`}
                    id={id}
                    name={name}
                    color={color}
                  />
                )
              })}
            </div>
          ) : (
            <p className="mt-2 flex gap-1 items-center">
              You don`t have tags, start creating one!
              <ArrowUpRight size={20} />
            </p>
          )}
        </div>
      </div>
    </dialog>
  )
}

export default CreateTagModal
