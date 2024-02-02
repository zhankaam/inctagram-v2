import { useGetProfileData } from 'entities/Profile'
import { FollowingAndFollowersModal } from 'features/profile'
import React, { useEffect, useState } from 'react'

import { MainInfo } from '../MainInfo'
import { PostCards } from '../PostCards'
import cls from './ProfilePage.module.scss'

export const ProfilePage = () => {
  const { response } = useGetProfileData()
  const userData = response?.data

  const [isModalVisible, setIsModalVisible] = useState(false)
  const [mode, setMode] = useState<'followers' | 'following'>('followers')
  const [followingCount, setFollowingCount] = useState<number | undefined>(userData?.followingCount)

  const openModal = () => setIsModalVisible(true)

  const closeModal = () => {
    setMode('followers')
    setIsModalVisible(false)
  }

  const activateFollowersMode = () => {
    openModal()
    setMode('followers')
  }

  const activateFollowingMode = () => {
    openModal()
    setMode('following')
  }

  const handleFollowingChange = (action: 'follow' | 'unfollow') => {
    setFollowingCount(prevCount => {
      if (!prevCount) {
        return 0
      }

      return action === 'follow' ? prevCount + 1 : prevCount - 1
    })
  }

  useEffect(() => {
    setFollowingCount(userData?.followingCount)
  }, [userData])

  return (
    <div className={cls.container}>
      <MainInfo
        activateFollowersMode={activateFollowersMode}
        activateFollowingMode={activateFollowingMode}
        followingCount={followingCount}
        userData={userData}
      />
      {userData && <PostCards userData={userData} />}
      {isModalVisible && (
        <FollowingAndFollowersModal
          fetchDataName={mode}
          isOpen={isModalVisible}
          onClose={closeModal}
          onFollowingChange={handleFollowingChange}
          userName={userData?.userName}
        />
      )}
    </div>
  )
}
