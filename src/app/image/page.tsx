import Images from './_components/images'

export const metadata = {
  title: 'Image Organizer - Smart Image Management',
  description:
    'Effortlessly organize, tag, and search your images with our AI-powered Image Manager. Keep your visuals structured and accessible in just a few clicks.'
}

function ImageModule() {
  return (
    <div className="flex flex-col gap-4">
      <Images />
    </div>
  )
}

export default ImageModule
