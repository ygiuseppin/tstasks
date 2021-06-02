import React from "react";

function LogOut(props){
    
    const userLogOut = () =>{
        props.logoutUser({
            connect: false,
            email: "",
            token: "",
            tasks:""}
            )
    }

    return(
        <>
            <div className="navbar-brand" >
                <h6 >Welcome, {props.userEmail.substr(0, props.userEmail.indexOf("@"))}</h6>
                <button  className="btn" onClick={userLogOut}>Log Out</button>
            </div>
        </>
    );
};

export default LogOut;