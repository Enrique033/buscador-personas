/* ---------- VALIDAR LOGIN ---------- */

if(!localStorage.getItem("login")){
window.location="login.html"
}

/* ---------- BUSCADOR ---------- */

const input = document.getElementById("buscar")
const resultados = document.getElementById("resultados")

input.addEventListener("keyup", async () => {

const q = input.value.trim()

if(q.length === 0){
resultados.innerHTML = ""
return
}

/* guardar historial */

if(q.length >= 3){

fetch("http://127.0.0.1:3000/historial",{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({busqueda:q})
})

}

/* búsqueda */

const res = await fetch(`http://127.0.0.1:3000/buscar?q=${q}`)
const data = await res.json()

let html = ""

data.forEach(p => {

html += `
<div class="card">
<div class="name">${p.nombres}</div>

<div class="info">
📧 ${p.correo.replace("<","&lt;").replace(">","&gt;")}
<button class="copy-btn" onclick="copiarCorreo('${p.correo}')">Copiar</button>
</div>

<div class="info">
📱 ${p.numero}
<button class="copy-btn" onclick="copiarNumero('${p.numero}')">Copiar</button>
</div>
</div>
`

})

resultados.innerHTML = html

})

/* ---------- LOGOUT ---------- */

function logout(){

localStorage.removeItem("login")
window.location="login.html"

}

/* ---------- COPIAR CORREO ---------- */

function copiarCorreo(correo){
copiarTexto(correo)
}

/* ---------- COPIAR NUMERO ---------- */

function copiarNumero(numero){
copiarTexto(numero)
}

/* ---------- COPIAR TEXTO ---------- */

function copiarTexto(texto){

const temp = document.createElement("input")
temp.value = texto
document.body.appendChild(temp)

temp.select()
document.execCommand("copy")

document.body.removeChild(temp)

mostrarToast("Copiado ✔")

}

/* ---------- TOAST ---------- */

function mostrarToast(msg){

let toast = document.getElementById("toast")

if(!toast){

toast = document.createElement("div")
toast.id="toast"

toast.style.position="fixed"
toast.style.bottom="30px"
toast.style.left="50%"
toast.style.transform="translateX(-50%)"
toast.style.background="#333"
toast.style.color="#fff"
toast.style.padding="10px 20px"
toast.style.borderRadius="8px"
toast.style.fontSize="14px"
toast.style.zIndex="999"
toast.style.opacity="0"
toast.style.transition="opacity 0.3s"

document.body.appendChild(toast)

}

toast.innerText = msg
toast.style.opacity="1"

setTimeout(()=>{
toast.style.opacity="0"
},2000)

}