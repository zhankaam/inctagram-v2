import Image from 'next/image'
import React, { FC, ReactNode } from 'react'
import userPhoto from 'shared/assets/images/user.png'
import { useSnackbar } from 'shared/hooks'
import { User } from 'shared/types/auth'
import { Button } from 'shared/ui'

import { useToggleFollowUser } from '../../model'
import styles from './UsersListStyles.module.scss'

type PropsType = {
  debounceSearchUserValue: string
  followingCount: number
  onFollowingChange?: (action: 'follow' | 'unfollow') => void
  setCount: (count: number) => void
  usersData: User[]
}

export const UsersList: FC<PropsType> = ({
  debounceSearchUserValue,
  followingCount,
  onFollowingChange,
  setCount,
  usersData,
}) => {
  const onOpen = useSnackbar(state => state.onOpen)

  const toggleFollowUser = useToggleFollowUser(debounceSearchUserValue)
  const handleToggleFollow = (user: User) => {
    toggleFollowUser.mutate(user, {
      onSuccess: () => {
        setCount(followingCount)
        onOpen(
          `You have ${user.isFollowing ? 'unfollowed' : 'followed'} ${user.userName}!`,
          'success',
          'right'
        )
        if (onFollowingChange) {
          if (user.isFollowing) {
            onFollowingChange('unfollow')
          } else {
            onFollowingChange('follow')
          }
        }
      },
    })
  }

  return (
    <div className={styles.usersList}>
      {usersData?.map((user: User) => {
        const toggleHandler = () => handleToggleFollow(user)

        return (
          <div className={styles.userCard} key={user.id}>
            <div className={styles.rightBlock}>
              <Image
                alt={user.userName}
                className={styles.userAvatar}
                height={50}
                src={user.avatars?.medium?.url || userPhoto}
                width={50}
              />
              <p className={styles.userName}>{user.userName}</p>
            </div>
            <div className={styles.leftBlock}>
              <Button className={styles.button} onClick={toggleHandler} type={'button'}>
                {user.isFollowing ? 'Unfollow' : 'Follow'}
              </Button>
              <Button className={styles.button} theme={'secondary'} type={'button'}>
                Delete
              </Button>
            </div>
          </div>
        )
      })}
    </div>
  )
}
