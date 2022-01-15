import React, {Component} from 'react';
import { isAuthenticated } from "../auth";
import { Route,Routes,Navigate } from 'react-router-dom';
import {remove} from './apiUser.js'
import {signout} from '../auth';
class DeleteUser extends Component {
    constructor(props) {
        super(props)
    this.state = {
        redirect:false
    }
}
    

    deleteAccount = () => {
        const token = isAuthenticated().token;
        const userId = this.props.userId;
        remove(userId,token)
        .then(data => {
            if(data.error) {
                console.log(data.error);
            } else {
                //signout user 
                console.log(this.props)
                signout(this.props,()=>console.log("User is deleted"));
                //redirect
                this.setState({redirect:true});
            }
        })
    }
    deleteConfirmed = () => {
        let answer = window.confirm("Are you sure you want to delete your account?");
        if(answer) {
            this.deleteAccount();
        }
    }
    render() {
        if(this.state.redirect) {
            return (<div>
            <Routes>
                <Route path="/" element={<Navigate to="/" /> }></Route>
            </Routes>
            </div>)
        }
        return (
            <button onClick={this.deleteConfirmed} className="btn btn-raised btn-danger"> Delete Profile</button>
        )
    }
}



export default DeleteUser;