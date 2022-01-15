import Profile from "./Profile";
import { useParams } from "react-router-dom";


function Profile1(props) {
    //console.log("from profile1"+props.isAuth)
    const params = useParams();
    return <Profile params={params} setIsAuth={props.setIsAuth} />
}

export default Profile1;