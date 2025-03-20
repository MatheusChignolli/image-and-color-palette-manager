'use client'

import { useTransition } from 'react'
import { Ban, Plus, Save } from 'lucide-react'
import { useForm } from '@tanstack/react-form'
import { useRouter } from 'next/navigation'

import FieldsetError from '@/app/_components/fieldset-error'
import GroupSelector from '@/components/group-selector'
import TagSelector from '@/components/tag-selector'
import ColorSelector from '@/components/color-selector'
import limits from '@/constants/limits'
import paths from '@/constants/paths'
import { useColorPalettesStorage } from '@/storage/color-palettes'

interface Props {
  id?: string
}

function ColorPaletteForm({ id }: Props) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const { createPalette, getPalette, editPalette } = useColorPalettesStorage()

  const currentPalette = id ? getPalette(id) : undefined
  const isEdit = !!currentPalette

  const form = useForm({
    defaultValues: {
      name: currentPalette?.name || '',
      colors: currentPalette?.colors || [],
      tags: currentPalette?.tags || [],
      groups: currentPalette?.groups || []
    },
    onSubmit: async ({ value }) => {
      startTransition(() => {
        if (isEdit) {
          editPalette(
            currentPalette.id,
            value.name,
            value.colors,
            value.tags,
            value.groups
          )
        } else {
          createPalette(value.name, value.colors, value.tags, value.groups)
        }

        router.replace(paths.colorPalettes)
      })
    },
    validators: {
      onSubmit: ({ value }) => {
        if (!!value.name && value.name.length > limits.MAX_NAME_CHARACTERS) {
          return {
            fields: {
              name: `Palette name must be ${limits.MAX_NAME_CHARACTERS} characters or fewer`,
              colors:
                value.colors.length === 0 ? 'At least one color is required' : undefined
            }
          }
        }

        return {
          fields: {
            name: !value.name ? 'Palette name is required' : undefined,
            colors:
              value.colors.length === 0 ? 'At least one color is required' : undefined
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
            <legend className="fieldset-legend">Palette name</legend>
            <input
              type="text"
              className="input"
              placeholder="Sunset Hues"
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
      <form.Field name="colors">
        {field => <ColorSelector field={field} form={form} />}
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

export default ColorPaletteForm
