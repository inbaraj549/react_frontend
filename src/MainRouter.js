import {Route, Routes} from "react-router-dom";
import Home from "./core/Home" 
import Menu from "./core/Menu1"
import Signup from "./user/Signup"
import Signin from "./user/Signin"
import Profile from "./user/Profile1";
import Users from "./user/Users";
import EditProfile from "./user/EditProfile1";

function MainRouter(){
    return (<div> 
        <Menu />
        <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/users" element={<Users />} />
            <Route exact path="/signup" element={<Signup />} />
            <Route exact path="/signin" element={<Signin />} />
            <Route exact path="/user/edit/:userId" element={<EditProfile />} />
            <Route exact path="/user/:userId" element={<Profile />} />
            
        </Routes>
    </div>)
}


export default MainRouter;