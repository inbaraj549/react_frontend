import React from "react";
import {Link} from 'react-router-dom';
import "./Menu.css"
import { Route,Routes,Navigate,useNavigate } from "react-router-dom";
import {signout,isAuthenticated} from '../auth'




function Menu(props){
    {console.log(props)}
    let navig = useNavigate();
      return (<div>
        <ul className="nav nav-tabs bg-primary">

            <li className="nav-item">	
                <Link className="nav-link" to="/">Home</Link>  
            </li>
            <li className="nav-item">	
                <Link className="nav-link" to="/users">Users</Link>  
            </li>

            {!isAuthenticated()&&(<div><li className="nav-item">
                <Link className="nav-link"  to="/signin" >Signin</Link>
            </li></div>)}

            {!isAuthenticated()&&(<div><li className="nav-item">
                <Link className="nav-link"  to="/signup" >Signup</Link>
            </li></div>)}

            {isAuthenticated()&&(<> <li className="nav-item">
                <a className="nav-link" onClick={()=>signout(props).then(response =>{
                   navig('/')
                })}>Signout</a>
            </li>
            <li className="nav-item">

                
                    <Link className="nav-link" to={`/user/${isAuthenticated().user._id}`} style={{color:"#fff"}}>{`${isAuthenticated().user.name}'s profile`}</Link>
            </li>
            </>)}
        </ul>
        
    </div>)
}



export default Menu;