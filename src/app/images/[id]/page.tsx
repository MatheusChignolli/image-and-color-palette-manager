import ImageForm from '@/components/image-form'
import CommentsModal from '@/components/comments-modal'
import DangerZone from '../_components/danger-zone'
import { Entity } from '@/types/entities'

interface Props {
  params: Promise<{ id: string }>
}

async function ImagePage({ params }: Props) {
  const id = (await params).id

  return (
    <div className="max-w-xl mx-auto">
      <div className="flex gap-2">
        <h1 className="text-3xl font-bold">Edit image</h1>
        <CommentsModal entity={Entity.IMAGE} id={id} />
      </div>
      <ImageForm id={id} />
      <DangerZone id={id} />
    </div>
  )
}

export default ImagePage
