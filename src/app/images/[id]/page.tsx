import ImageForm from '@/components/image-form'
import DangerZone from '../_components/danger-zone'

interface Props {
  params: Promise<{ id: string }>
}

async function ImagePage({ params }: Props) {
  const id = (await params).id

  return (
    <div className="max-w-xl mx-auto">
      <h1 className="text-3xl font-bold">Edit image</h1>
      <ImageForm id={id} />
      <DangerZone id={id} />
    </div>
  )
}

export default ImagePage
