export const signup = (user) => {
   // console.log(`${process.env.REACT_APP_API_URL}/signup`)
    return fetch(`${process.env.REACT_APP_API_URL}/signup`,{
       method:"POST",
       headers:{
           Accept: "applicaton/json",
           "Content-Type":"application/json"
       },
       body:JSON.stringify(user)
   })
   .then(response=>{
       return response.json()
   })
   .catch(err=>console.log(err))
}


export function signin(user){
    //console.log(`${process.env.REACT_APP_API_URL}/signin`)
    return fetch(`${process.env.REACT_APP_API_URL}/signin`,{
       method:"POST",
       headers:{
           Accept: "applicaton/json",
           "Content-Type":"application/json"
       },
       body:JSON.stringify(user)
   })
   .then(response=>{
       return response.json()
   })
   .catch(err=>console.log(err))
}

export const authenticate = (jwt,next) => {
    if(typeof window !== "undefined") {
        localStorage.setItem("jwt",JSON.stringify(jwt))
        next();
    }
}


export const signout = () => {
    if(typeof window !== undefined) {
        localStorage.removeItem("jwt");
        return fetch(`${process.env.REACT_APP_API_URL}/signout`,{
            method:"GET"
        })
        .then(response => {
            console.log("signout");
            return response.json();
        })
        .catch(err => console.log(err))
    }
}

export const isAuthenticated = () => {
    
     if(typeof window == "undefined") {
         
         return false;
     }
     if(localStorage.getItem("jwt")) {
        console.log("isAuthenticated()")
         return JSON.parse(localStorage.getItem("jwt"))
     }
     else {
        console.log("inside window")
         return false;
     }
}