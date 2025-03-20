'use client'

import { useTransition } from 'react'
import { Trash2 } from 'lucide-react'
import { useRouter } from 'next/navigation'

import paths from '@/constants/paths'
import { useColorPalettesStorage } from '@/storage/color-palettes'

const modalId = 'delete-image-modal'

interface Props {
  id: string
}

function DangerZone({ id }: Props) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const { deletePalette } = useColorPalettesStorage()

  const handleDelete = () => {
    startTransition(() => {
      deletePalette(id)
      ;(document.getElementById(modalId) as HTMLDialogElement)?.close()
      router.replace(paths.colorPalettes)
    })
  }

  return (
    <div className="collapse bg-base-100 border-error border mt-6">
      <input type="checkbox" />
      <div className="collapse-title font-semibold text-error">Danger zone</div>
      <div className="collapse-content flex flex-col gap-2">
        <p>Just use this area if you want to delete this color palette.</p>
        <button
          type="button"
          className="btn btn-error w-min"
          onClick={() =>
            (document.getElementById(modalId) as HTMLDialogElement)?.showModal()
          }
        >
          <Trash2 size={20} />
          Delete
        </button>
      </div>
      <dialog id={modalId} className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Confirm Deletion</h3>
          <p className="py-4">
            Are you sure you want to delete this color palette? This action cannot be
            undone.
          </p>
          <div className="modal-action">
            <button
              className="btn"
              onClick={() =>
                (document.getElementById(modalId) as HTMLDialogElement)?.close()
              }
            >
              Cancel
            </button>
            <button disabled={isPending} className="btn btn-error" onClick={handleDelete}>
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
    </div>
  )
}

export default DangerZone
