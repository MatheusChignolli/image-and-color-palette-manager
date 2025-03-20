'use client'

import { useImagesStorage } from '@/storage/images'
import { Entity } from '@/types/entities'
import { useForm } from '@tanstack/react-form'
import { ArrowRight, MessageCircle, Trash2, X } from 'lucide-react'

interface Props {
  id: string
  entity: Entity
}

const useColorPaletteStorage = () => {}

function CommentsModal({ id, entity }: Props) {
  const commentsModalId = `comments-modal-${id}`
  const imageStorage = useImagesStorage()
  const colorPaletteStorage = useColorPaletteStorage()

  const storageMapper = {
    [Entity.IMAGE]: {
      addComment: imageStorage.addComment,
      deleteComment: imageStorage.deleteComment,
      getData: imageStorage.getImage
    },
    [Entity.COLOR_PALETTE]: {
      addComment: colorPaletteStorage?.addComment,
      deleteComment: colorPaletteStorage?.deleteComment,
      getData: colorPaletteStorage?.getColorPalette
    }
  }

  const { addComment, deleteComment, getData } = storageMapper[entity] || {}

  const comments = getData(id)?.comments || []

  const form = useForm({
    defaultValues: {
      comment: ''
    },
    onSubmit: async ({ value }) => {
      if (!!value.comment) {
        addComment(id, value.comment)
        resetForm()
      }
    }
  })

  const resetForm = () => {
    form.reset()
  }

  return (
    <>
      <div className="indicator">
        {!!comments.length && (
          <span className="indicator-item badge badge-sm badge-secondary">
            {comments.length}
          </span>
        )}
        <button
          onClick={() =>
            (document.getElementById(commentsModalId) as HTMLDialogElement)?.showModal()
          }
          className="btn btn-primary btn-square tooltip"
          data-tip="Comments"
        >
          <MessageCircle size={20} />
        </button>
      </div>
      <dialog onClose={resetForm} id={commentsModalId} className="modal">
        <div className="modal-box">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              <X size={20} />
            </button>
          </form>
          <h3 className="font-bold text-lg">Comments</h3>
          <div className="mt-4 space-y-2 max-h-80 overflow-auto">
            {comments.length > 0 ? (
              comments.map(({ id: commentId, content, createdAt }) => (
                <div
                  key={commentId}
                  className="p-3 pr-8 border rounded bg-base-200 shadow-sm relative"
                >
                  <p className="text-sm font-medium">{content}</p>
                  <p className="text-xs text-primary mt-1">
                    {Intl.DateTimeFormat('pt-BR', {
                      dateStyle: 'short',
                      timeStyle: 'short'
                    }).format(new Date(createdAt))}
                  </p>
                  <button
                    type="button"
                    onClick={() => deleteComment(id, commentId)}
                    className="btn btn-error btn-xs btn-square top-1 right-1 tooltip tooltip-error tooltip-left absolute"
                    data-tip="Delete comment"
                  >
                    <Trash2 size={12} />
                  </button>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No comments yet.</p>
            )}
          </div>
          <form
            className="flex gap-2 mt-4 relative"
            onSubmit={e => {
              e.preventDefault()
              e.stopPropagation()
              form.handleSubmit()
            }}
          >
            <form.Field name="comment">
              {field => (
                <textarea
                  className="textarea w-full pr-14"
                  placeholder="Write a comment"
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onChange={e => field.handleChange(e.target.value)}
                ></textarea>
              )}
            </form.Field>
            <button
              type="submit"
              onClick={() =>
                (
                  document.getElementById(commentsModalId) as HTMLDialogElement
                )?.showModal()
              }
              className="btn btn-primary btn-square top-4 right-4 tooltip absolute"
              data-tip="Sends"
            >
              <ArrowRight size={20} />
            </button>
          </form>
        </div>
      </dialog>
    </>
  )
}

export default CommentsModal
