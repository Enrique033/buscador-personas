async function login(){

const usuario = document.getElementById("usuario").value
const password = document.getElementById("password").value

const res = await fetch("http://127.0.0.1:3000/login",{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({usuario,password})
})

const data = await res.json()

if(data.ok){

localStorage.setItem("login","true")
window.location="index.html"

}else{

alert("Usuario o contraseña incorrectos")

}

}