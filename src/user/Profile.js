import React,{Component } from "react";
import { isAuthenticated } from "../auth";
import {Route,Routes,Navigate,Link} from 'react-router-dom'
import {read} from './apiUser.js'
import DefaultProfile from "../images/avatar.png"
import DeleteUser from "./DeleteUser";

class Profile extends Component {
    constructor(props){
        super(props)
        this.state = {
            user:"",
            redirectToSignin:false
        }
    }

    

    init = (userId) => {
        const token = isAuthenticated().token;
        read(userId,token)
        .then(data => {
            if(data.error) {
                this.setState({redirectToSignin:true});
            } else {
                this.setState({user:data});
            }
        }) 
    }

    componentDidMount() {
        
        const userId = this.props.params.userId;
        this.init(userId);
    }
    componentWillReceiveProps(props) {
        const userId = props.params.userId;
        this.init(userId);
    }
    render() {
        const {redirectToSignin,user} = this.state;
        if(redirectToSignin) {
            <div>
                <Routes>
                    <Route path="/" element={<Navigate to="/signin" /> }></Route>
                </Routes>
                </div>
        }
        return (
            <div className="container">
                <h2 className="col-md-6 mt-5">Profile</h2>
                <div className="row mt-5">
                    <div className="col-md-6">
                        <img className='card-img-top' src={DefaultProfile} alt={user.name} style={{width:'100%',height:'15vw',objectFit:'cover'}} />
                          
                    </div>
                    <div className="col-md-6">
                    <div className="lead mt-2">
                            <p>Hello {user.name}</p>
                            <p>Email: {user.email}</p>
                            <p>{`Joined ${new Date(user.created).toDateString()}`}</p>
                        </div>
                        {isAuthenticated()&&isAuthenticated().user._id === user._id && (<div className="d-inline-block">
                           <Link className="btn btn-raised btn-success mr-5" to={`/user/edit/${user._id}`}>Edit Profile</Link>
                           <DeleteUser userId={user._id} setIsAuth={this.props.setIsAuth} />
                            </div>)}
                    </div>
              </div>
            </div>
        );
    }
}

export default Profile;