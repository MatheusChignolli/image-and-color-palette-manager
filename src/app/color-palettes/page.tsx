import Filters from '@/components/filters'
import { Entity } from '@/types/entities'

import ColorPalettes from './_components/color-palettes'

export const metadata = {
  title: 'Color Palette Organizer - Smart Color Management',
  description:
    'Effortlessly create, organize, and share color palettes with our powerful Color Palette Manager. Keep your favorite color schemes structured and accessible in just a few clicks.'
}
function ImageModule() {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-4xl font-semibold">Color palettes</h1>
      <Filters entity={Entity.COLOR_PALETTE} />
      <ColorPalettes />
    </div>
  )
}

export default ImageModule
