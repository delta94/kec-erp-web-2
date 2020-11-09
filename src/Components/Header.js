import React from 'react'
import Button from 'react-bootstrap/Button'
import InputGroup from 'react-bootstrap/InputGroup'
import user from '../images/user.svg'
import logout from '../images/logout.svg'
import {NavLink} from 'react-router-dom'

export const Header=()=> {

    return (
        <div className="headerContainer">
            
        <div className="companyName">
            
            <div><span className="headerLogo"></span><h2>KUNNELERP</h2></div>   
        </div>
        <div className="searchbox">
            <div>
                <form>    
                    <InputGroup className="mb-3">
                        <input type="text" placeholder="Search here...."/>
                    <InputGroup.Append>
                        <Button variant="primary">Search</Button>
                    </InputGroup.Append>
                    </InputGroup>
                </form>
            </div>
        </div>
        <div>
        <span><img src={user} className="imgHeader" alt=""/><b>Hi! {localStorage.getItem('username')}</b></span>
        <NavLink to="/"><span><img src={logout} className="imgLogout" alt=""/>Logout</span></NavLink>
        </div>
    </div>
    )
}

export default Header
