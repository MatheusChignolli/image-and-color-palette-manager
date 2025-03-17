import Filters from './_components/filters'
import Images from './_components/images'

export const metadata = {
  title: 'Image Organizer - Smart Image Management',
  description:
    'Effortlessly organize, tag, and search your images with our AI-powered Image Manager. Keep your visuals structured and accessible in just a few clicks.'
}

function ImageModule() {
  return (
    <div className="flex flex-col gap-4">
      <Filters />
      <Images />
    </div>
  )
}

export default ImageModule
