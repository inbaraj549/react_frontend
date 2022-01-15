import React,{Component} from 'react';
import {authenticate, isAuthenticated} from "../auth";
import { Route,Routes,Navigate} from 'react-router-dom';
import {read,update} from "./apiUser";

class EditProfile extends Component {
    constructor(props){
        super(props)
        this.state = {
            id:"",
            name:"",
            email:"",
            password:"",
            redirectToProfile:false
        }
    }
    init = (userId) => {
        const token = isAuthenticated().token;
        read(userId,token)
        .then(data => {
            if(data.error) {
                this.setState({redirectToProfile:true});
            } else {
                this.setState({id:data._id,email:data.email,name:data.name,error:''});
            }
        }) 
    }

    handleChange = name => event => {
        this.setState({[name]:event.target.value});
    }

    clickSubmit = event => {
        event.preventDefault();
        const {name,email,password} = this.state;
        const user = {
            name,
            email,
            password:password||undefined,
        }
       // console.log(user);
       const userId = this.props.params.userId;
       const token = isAuthenticated().token;
       const jwt = isAuthenticated();
       jwt.user.name = user.name;
       authenticate(jwt,()=>{});

         update(userId,token,user)
          .then(data=>{
          if(data.error) {
                this.setState({error:data.error});
            } else {
                this.setState({
                    redirectToProfile:true
            })
           }
       })
    }

    signupForm = (name,email,password) => (
        <form>
                    <div className="form-group">
                        <label className="text-muted">Name</label>
                        <input onChange={this.handleChange("name")} type="text" className="form-control" value={name} />
                    </div>
                    <div className="form-group">
                        <label className="text-muted">Email</label>
                        <input onChange={this.handleChange("email")} type="email" className="form-control" value={email} />
                    </div>
                    <div className="form-group">
                        <label className="text-muted">Password</label>
                        <input onChange={this.handleChange("password")} type="password" className="form-control" value={password} />
                    </div>
                    <button onClick={this.clickSubmit} className="btn btn-raised btn-primary"> 
                    Update
                    </button>
                </form>
    )

    componentDidMount() {
        
        const userId = this.props.params.userId;
        this.init(userId);
    }
    render() {
        const {id,name,email,password,redirectToProfile} = this.state
        if(redirectToProfile) {
           return(
            <div>
                   {<Navigate to="/" /> }
                   </div>
              
            )
        }
        return (<div className="container">
        <h2 className="mt-5 mb-5">Edit Profile</h2>
        {this.signupForm(name,email,password)} 
        </div>)
    }
}

export default EditProfile;