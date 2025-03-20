import ColorPaletteForm from '@/components/color-palette-form'

export const metadata = {
  title: 'Create a New Color Palette - Color Organizer',
  description:
    'Design and save your own color palettes with our intuitive Color Palette Manager. Organize and customize color schemes effortlessly for your projects.'
}

function NewColorPalette() {
  return (
    <div className="max-w-xl mx-auto">
      <h1 className="text-3xl font-bold">New color palette</h1>
      <ColorPaletteForm />
    </div>
  )
}

export default NewColorPalette
