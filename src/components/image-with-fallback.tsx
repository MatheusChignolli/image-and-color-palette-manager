'use client'

import { useState } from 'react'
import Image from 'next/image'

interface ImageWithFallbackProps {
  src: string
  alt: string
  width?: number
  height?: number
  className?: string
  isBackground?: boolean
}

function isValidUrl(url: string) {
  try {
    return Boolean(new URL(url))
  } catch {
    return false
  }
}

function ImageWithFallback({
  src,
  alt,
  width = 500,
  height = 200,
  isBackground = false,
  ...props
}: ImageWithFallbackProps) {
  const [isValid, setIsValid] = useState(isValidUrl(src))

  return isValid ? (
    <div
      style={{
        width,
        height,
        backgroundImage: isBackground ? `url(${src})` : undefined,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        objectFit: 'cover'
      }}
      className="flex relative"
    >
      <Image
        {...props}
        src={src}
        alt={alt || 'Image'}
        width={width}
        height={height}
        onError={() => setIsValid(false)}
        className={`m-auto w-auto h-auto ${isBackground ? 'opacity-0' : 'opacity-100'}`}
      />
    </div>
  ) : (
    <div
      className="flex"
      style={{
        width,
        height
      }}
    >
      <p className="text-gray-500 text-2xl m-auto">Image unavailable</p>
    </div>
  )
}

export default ImageWithFallback
