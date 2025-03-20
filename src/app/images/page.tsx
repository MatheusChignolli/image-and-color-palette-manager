import Filters from '@/components/filters'
import Images from './_components/images'
import { Entity } from '@/types/entities'

export const metadata = {
  title: 'Image Organizer - Smart Image Management',
  description:
    'Effortlessly organize, tag, and search your images with our AI-powered Image Manager. Keep your visuals structured and accessible in just a few clicks.'
}

function ImageModule() {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-4xl font-semibold">Images</h1>
      <Filters entity={Entity.IMAGE} />
      <Images />
    </div>
  )
}

export default ImageModule
