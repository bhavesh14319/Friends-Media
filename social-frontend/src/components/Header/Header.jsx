import React, { useState } from 'react'
import "./Header.css"

import { Link } from 'react-router-dom'
import { Home, HomeOutlined, Search, SearchOutlined, Add, AddOutlined, AccountCircle, AccountCircleOutlined } from '@mui/icons-material'

const Header = () => {

    const [tab, setTab] = useState(window.location.pathname);

    return (
        <div className='headerBox'>
            <div className='headerLogo'>
                <p>Friends Media</p>
            </div>

            <div className='header'>
            <Link to="/home" onClick={() => setTab("/")}>
                {
                    tab === "/home" ?  <Home style={{color:"black"}}/>: <HomeOutlined /> 
                }
            </Link>
            <Link to="/newpost" onClick={() => setTab("/newpost")}>
                {
                    tab === "/newpost" ? <Add style={{color:"black"}} />:<AddOutlined /> 
                }
            </Link>
            <Link to="/search" onClick={() => setTab("/search")}>
                {
                    tab === "/search" ?  <Search  style={{color:"black"}}/> : <SearchOutlined /> 
                }
            </Link>
            <Link to="/account" onClick={() => setTab("/account")}>
                {
                    tab === "/account" ? <AccountCircle style={{color:"black"}}/> : <AccountCircleOutlined /> 
                }
            </Link>
            </div>

        </div>
    )
}

export default Header
