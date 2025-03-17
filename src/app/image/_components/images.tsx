'use client'

import ImageWithFallback from '@/components/image-with-fallback'
import { useGroupStorage } from '@/storage/group'
import { useImageStorage } from '@/storage/image'

function Images() {
  const { images } = useImageStorage()
  const { getGroup } = useGroupStorage()
  const imagesList = Object.values(images)

  return (
    <div className="grid grid-cols-3 gap-4">
      {imagesList.map(({ id, name, content, updatedAt, tags, groups }) => (
        <div key={id} className="card bg-base-200 w-full shadow-md">
          <figure className="bg-gray-900">
            <ImageWithFallback isBackground src={content} alt={`Image: ${name}`} />
          </figure>
          <div className="card-body">
            <h2 className="card-title inline-flex flex-wrap">
              {name}
              {tags.map((tag, index: number) => (
                <span
                  key={`${tag.name}-${index}`}
                  className={`badge badge-sm ${tag.color}`}
                >
                  {tag.name}
                </span>
              ))}
            </h2>
            <span className="text-xs">
              Last update: {Intl.DateTimeFormat('pt-BR').format(new Date(updatedAt))}
            </span>
            <p></p>
            <div className="card-actions">
              <div className="mt-2 flex flex-wrap gap-2">
                {groups.map(group => (
                  <span key={group} className="badge badge-outline badge-md">
                    {getGroup(group)?.name}
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
