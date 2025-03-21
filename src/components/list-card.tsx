'use client'

import { Clipboard, Share } from 'lucide-react'
import Link from 'next/link'
import { PropsWithChildren } from 'react'

import { useGroupsStorage } from '@/storage/groups'
import shareUtils from '@/utils/share'
import { Entity } from '@/types/entities'
import { useTagsStorage } from '@/storage/tags'
import defaultValues from '@/constants/defaults'
import paths from '@/constants/paths'

import CommentsModal from './comments-modal'

interface Props {
  id: string
  name: string
  updatedAt: string
  groups: string[]
  tags: string[]
  copyAndShareContent: string
  entity: Entity
}

function EntityCard({
  id,
  name,
  updatedAt,
  groups,
  tags,
  copyAndShareContent,
  entity,
  children
}: PropsWithChildren<Props>) {
  const { getGroup } = useGroupsStorage()
  const { getTag } = useTagsStorage()

  const { href, shareTooltipText, copyTooltipText } = {
    [Entity.IMAGE]: {
      href: paths.image(id),
      shareTooltipText: 'Share image URL',
      copyTooltipText: 'Copy image URL'
    },
    [Entity.COLOR_PALETTE]: {
      href: paths.colorPalette(id),
      shareTooltipText: 'Share color palette',
      copyTooltipText: 'Copy color palette'
    }
  }[entity]

  return (
    <div className="relative">
      <div className="absolute top-2 left-2 z-10">
        <CommentsModal entity={entity} id={id} />
      </div>
      <div className="absolute top-2 right-2 z-10 flex gap-2">
        <button
          onClick={() => shareUtils.shareUrl(copyAndShareContent)}
          className="btn btn-square btn-primary tooltip"
          data-tip={shareTooltipText}
        >
          <Share size={20} />
        </button>
        <button
          onClick={() => shareUtils.copyToClipboard(copyAndShareContent)}
          className="btn btn-square btn-primary tooltip"
          data-tip={copyTooltipText}
        >
          <Clipboard size={20} />
        </button>
      </div>
      <Link href={href}>
        <div className="card bg-base-200 w-full shadow-md relative h-full">
          {children}
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
  )
}

export default EntityCard
