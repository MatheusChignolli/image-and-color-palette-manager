import toast from 'react-hot-toast'

const copyToClipboard = (text: string) => {
  window.navigator.clipboard.writeText(text)
  toast.success('Copied to clipboard')
}

const shareUrl = (url: string) => {
  if (!window.navigator.canShare()) {
    window.navigator
      .share({
        text: 'Check this!',
        url
      })
      .then(() => {
        toast.success('Content shared!')
      })
  } else {
    alert('Your browser does not support share feature.')
  }
}

const shareUtils = { copyToClipboard, shareUrl }

export default shareUtils
