'use client'

import { useTransition } from 'react'
import { useForm } from '@tanstack/react-form'
import { Plus, Search } from 'lucide-react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'

import { useTagsStorage } from '@/storage/tags'
import { useGroupsStorage } from '@/storage/groups'
import paths from '@/constants/paths'
import { Entity } from '@/types/entities'

interface Props {
  entity: Entity
}

function Filters({ entity }: Props) {
  const searchParams = useSearchParams()
  const [isPending, startTransition] = useTransition()
  const router = useRouter()
  const { tags } = useTagsStorage()
  const { groups } = useGroupsStorage()
  const tagsList = Object.values(tags)
  const groupsList = Object.values(groups)
  const query = searchParams.get('query')
  const tag = searchParams.get('tag')
  const group = searchParams.get('group')

  const addEntityMapper = {
    [Entity.IMAGE]: {
      text: 'Add image',
      path: paths.imageNew
    },
    [Entity.COLOR_PALETTE]: {
      text: 'Add color palette',
      path: paths.colorPaletteNew
    }
  }

  const { text, path } = addEntityMapper[entity]

  const createQueryString = (values: { name: string; value: string }[]) => {
    if (!values.length) {
      return ''
    }

    const params = new URLSearchParams()
    values.forEach(({ name, value }) => {
      params.set(name, value)
    })

    return params.toString()
  }

  const form = useForm({
    defaultValues: {
      query: query || '',
      tag: tag || '',
      group: group || ''
    },
    onSubmit: async ({ value }) => {
      startTransition(() => {
        const params = Object.entries(value)
          .map(([key, item]: [string, string]) => ({
            name: key,
            value: item
          }))
          .filter(({ value }) => !!value)

        router.push('?' + createQueryString(params))
      })
    }
  })

  return (
    <form
      className="flex gap-2"
      onSubmit={e => {
        e.preventDefault()
        e.stopPropagation()
        form.handleSubmit()
      }}
    >
      <form.Field name="query">
        {field => (
          <label className="input flex-1">
            <span className="label">Name, comment or tag</span>
            <input
              type="text"
              placeholder="Book of Summer"
              id={field.name}
              name={field.name}
              value={field.state.value}
              onChange={e => field.handleChange(e.target.value)}
            />
          </label>
        )}
      </form.Field>
      <form.Field name="group">
        {field => (
          <label className="select">
            <span className="label">Group</span>
            <select
              disabled={!groupsList.length}
              id={field.name}
              name={field.name}
              value={field.state.value}
              onChange={e => field.handleChange(e.target.value)}
            >
              <option value="">Select group</option>
              {groupsList.map(({ id, name }) => {
                return (
                  <option key={`group-filter-item-${id}`} value={id}>
                    {name}
                  </option>
                )
              })}
            </select>
          </label>
        )}
      </form.Field>
      <form.Field name="tag">
        {field => (
          <label className="select">
            <span className="label">Tag</span>
            <select
              disabled={!tagsList.length}
              id={field.name}
              name={field.name}
              value={field.state.value}
              onChange={e => field.handleChange(e.target.value)}
            >
              <option value="">Select tag</option>
              {tagsList.map(({ id, name }) => {
                return (
                  <option key={`group-filter-item-${id}`} value={id}>
                    {name}
                  </option>
                )
              })}
            </select>
          </label>
        )}
      </form.Field>
      <button disabled={isPending} type="submit" className="btn btn-secondary btn-md">
        {isPending ? (
          <>
            <span className="loading loading-dots loading-xs" />
            Loading
          </>
        ) : (
          <>
            <Search size={20} /> Search
          </>
        )}
      </button>
      <Link href={path}>
        <button type="button" className="btn btn-primary btn-md">
          <Plus size={20} />
          {text}
        </button>
      </Link>
    </form>
  )
}

export default Filters
