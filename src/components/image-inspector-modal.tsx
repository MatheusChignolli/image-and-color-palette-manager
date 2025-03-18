'use client'

import { useState } from 'react'
import { SquareArrowOutUpRight, X } from 'lucide-react'
import Image from 'next/image'

interface Props {
  className?: string
  src?: string
}

function ImageInspectorModal({ className, src }: Props) {
  const [isOpen, setIsOpen] = useState(false)

  if (!src) return null

  return (
    <>
      <div className="tooltip" data-tip="Open image">
        <button
          type="button"
          className={`btn btn-primary btn-square ${className}`}
          onClick={() => setIsOpen(true)}
        >
          <SquareArrowOutUpRight size={20} />
        </button>
      </div>

      {isOpen && (
        <div className="modal modal-open">
          <div className="modal-box p-10 relative">
            <button
              type="button"
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              onClick={() => setIsOpen(false)}
            >
              <X size={20} />
            </button>
            <Image
              width={500}
              height={500}
              src={src}
              alt="Inspected"
              className="w-full h-auto object-contain rounded-lg"
            />
          </div>
        </div>
      )}
    </>
  )
}

export default ImageInspectorModal
