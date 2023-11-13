import React, { useState } from 'react'

import { useTranslation } from 'react-i18next'
import { LogoutButton } from 'shared/ui'
import { ConfirmationModal } from 'shared/ui/ConfirmationModal/ConfirmationModal'
import { useLogout } from '../../model'

interface IProps {
    className?: string
}

export const Logout = ({ className }: IProps) => {
    const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false)
    const { logout, isLoading, email } = useLogout()
    const { t } = useTranslation('auth')

    const onLogOutClick = () => { setDeleteModalOpen(true) }

    return (
        <>
            <ConfirmationModal
                isModalOpen={deleteModalOpen}
                onYesAction={logout}
                isLoading={isLoading}
                setModalOpen={setDeleteModalOpen}
                headerText={`${t('logOutConfirmationHeader')}`}
                bodyText={`${t('logOutConfirmationBody')}${email ? ` "${email}"?` : '?'} `}
            />
            <LogoutButton disabled={isLoading} onClick={onLogOutClick} className={className} />
        </>
    )
}
