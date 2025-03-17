'use client'

import limits from '@/constants/limits'
import { useGroupsStorage } from '@/storage/groups'
import { Settings } from 'lucide-react'

interface Props {
  form: any
}

function GroupSelector({ form }: Props) {
  const { groups, getGroup } = useGroupsStorage()
  const formGroups = form.state.values.groups
  const groupsList = Object.values(groups).filter(group => !formGroups.includes(group.id))

  const handleGroupChange = (e: any) => {
    const id = (e.target as HTMLInputElement).value.trim()

    if (!formGroups.some((group: string) => group === id)) {
      if (formGroups.length >= limits.MAX_GROUPS) {
        return
      }

      const updatedGroups = [...formGroups, id]

      form.setFieldValue('groups', updatedGroups)
    }
    ;(e.target as HTMLInputElement).value = ''
  }

  const handleRemoveGroup = (id: string) => {
    const updatedGroups = form.state.values.groups.filter((group: string) => group !== id)
    form.setFieldValue('groups', updatedGroups)
  }

  return (
    <fieldset className="fieldset">
      <legend className="fieldset-legend">Custom Groups</legend>
      <div className="flex gap-2">
        <select
          defaultValue="Select a group"
          className="select"
          disabled={!groupsList.length || formGroups.length >= limits.MAX_GROUPS}
          onChange={handleGroupChange}
        >
          <option>Select a group</option>
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
      <p className="fieldset-label">You can add {limits.MAX_GROUPS} groups</p>
      {form.state.values.groups.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-2">
          {form.state.values.groups.map((id: string, index: number) => {
            const group = getGroup(id)

            if (!group) {
              return null
            }

            return (
              <span
                key={`${group.name}-${index}`}
                className="badge badge-outline badge-sm"
              >
                {group.name}
                <button
                  type="button"
                  className="ml-1 cursor-pointer"
                  onClick={() => handleRemoveGroup(group.id)}
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
