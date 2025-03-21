'use client'

import { useState } from 'react'
import { useForm } from '@tanstack/react-form'
import { Ban, Pencil, Save, Trash2 } from 'lucide-react'

import FieldsetError from '@/app/_components/fieldset-error'
import limits from '@/constants/limits'
import { useTagsStorage } from '@/storage/tags'
import { useImagesStorage } from '@/storage/images'
import { useColorPalettesStorage } from '@/storage/color-palettes'

const deleteTagModalId = 'delete-tag-modal'

interface Props {
  id: string
  name: string
  color: string
}

function TagListItem({ id, name, color }: Props) {
  const [isEditing, setIsEditing] = useState(false)
  const { deleteTag, editTag } = useTagsStorage()
  const { removeTagFromImages } = useImagesStorage()
  const { removeTagFromPalettes } = useColorPalettesStorage()

  const handleDeleteTag = () => {
    deleteTag(id)
    removeTagFromImages(id)
    removeTagFromPalettes(id)
    ;(document.getElementById(deleteTagModalId) as HTMLDialogElement)?.close()
  }

  const form = useForm({
    defaultValues: {
      name
    },
    onSubmit: async ({ value }) => {
      editTag(id, value.name)
      setIsEditing(false)
    },
    validators: {
      onSubmit: ({ value }) => {
        if (!!value.name && value.name.length > limits.MAX_NAME_CHARACTERS) {
          return {
            fields: {
              name: `Max ${limits.MAX_NAME_CHARACTERS} characters`
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

  if (isEditing) {
    return (
      <form
        id={`edit-tag-form-${id}`}
        onSubmit={e => {
          e.preventDefault()
          e.stopPropagation()
          form.handleSubmit()
        }}
        className="flex items-center gap-2"
      >
        <form.Field name="name">
          {field => (
            <>
              <input
                autoFocus
                type="text"
                className="input text-sm font-semibold flex-1"
                placeholder="Summer book"
                id={field.name}
                name={field.name}
                value={field.state.value}
                onChange={e => field.handleChange(e.target.value)}
              />
              {field.state.meta.errors ? (
                <FieldsetError>{field.state.meta.errors.join(', ')}</FieldsetError>
              ) : null}
            </>
          )}
        </form.Field>
        <button
          type="button"
          className="btn btn-sm btn-square btn-error"
          onClick={() => setIsEditing(false)}
        >
          <Ban size={20} />
        </button>
        <button type="submit" className="btn btn-sm btn-square btn-primary">
          <Save size={20} />
        </button>
      </form>
    )
  }

  return (
    <div key={`tags-list-${id}`} className="flex items-center">
      <span className={`badge badge-sm ${color} mr-2`} />
      <div className="text-sm font-semibold flex-1">{name}</div>
      <button
        className="btn btn-sm btn-square btn-error"
        onClick={() =>
          (document.getElementById(deleteTagModalId) as HTMLDialogElement)?.showModal()
        }
      >
        <Trash2 size={20} />
      </button>
      <button
        className="btn btn-sm btn-square btn-primary ml-2"
        onClick={() => setIsEditing(true)}
      >
        <Pencil size={20} />
      </button>
      <dialog id={deleteTagModalId} className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Confirm Tag Deletion</h3>
          <p className="py-4">
            Are you sure you want to delete this tag? This action is irreversible, and all
            associated data will be unsynced.
          </p>
          <div className="modal-action">
            <button
              className="btn"
              onClick={() =>
                (document.getElementById(deleteTagModalId) as HTMLDialogElement)?.close()
              }
            >
              Cancel
            </button>
            <button className="btn btn-error" onClick={handleDeleteTag}>
              Confirm
            </button>
          </div>
        </div>
      </dialog>
    </div>
  )
}

export default TagListItem
