'use client'

import FieldsetError from '@/app/_components/fieldset-error'
import GroupSelector from '@/components/group-selector'
import TagSelector from '@/components/tag-selector'
import { useForm } from '@tanstack/react-form'
import { Ban, Plus } from 'lucide-react'
import { useRouter } from 'next/navigation'

function NewImage() {
  const router = useRouter()
  const form = useForm({
    defaultValues: {
      name: '',
      content: '',
      tags: [],
      groups: []
    },
    onSubmit: async ({ value }) => {
      console.log(value)
    },
    validators: {
      onSubmit: ({ value }) => {
        return {
          fields: {
            name: !value.name ? 'Image name is required' : undefined,
            content: !value.content ? 'Image URL is required' : undefined
          }
        }
      }
    }
  })

  return (
    <>
      <form
        className="flex flex-col max-w-xl mx-auto relative"
        onSubmit={e => {
          e.preventDefault()
          e.stopPropagation()
          form.handleSubmit()
        }}
      >
        <h1 className="text-3xl font-bold">New image content</h1>
        <form.Field name="name">
          {field => (
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Image name</legend>
              <input
                type="text"
                className="input"
                placeholder="Sunglasses over pink table"
                id={field.name}
                name={field.name}
                value={field.state.value}
                onChange={e => field.handleChange(e.target.value)}
              />
              {field.state.meta.errors ? (
                <FieldsetError>{field.state.meta.errors.join(', ')}</FieldsetError>
              ) : null}
            </fieldset>
          )}
        </form.Field>
        <form.Field name="content">
          {field => (
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Insert your image URL below</legend>
              <input
                type="text"
                className="input"
                placeholder="https://your-image-url.com"
                id={field.name}
                name={field.name}
                value={field.state.value}
                onChange={e => field.handleChange(e.target.value)}
              />
              {field.state.meta.errors ? (
                <FieldsetError>{field.state.meta.errors.join(', ')}</FieldsetError>
              ) : null}
            </fieldset>
          )}
        </form.Field>
        <form.Field name="tags">
          {field => <TagSelector form={form} field={field} />}
        </form.Field>
        <form.Field name="groups">
          {field => <GroupSelector form={form} field={field} />}
        </form.Field>
        <div className="flex gap-2 mt-4 w-full">
          <button type="submit" className="btn btn-primary flex-1">
            <Plus size={20} /> Create
          </button>
          <button type="button" className="btn btn-error" onClick={() => router.back()}>
            <Ban size={20} />
            Cancel
          </button>
        </div>
      </form>
    </>
  )
}

export default NewImage
