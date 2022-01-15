import Menu from './Menu';
//
import {useLocation} from "react-router-dom";

function Menu1(props){
    let location = useLocation()
    console.log("LOCATION")
    console.log(location)
    return <Menu location={location} />
}

export default Menu1;