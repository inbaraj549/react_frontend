import React,{Component} from 'react';
import {list} from './apiUser.js'
import DefaultProfile from "../images/avatar.png"
import { Link } from 'react-router-dom';

class Users extends Component {
    constructor() {
        super() 
        this.state = {
            users:[]
        }  
    }
    componentDidMount() {
        list().then(data => {
           // console.log(data)
            if(data.error) {
                console.log(data.error);
            } else {
                this.setState({users:data});
            }
        })
    }
    renderUsers = (users) => (
        <div className="row">
            {users.map((user,i)=>
                    ( <div className='card col-md-4' key={i}>
                        <img className='card-img-top' src={DefaultProfile} alt={user.name} style={{width:'100%',height:'15vw',objectFit:'cover'}} />
                        <div className='card-body'>
                            <h5 className='title'>{user.name}</h5>
                            <p className='card-text'>{user.email}</p>
                            <Link to={`/user/${user._id}`} className='btn btn-raised btn-primary btn-sm'>View Profile</Link>
                        </div>
                    </div>)
             )}
         </div>
    )
    render() {
        const {users} = this.state;
        return (
            <div className="container">
                <h2 className="mt-5 mb-5">Users</h2>
                {this.renderUsers(users)}
            </div>
        )
    }
}


export default Users;