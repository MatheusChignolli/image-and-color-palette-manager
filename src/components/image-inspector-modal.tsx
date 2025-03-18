'use client'

import { SquareArrowOutUpRight, X } from 'lucide-react'
import ImageWithFallback from './image-with-fallback'

interface Props {
  className?: string
  src?: string
}

const modalId = 'image-inspector-modal'

function ImageInspectorModal({ className, src }: Props) {
  if (!src) return null

  return (
    <>
      <div className="tooltip" data-tip="Open image">
        <button
          type="button"
          className={`btn btn-primary btn-square ${className}`}
          onClick={() =>
            (document.getElementById(modalId) as HTMLDialogElement)?.showModal()
          }
        >
          <SquareArrowOutUpRight size={20} />
        </button>
      </div>
      <dialog id={modalId} className="modal">
        <div className="p-10 relative">
          <button
            type="button"
            className="btn btn-sm btn-circle btn-primary absolute right-2 top-2"
            onClick={() =>
              (document.getElementById(modalId) as HTMLDialogElement)?.close()
            }
          >
            <X size={20} />
          </button>
          <ImageWithFallback
            width={600}
            height={400}
            src={src}
            alt="Inspected"
            className="w-full h-auto object-contain rounded-lg"
          />
        </div>
      </dialog>
    </>
  )
}

export default ImageInspectorModal
