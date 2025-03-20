'use client'

import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

import ImageWithFallback from '@/components/image-with-fallback'
import { useImagesStorage } from '@/storage/images'
import { Entity } from '@/types/entities'
import EntityCard from '@/components/list-card'

function Images() {
  const searchParams = useSearchParams()
  const { images } = useImagesStorage()
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
        <EntityCard
          key={id}
          copyAndShareContent={content}
          entity={Entity.IMAGE}
          groups={groups}
          id={id}
          name={name}
          tags={tags}
          updatedAt={updatedAt}
        >
          <figure className="bg-gray-900">
            <ImageWithFallback isBackground src={content} alt={`Image: ${name}`} />
          </figure>
        </EntityCard>
      ))}
    </div>
  )
}

export default Images
