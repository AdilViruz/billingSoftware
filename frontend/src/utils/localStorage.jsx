

 const setToken = (token)=> localStorage.setItem('token',JSON.stringify(token))
 
 const getToken =()=>{
  const token = localStorage.getItem('token')
  return JSON.parse(token)
 }

 const clearToken= ()=> localStorage.clear('token')

 export{setToken,getToken,clearToken}