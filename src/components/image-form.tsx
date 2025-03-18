'use client'

import { useTransition } from 'react'
import { Ban, Plus, Save } from 'lucide-react'
import FieldsetError from '@/app/_components/fieldset-error'
import GroupSelector from '@/components/group-selector'
import ImageInspectorModal from '@/components/image-inspector-modal'
import TagSelector from '@/components/tag-selector'
import limits from '@/constants/limits'
import paths from '@/constants/paths'
import { useImagesStorage } from '@/storage/images'
import { useForm } from '@tanstack/react-form'
import { useRouter } from 'next/navigation'

interface Props {
  id?: string
}

function ImageForm({ id }: Props) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const { createImage, getImage, editImage } = useImagesStorage()

  const currentImage = id ? getImage(id) : undefined
  const isEdit = !!currentImage

  const form = useForm({
    defaultValues: {
      name: currentImage?.name || '',
      content: currentImage?.content || '',
      tags: currentImage?.tags || [],
      groups: currentImage?.groups || []
    },
    onSubmit: async ({ value }) => {
      startTransition(() => {
        if (isEdit) {
          editImage(currentImage.id, value.name, value.content, value.tags, value.groups)
        } else {
          createImage(value.name, value.content, value.tags, value.groups)
        }

        router.replace(paths.images)
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
    <form
      className="flex flex-col relative"
      onSubmit={e => {
        e.preventDefault()
        e.stopPropagation()
        form.handleSubmit()
      }}
    >
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
          <fieldset className="fieldset relative">
            <legend className="fieldset-legend">Insert your image URL below</legend>
            <div className="flex gap-2">
              <input
                type="text"
                className="input"
                placeholder="https://your-image-url.com"
                id={field.name}
                name={field.name}
                value={field.state.value}
                onChange={e => field.handleChange(e.target.value)}
              />
              <ImageInspectorModal src={field.state.value} />
            </div>
            {field.state.meta.errors ? (
              <FieldsetError>{field.state.meta.errors.join(', ')}</FieldsetError>
            ) : null}
          </fieldset>
        )}
      </form.Field>
      <form.Field name="tags">{() => <TagSelector form={form} />}</form.Field>
      <form.Field name="groups">{() => <GroupSelector form={form} />}</form.Field>
      <div className="flex gap-2 mt-4 w-full">
        <button disabled={isPending} type="submit" className="btn btn-primary flex-1">
          {isPending ? (
            <>
              <span className="loading loading-dots loading-xs" />
              Loading
            </>
          ) : isEdit ? (
            <>
              <Save size={20} /> Edit
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
  )
}

export default ImageForm
