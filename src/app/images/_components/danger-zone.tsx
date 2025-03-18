'use client'

import { useState, useTransition } from 'react'
import { useImagesStorage } from '@/storage/images'
import { Trash2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import paths from '@/constants/paths'

interface Props {
  id: string
}

function DangerZone({ id }: Props) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const { deleteImage } = useImagesStorage()
  const [isOpen, setIsOpen] = useState(false)

  const handleDelete = () => {
    startTransition(() => {
      deleteImage(id)
      setIsOpen(false)
      router.push(paths.images)
    })
  }

  return (
    <div className="collapse bg-base-100 border-error border mt-6">
      <input type="checkbox" />
      <div className="collapse-title font-semibold text-error">Danger zone</div>
      <div className="collapse-content flex flex-col gap-2">
        <p>Just use this area if you want to delete this image.</p>
        <button
          type="button"
          className="btn btn-error w-min"
          onClick={() => setIsOpen(true)}
        >
          <Trash2 size={20} />
          Delete
        </button>
      </div>

      {isOpen && (
        <dialog className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Confirm Deletion</h3>
            <p className="py-4">
              Are you sure you want to delete this image? This action cannot be undone.
            </p>
            <div className="modal-action">
              <button className="btn" onClick={() => setIsOpen(false)}>
                Cancel
              </button>
              <button
                disabled={isPending}
                className="btn btn-error"
                onClick={handleDelete}
              >
                {isPending ? (
                  <>
                    <span className="loading loading-dots loading-xs" />
                    Loading
                  </>
                ) : (
                  'Confirm'
                )}
              </button>
            </div>
          </div>
        </dialog>
      )}
    </div>
  )
}

export default DangerZone
