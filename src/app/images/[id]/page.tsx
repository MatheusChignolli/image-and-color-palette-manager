import TagForm from '@/components/tag-form'

interface Props {
  params: Promise<{ id: string }>
}

async function ImagePage({ params }: Props) {
  const id = (await params).id

  return (
    <div className="max-w-xl mx-auto">
      <h1 className="text-3xl font-bold">Edit image</h1>
      {/* TODO: Colocar botão para comentários e para deletar */}
      <div className="flex gap-2">Excluir | Comentários</div>
      <TagForm id={id} />
    </div>
  )
}

export default ImagePage
