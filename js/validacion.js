
//--------- Selección de Elementos---------//
const email = document.getElementById("email");
const password = document.getElementById("password");
const btnValidar = document.querySelector(".boton");//".btn-enviar"
const aviso = document.querySelector(".texto-aviso");

const correoRegex = /^[^@\s]+@[^\s]+\.[^\s]{1,4}$/;
const contraseñaRegex = /^.{5}$/;

//------- Validación -------//
btnValidar.addEventListener("click", e=>{
    e.preventDefault();
    let correo = email.value.trim();
    let contraseña = password.value.trim();
    
    if(!correo){
        mostrarAviso("Ingresa una dirección de correo válida");
    }
    else if(!correoRegex.test(correo)){
        mostrarAviso("Ingresa un correo electrónico válido");
    }
    else if(!contraseña){
        mostrarAviso("Ingresa una contraseña válida");
    }
    else if(!contraseñaRegex.test(contraseña)){
        mostrarAviso("Ingresa una contraseña válida debe contener 5 caracteres");
    }

    else if(autenticarUsuario(correo, contraseña)){
        window.location = "../index.html";
    }

    else{
        mostrarAviso("El correo electrónico o contraseña que ingresaste, no están asociados a una cuenta");
        email.value = "";
        password.value = "";
    }
});

function autenticarUsuario(correo, contraseña){
    return correo === "admindev@gmail.com" && contraseña === "12345";
}

function mostrarAviso(mensaje){
    aviso.style.color = "#FF2020";
    aviso.style.fontWeight = "800";
    aviso.textContent = mensaje;
    aviso.style.visibility = "inherit";
}

///---------------------------------------
const btn2 = document.getElementById('llamar');
btn2.addEventListener('click',llamarAPI);

function llamarAPI(){
    const json =
        fetch('https://reqres.in/api/users?page=2')
            .then(response => response.json())
               // .then(data => console.log(data));
            .then(data => dibujarDatos(data));
                // console.log(json);
} 

function dibujarDatos(json){
  const filas = json.data.map(obj => fila(obj));
  
  document.getElementById('datos').innerHTML = filas.join('');

}

function fila(obj){
    return `
            <tr>
                <th>${obj.id}</th>
                <th>${obj.email}</th>
                <th>${obj.first_name}</th>
                <th>${obj.last_name}</th>
                <th><img src="${obj.avatar}" alt=""></th>
            </tr>
    `
}

llamarAPI();

