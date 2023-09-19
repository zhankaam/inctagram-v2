import { useMutation, useQueryClient } from '@tanstack/react-query'
import { type AxiosError } from 'axios'
import { useRouter } from 'next/router'
import { AuthService } from 'shared/api'
import { AppRoutes } from 'shared/constants/path'

export const useLogin = () => {
    const queryClient = useQueryClient()
    const { push } = useRouter()

    const { mutate: login, isLoading, error } = useMutation<any, AxiosError<{ message: string }>, any>({
        mutationFn: AuthService.login,
        retry: false,
        onSuccess: async () => {
            await queryClient.invalidateQueries(['me']).then(() => {
                void push({ pathname: AppRoutes.PROFILE.SETTINGS })
            })
        }
    })

    return { login, isLoading, error }
}
