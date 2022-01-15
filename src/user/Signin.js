import React,{Component} from "react";
import {Routes,Route, Navigate} from "react-router-dom"  ;
//import Home from "../core/Home"
//import Menu from "../core/Menu.js" 
import {signin, authenticate} from "../auth"


export class Signin extends Component {
    constructor(props){
        super()
        this.state = {
            
            email : "",
            password: "",
            error : "",
            redirectToReferer:false,
            loading:false
        }
    }
    handleChange = name => event => {
        this.setState({error:""})
        this.setState({[name]:event.target.value});
    }
    
    clickSubmit = event => {
        event.preventDefault();
        this.setState({loading:true})
        const {email,password} = this.state;
        const user = {
            email,
            password
        }
       signin(user)
       .then(data=>{
           if(data.error) {
               this.setState({error:data.error,loading:false });
               
           } else {
               // authenticate
               // redirect
               
               authenticate(data,()=>{
                
                this.setState({redirectToReferer:true,loading:false})
               })
           }
       })
    }

   
    signinForm = (email,password) => (
        <form>
                    <div className="form-group">
                        <label className="text-muted">Email</label>
                        <input onChange={this.handleChange("email")} type="email" className="form-control" value={email} />
                    </div>
                    <div className="form-group">
                        <label className="text-muted">Password</label>
                        <input onChange={this.handleChange("password")} type="password" className="form-control" value={password} />
                    </div>
                    <button onClick={this.clickSubmit} className="btn btn-raised btn-primary"> 
                    Submit
                    </button>
                </form>
    )
    render() {
        const {email,password,error,redirectToReferer,loading} = this.state
        if(redirectToReferer) {
            return (
            
                <div>
                <Routes>
                    <Route path="/" element={<Navigate to="/" /> }></Route>
                </Routes>
                </div>
            );
        }
  
        
        return (
            <div className="container">
                <h2 className="mt-5 mb-5">SignIn</h2>
                <div className="alert alert-danger" style={{display:error?"":"none"}}>{error}</div>
                <div>
                    {loading?(<div className="jumbotron text-center">
                        <h2>Loading...</h2>
                    </div>):("")}
                </div>
                {this.signinForm(email,password)}
            </div>
        );
    }
}

export default Signin;