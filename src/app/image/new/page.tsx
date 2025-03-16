'use client'

import FieldsetError from '@/app/_components/fieldset-error'
import GroupSelector from '@/components/group-selector'
import TagSelector from '@/components/tag-selector'
import limits from '@/constants/limits'
import paths from '@/constants/paths'
import { useImageStorage } from '@/storage/image'
import { useForm } from '@tanstack/react-form'
import { Ban, Plus } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useTransition } from 'react'

function NewImage() {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const { createImage } = useImageStorage()

  const form = useForm({
    defaultValues: {
      name: '',
      content: '',
      tags: [],
      groups: []
    },
    onSubmit: async ({ value }) => {
      startTransition(() => {
        createImage(value.name, value.content, value.tags, value.groups)
        router.replace(paths.image)
      })
    },
    validators: {
      onSubmit: ({ value }) => {
        if (!!value.name && value.name.length > limits.MAX_NAME_CHARACTERS) {
          return {
            fields: {
              name: `Image name must be ${limits.MAX_NAME_CHARACTERS} characters or fewer`,
              content: !value.content ? 'Image URL is required' : undefined
            }
          }
        }

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
        <form.Field name="groups">{() => <GroupSelector form={form} />}</form.Field>
        <div className="flex gap-2 mt-4 w-full">
          <button disabled={isPending} type="submit" className="btn btn-primary flex-1">
            {isPending ? (
              <>
                <span className="loading loading-dots loading-xs" />
                Loading
              </>
            ) : (
              <>
                <Plus size={20} /> Create
              </>
            )}
          </button>
          <button
            disabled={isPending}
            type="button"
            className="btn btn-error"
            onClick={() => router.back()}
          >
            <Ban size={20} />
            Cancel
          </button>
        </div>
      </form>
    </>
  )
}

export default NewImage
