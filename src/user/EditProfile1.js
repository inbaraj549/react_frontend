import EditProfile from "./EditProfile";
import { useParams } from "react-router-dom";


function EditProfile1(props) {
    //console.log("from profile1"+props.isAuth)
    const params = useParams();
    return <EditProfile params={params} />
}

export default EditProfile1;