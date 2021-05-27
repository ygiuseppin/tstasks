import React from 'react';
import Login from "./logIn";
import SingUp from "./singUp";
import LogOut from "./logOut"

function Header(props){
    
    return(
        <>
            <div className="encabezado navbar">

                <div className="navbar-brand title-header my-font">
                    My Pending Tasks
                </div>
                
                <div>
                    { (!props.user.connect) ? 
                        <>
                              <Login loginUser={props.setUserState} />
                              <SingUp />
                        </>
                    
                    :   <>
                        <LogOut userEmail={props.user.email} logoutUser={props.setUserState}/>
                        </>    
                    }
                </div>
            </div>
        </>
    )
}

export default Header;