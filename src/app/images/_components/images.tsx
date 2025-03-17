'use client'

import ImageWithFallback from '@/components/image-with-fallback'
import defaultValues from '@/constants/defaults'
import { useGroupsStorage } from '@/storage/groups'
import { useImagesStorage } from '@/storage/images'
import { useTagsStorage } from '@/storage/tags'
import { Clipboard } from 'lucide-react'
import toast from 'react-hot-toast'

function Images() {
  const { images } = useImagesStorage()
  const { getGroup } = useGroupsStorage()
  const { getTag } = useTagsStorage()
  const imagesList = Object.values(images)

  const copyUrlToClipboard = (url: string) => {
    window.navigator.clipboard.writeText(url)
    toast.success('Image URL copied')
  }

  return (
    <div className="grid grid-cols-3 gap-4">
      {imagesList.map(({ id, name, content, updatedAt, tags, groups }) => (
        <div key={id} className="card bg-base-200 w-full shadow-md relative">
          <div
            className="tooltip tooltip-primary absolute top-2 right-2"
            data-tip="Copy image URL"
          >
            <button
              onClick={() => copyUrlToClipboard(content)}
              className="btn btn-square btn-primary"
            >
              <Clipboard size={20} />
            </button>
          </div>
          <figure className="bg-gray-900">
            <ImageWithFallback isBackground src={content} alt={`Image: ${name}`} />
          </figure>
          <div className="card-body">
            <h2 className="card-title inline-flex flex-wrap">
              {name}
              {tags.map((tagId, index: number) => {
                const tag = getTag(tagId)
                const tagColor = tag.color || defaultValues.DEFAULT_TAG_COLOR

                return (
                  <span
                    key={`${tag.name}-${index}`}
                    className={`badge badge-sm ${tagColor}`}
                  >
                    {tag.name}
                  </span>
                )
              })}
            </h2>
            <span className="text-xs">
              Last update: {Intl.DateTimeFormat('pt-BR').format(new Date(updatedAt))}
            </span>
            <p></p>
            <div className="card-actions">
              <div className="mt-2 flex flex-wrap gap-2">
                {groups.map(groupId => (
                  <span key={groupId} className="badge badge-outline badge-md">
                    {getGroup(groupId)?.name}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Images
