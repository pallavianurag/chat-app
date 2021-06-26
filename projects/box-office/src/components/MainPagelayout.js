import React from 'react'
import Nav from './Navs'
import Title from './Title'
const MainPagelayout = ({children}) => {
    return (
        <div>
            <Title title="Box Office" subtitle="Are you looking for a series or an actor?"/>

            <Nav />
            {children}
        </div>
    )
}

export default MainPagelayout
