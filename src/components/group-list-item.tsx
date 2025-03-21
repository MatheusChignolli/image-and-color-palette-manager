'use client'

import { useState } from 'react'
import { useForm } from '@tanstack/react-form'
import { Ban, Pencil, Save, Trash2 } from 'lucide-react'

import { useGroupsStorage } from '@/storage/groups'
import FieldsetError from '@/app/_components/fieldset-error'
import limits from '@/constants/limits'
import { useImagesStorage } from '@/storage/images'
import { useColorPalettesStorage } from '@/storage/color-palettes'

const deleteGroupModalId = 'delete-group-modal'

interface Props {
  id: string
  name: string
}

function GroupListItem({ id, name }: Props) {
  const [isEditing, setIsEditing] = useState(false)
  const { deleteGroup, editGroup } = useGroupsStorage()
  const { removeGroupFromImages } = useImagesStorage()
  const { removeGroupFromPalettes } = useColorPalettesStorage()

  const handleDeleteGroup = () => {
    deleteGroup(id)
    removeGroupFromImages(id)
    removeGroupFromPalettes(id)
    ;(document.getElementById(deleteGroupModalId) as HTMLDialogElement)?.close()
  }

  const form = useForm({
    defaultValues: {
      name
    },
    onSubmit: async ({ value }) => {
      editGroup(id, value.name)
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
            name: !value.name ? 'Group name is required' : undefined
          }
        }
      }
    }
  })

  if (isEditing) {
    return (
      <form
        id={`edit-group-form-${id}`}
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
    <div key={`groups-list-${id}`} className="flex items-center">
      <div className="text-sm font-semibold flex-1">{name}</div>
      <button
        className="btn btn-sm btn-square btn-error"
        onClick={() =>
          (document.getElementById(deleteGroupModalId) as HTMLDialogElement)?.showModal()
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
      <dialog id={deleteGroupModalId} className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Confirm Group Deletion</h3>
          <p className="py-4">
            Are you sure you want to delete this group? This action is irreversible, and
            all associated data will be unsynced.
          </p>
          <div className="modal-action">
            <button
              className="btn"
              onClick={() =>
                (
                  document.getElementById(deleteGroupModalId) as HTMLDialogElement
                )?.close()
              }
            >
              Cancel
            </button>
            <button className="btn btn-error" onClick={handleDeleteGroup}>
              Confirm
            </button>
          </div>
        </div>
      </dialog>
    </div>
  )
}

export default GroupListItem
