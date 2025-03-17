'use client'

import { useGroupsStorage } from '@/storage/groups'

function Filters() {
  const { groups } = useGroupsStorage()
  const groupsList = Object.values(groups)

  return (
    <div className="flex gap-2">
      <label className="input">
        <span className="label">Name, comment or tag</span>
        <input type="text" placeholder="Book of Summer" />
      </label>
      <label className="select">
        <span className="label">Group</span>
        <select defaultValue="">
          <option disabled value="">
            Select group
          </option>
          {groupsList.map(({ id, name }) => {
            return (
              <option key={`group-filter-item-${id}`} value={id}>
                {name}
              </option>
            )
          })}
        </select>
      </label>
      <label className="select">
        <span className="label">Tag</span>
        <select defaultValue="">
          <option disabled value="">
            Select tag
          </option>
          {groupsList.map(({ id, name }) => {
            return (
              <option key={`group-filter-item-${id}`} value={id}>
                {name}
              </option>
            )
          })}
        </select>
      </label>
    </div>
  )
}

export default Filters
