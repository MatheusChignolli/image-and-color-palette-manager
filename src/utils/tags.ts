const TAG_COLORS = [
  'badge-primary',
  'badge-secondary',
  'badge-accent',
  'badge-neutral',
  'badge-info',
  'badge-success',
  'badge-warning',
  'badge-error',
  'badge-primary'
]

const getRandomColor = () => TAG_COLORS[Math.floor(Math.random() * TAG_COLORS.length)]

const tagsUtils = {
  getRandomColor
}

export default tagsUtils
