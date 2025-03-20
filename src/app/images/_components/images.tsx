'use client'

import { Clipboard, Share } from 'lucide-react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

import CommentsModal from '@/components/comments-modal'
import ImageWithFallback from '@/components/image-with-fallback'
import defaultValues from '@/constants/defaults'
import paths from '@/constants/paths'
import { useGroupsStorage } from '@/storage/groups'
import { useImagesStorage } from '@/storage/images'
import { useTagsStorage } from '@/storage/tags'
import { Entity } from '@/types/entities'
import shareUtils from '@/utils/share'

function Images() {
  const searchParams = useSearchParams()
  const { images } = useImagesStorage()
  const { getGroup } = useGroupsStorage()
  const { getTag } = useTagsStorage()
  const [isFetching, setIsFetching] = useState(true)

  const query = searchParams.get('query')
  const group = searchParams.get('group')
  const tag = searchParams.get('tag')

  const imagesList = Object.values(images).filter(image => {
    const matchesQuery = query
      ? image.name.toLowerCase().includes(query.toLowerCase())
      : true
    const matchesGroup = group ? image.groups?.includes(group) : true
    const matchesTag = tag ? image.tags?.includes(tag) : true

    return matchesQuery && matchesGroup && matchesTag
  })

  useEffect(() => {
    if (Object.keys(images).length >= 0) {
      setIsFetching(false)
    }
  }, [images])

  if (isFetching) {
    return (
      <p className="text-2xl flex justify-center p-10 align-center">
        Loading
        <span className="loading loading-dots loading-lg mt-2" />
      </p>
    )
  }

  if (!imagesList.length) {
    return <p className="text-2xl flex justify-center p-10">No images found</p>
  }

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {imagesList.map(({ id, name, content, updatedAt, tags, groups }) => (
        <div key={id} className="relative">
          <div className="absolute top-2 left-2 z-10">
            <CommentsModal entity={Entity.IMAGE} id={id} />
          </div>
          <div className="absolute top-2 right-2 z-10 flex gap-2">
            <button
              onClick={() => shareUtils.shareUrl(content)}
              className="btn btn-square btn-primary tooltip"
              data-tip="Share image URL"
            >
              <Share size={20} />
            </button>
            <button
              onClick={() => shareUtils.copyToClipboard(content)}
              className="btn btn-square btn-primary tooltip"
              data-tip="Copy image URL"
            >
              <Clipboard size={20} />
            </button>
          </div>
          <Link href={paths.image(id)} prefetch={false}>
            <div className="card bg-base-200 w-full shadow-md relative h-full">
              <figure className="bg-gray-900">
                <ImageWithFallback isBackground src={content} alt={`Image: ${name}`} />
              </figure>
              <div className="card-body">
                <h2 className="card-title inline-flex flex-wrap">
                  {name}
                  {tags.map((tagId, index: number) => {
                    const tag = getTag(tagId)
                    const tagColor = tag?.color || defaultValues.DEFAULT_TAG_COLOR

                    if (!tag) return null

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
          </Link>
        </div>
      ))}
    </div>
  )
}

export default Images
