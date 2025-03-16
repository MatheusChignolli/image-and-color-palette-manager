'use client'

import { useGroupStorage } from '@/storage/group'
import { Settings } from 'lucide-react'

interface Props {
  form: any
  field: any
}

function GroupSelector({ form, field }: Props) {
  const { groups, getGroup } = useGroupStorage()
  const groupsList = Object.values(groups)

  const handleGroupChange = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const id = (e.target as HTMLInputElement).value.trim()
    const formGroups = form.state.values.groups

    if (e.key === 'Enter' && id && !formGroups.some((group: string) => group === id)) {
      e.preventDefault()

      if (formGroups.length >= 5) {
        return
      }

      const updatedGroups = [...formGroups, id]

      form.setFieldValue('groups', updatedGroups, { dontUpdateMeta: true })
      ;(e.target as HTMLInputElement).value = ''
    }
  }

  const handleRemoveGroup = (id: string) => {
    const updatedGroups = form.state.values.groups.filter((group: string) => group !== id)
    form.setFieldValue('groups', updatedGroups)
  }

  return (
    <fieldset className="fieldset">
      <legend className="fieldset-legend">Custom Groups</legend>
      {/* <input
        type="text"
        className="input"
        disabled={form.getFieldValue('groups').length >= 5}
        placeholder="Enter group name and press Enter"
        id={field.name}
        name={field.name}
        onKeyDown={handleGroupChange}
      /> */}
      <div className="flex gap-2">
        <select
          defaultValue="Select a group"
          className="select"
          disabled={!groupsList.length}
        >
          <option disabled={true}>Select a group</option>
          {groupsList.map(({ id, name }) => {
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
            (document.getElementById('group-modal') as HTMLDialogElement)?.showModal()
          }
        >
          <Settings size={20} />
          Manage groups
        </button>
      </div>
      <p className="fieldset-label">You can add 5 groups</p>
      {form.state.values.groups.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-2">
          {form.state.values.groups.map((id: string, index: number) => {
            const group = getGroup(id)

            if (!group) {
              return null
            }

            return (
              <span key={`${group.name}-${index}`} className="badge badge-sm">
                {group.name}
                <button
                  type="button"
                  className="ml-1 cursor-pointer"
                  onClick={() => handleRemoveGroup(group.name)}
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

export default GroupSelector
