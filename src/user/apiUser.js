export const read = (userId,token) => {
    return fetch(`${process.env.REACT_APP_API_URL}/user/${userId}`,{
         method:"GET",
         headers:{
             Accept:"application/json",
             "Content-Type":"application/json",
             Authorization:`Bearer ${token}`
         }
     })
     .then(response => {
         return response.json();
     })
     .catch(err => console.log(err));
 };

 export const update = (userId,token,user) => {
    return fetch(`${process.env.REACT_APP_API_URL}/user/${userId}`,{
         method:"PUT",
         headers:{
             Accept:"application/json",
             "Content-Type":"application/json",
             Authorization:`Bearer ${token}`
         },
         body:JSON.stringify(user)
     })
     .then(response => {
         console.log(response)
         return response.json();
     })
     .catch(err => console.log(err));
 };

 export const remove = (userId,token) => {
    return fetch(`${process.env.REACT_APP_API_URL}/user/${userId}`,{
         method:"DELETE",
         headers:{
             Accept:"application/json",
             "Content-Type":"application/json",
             Authorization:`Bearer ${token}`
         }
     })
     .then(response => {
         return response.json();
     })
     .catch(err => console.log(err));
 };

 export const list = () => {
    return fetch(`${process.env.REACT_APP_API_URL}/users`,{
        method:"GET",
    })
    .then(response => {
      //  console.log(response)
        return response.json();
    })
    .catch(err => console.log(err));
 }