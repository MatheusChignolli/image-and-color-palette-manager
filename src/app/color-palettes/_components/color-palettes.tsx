'use client'

import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

import ImageWithFallback from '@/components/image-with-fallback'
import { Entity } from '@/types/entities'
import EntityCard from '@/components/list-card'
import { useColorPalettesStorage } from '@/storage/color-palettes'

function ColorPalettes() {
  const searchParams = useSearchParams()
  const { palettes } = useColorPalettesStorage()
  const [isFetching, setIsFetching] = useState(true)

  const query = searchParams.get('query')
  const group = searchParams.get('group')
  const tag = searchParams.get('tag')

  const imagesList = Object.values(palettes).filter(palette => {
    const matchesQuery = query
      ? palette.name.toLowerCase().includes(query.toLowerCase())
      : true
    const matchesGroup = group ? palette.groups?.includes(group) : true
    const matchesTag = tag ? palette.tags?.includes(tag) : true

    return matchesQuery && matchesGroup && matchesTag
  })

  useEffect(() => {
    if (Object.keys(palettes).length >= 0) {
      setIsFetching(false)
    }
  }, [palettes])

  if (isFetching) {
    return (
      <p className="text-2xl flex justify-center p-10 align-center">
        Loading
        <span className="loading loading-dots loading-lg mt-2" />
      </p>
    )
  }

  if (!imagesList.length) {
    return <p className="text-2xl flex justify-center p-10">No color palettes found</p>
  }

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {imagesList.map(({ id, name, updatedAt, tags, groups, colors }) => {
        const colorsContent = colors.reduce<Record<string, string>>((acc, color) => {
          acc[color.name] = color.hex
          return acc
        }, {})

        return (
          <EntityCard
            key={id}
            copyAndShareContent={JSON.stringify(colorsContent)}
            entity={Entity.COLOR_PALETTE}
            groups={groups}
            id={id}
            name={name}
            tags={tags}
            updatedAt={updatedAt}
          >
            <div className="flex flex-wrap h-[200px]">
              {colors.map(color => (
                <div
                  key={`color-card-${color.id}`}
                  className="h-full flex-1"
                  style={{
                    backgroundColor: color.hex
                  }}
                />
              ))}
            </div>
          </EntityCard>
        )
      })}
    </div>
  )
}

export default ColorPalettes
