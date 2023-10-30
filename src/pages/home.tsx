import React from 'react'
import { PublicationCards } from '../features/home/getHomeData/ui/PuublicationCards/PublicationCards'
import { getLayoutWithSidebar } from '../layouts/Layout/LayoutWithSidebar/LayoutWithSidebar'

const Home = () => {
    return (
        <PublicationCards/>
    )
}

Home.getLayout = getLayoutWithSidebar

export default Home
