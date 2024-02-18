import { useMutation, useQueryClient } from '@tanstack/react-query'
import { PostService } from 'shared/api'
import { type LikeStatus } from 'shared/types/likeStatus'

export const useLikePost = (postId: number) => {
  const queryClient = useQueryClient()

  const { isLoading, mutate: like } = useMutation({
    mutationFn: ({ likeStatus }: { likeStatus: LikeStatus }) =>
      PostService.like({ likeStatus, postId }),
    onSuccess: async () => {
      await queryClient.invalidateQueries(['post', postId])
      await queryClient.invalidateQueries(['publicationsData'])
    },
  })

  return { isLoading, like }
}
