import { useGetPostComments } from 'entities/Comment'
import { Comment, LikeCommentIconButton } from 'features/post'
import React, { type FC, useState } from 'react'

import { AnswersForCommentaries } from '../AnswersForCommentaries/AnswersForCommentaries'
import cls from './Commentaries.module.scss'

interface Props {
  postId: number
}

export const Commentaries: FC<Props> = ({ postId }) => {
  const [openedCommentId, setOpenedCommentId] = useState<number>()
  const [isOpen, setIsOpen] = useState(false)

  const [openedComments, setOpenedComments] = useState<{ [id: number]: boolean }>({})

  console.log(openedComments)

  const idsArray = Object.keys(openedComments).map(Number)

  console.log('id', idsArray)

  const { comments, isLoading } = useGetPostComments(postId)

  if (isLoading) {
    return <div className={cls.comments} />
  }

  const viewAnswerOnClick = (commentId: number) => {
    setOpenedCommentId(commentId)
    /*setIsOpen(!isOpen)*/

    /*if (isOpen) {
      setOpenedCommentId(0)
      setIsOpen(false)
    }*/

    setOpenedComments(prevState => ({
      ...prevState,
      [commentId]: !prevState[commentId],
    }))
  }

  return (
    <div className={cls.comments}>
      {comments?.items.map(comment => (
        <div className={cls.comment} key={comment.id}>
          <Comment
            actionSlot={
              <LikeCommentIconButton
                commentId={comment.id}
                isLiked={comment.isLiked}
                postId={comment.postId}
              />
            }
            avatarSize={36}
            commentId={comment.id}
            data={comment}
            openedComments={openedComments}
            viewAnswerOnClick={viewAnswerOnClick}
          />
          {idsArray?.map(id => (
            <AnswersForCommentaries
              commentId={comment.id}
              isOpen={isOpen}
              key={id}
              openedCommentId={openedCommentId as number}
              openedComments={openedComments}
              postId={postId}
            />
          ))}
        </div>
      ))}
    </div>
  )
}
