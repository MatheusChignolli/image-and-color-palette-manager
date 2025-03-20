const paths = {
  home: '/',
  images: '/images',
  imageNew: '/images/new',
  image: (id: string) => `/images/${id}`,
  colorPalettes: '/color-palettes',
  colorPaletteNew: '/color-palettes/new',
  colorPalette: (id: string) => `/color-palettes/${id}`
}

export default paths
