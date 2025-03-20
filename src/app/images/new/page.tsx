import ImageForm from '@/components/image-form'

export const metadata = {
  title: 'Create a New Image - Image Manager',
  description:
    'Easily create and manage your images with our smart Image Manager. Organize your visuals and keep them accessible in just a few clicks.'
}

function NewImage() {
  return (
    <div className="max-w-xl mx-auto">
      <h1 className="text-3xl font-bold">New image</h1>
      <ImageForm />
    </div>
  )
}

export default NewImage
