
const logo = document.getElementById('logo-modal-2');
const mensage = document.querySelector('.mensage-2');
const boton = document.querySelector('.botones-modal');


const modal_cargando_contenido = document.querySelector('.modal-carga');
const contenedor_modal_cargando = document.getElementById('cotendor-modal-id');

function ocultar_modal_cargando(){
    modal_cargando_contenido.style.visibility = "hidden";
    modal_cargando_contenido.style.opacity = "0";
    contenedor_modal_cargando.style.transform = "translateY(-30%)"
}

function go_everywhere(){
    ocultar_modal_cargando();
    // aqui es donde acemos la funcion
}

function mostrar_modal_cargando() {
    // swal("Hello world!");
    modal_cargando_contenido.style.visibility = "visible";
    modal_cargando_contenido.style.opacity = "1";
    contenedor_modal_cargando.style.transform = "translateY(0%)"
    registrando_informacion();
}


function registrando_informacion(){
    logo.style.display = "none";
    logo.style.transition = "1.5s";
    logo.style.opacity = "1";

    mensage.style.display = "none";
    mensage.style.transition = "1.5s";
    mensage.style.opacity = "1";

    boton.style.display = "none";
    boton.style.transition = "1.5s";
    boton.style.opacity = "1";

    document.getElementById('logo-modal-1').style.display = "block";
    document.querySelector('.mensage-1').style.display = "block";
}

function registrado_completo() {
    logo.classList.remove("fa-check-circle");
    logo.classList.add("fa-times-circle");
    logo.style.display = "block";
    logo.style.transition = "1.5s";
    logo.style.opacity = "1";

    mensage.style.display = "block";
    mensage.style.transition = "1.5s";
    mensage.style.opacity = "1";

    boton.style.display = "block";
    boton.style.transition = "1.5s";
    boton.style.opacity = "1";

    
    logo.classList.add("fa-check-circle");
    logo.classList.remove("fa-times-circle");
    mensage.innerHTML = "Preguntas Registradas exitosamente."
    logo.style.color = "rgb(125, 240, 125)"

    document.getElementById('logo-modal-1').style.display = "none";
    document.querySelector('.mensage-1').style.display = "none";
}



function completado() {
    logo.style.display = "block";
    logo.style.transition = "1.5s";
    logo.style.opacity = "1";

    mensage.style.display = "block";
    mensage.style.transition = "1.5s";
    mensage.style.opacity = "1";

    boton.style.display = "block";
    boton.style.transition = "1.5s";
    boton.style.opacity = "1";

    document.getElementById('logo-modal-1').style.display = "none";
    document.querySelector('.mensage-1').style.display = "none";
}

function registrado_incompleto() {
    // <i class="far fa-times-circle"></i>
    logo.style.display = "block";
    //cabiarmos el icono
    logo.classList.remove("fa-check-circle");
    logo.classList.add("fa-times-circle");
    logo.style.color = "grey"

    mensage.style.display = "block";
    // cambiamos el texto 
    mensage.innerHTML = "Seleccione al menos una pregunta."

    boton.style.display = "block";
    boton.style.transition = "1.5s";
    boton.style.opacity = "1";

    document.getElementById('logo-modal-1').style.display = "none";
    document.querySelector('.mensage-1').style.display = "none";
}

// autetificacion usuario
function user_usuario_autentificado() {
    logo.classList.remove("fa-check-circle");
    logo.classList.add("fa-times-circle");
    logo.style.display = "block";
    logo.style.transition = "1.5s";
    logo.style.opacity = "1";

    mensage.style.display = "block";
    mensage.style.transition = "1.5s";
    mensage.style.opacity = "1";

    boton.style.display = "block";
    boton.style.transition = "1.5s";
    boton.style.opacity = "1";

    
    logo.classList.add("fa-check-circle");
    logo.classList.remove("fa-times-circle");
    mensage.innerHTML = "Usuario autentificado correctamente."
    logo.style.color = "rgb(125, 240, 125)"

    document.getElementById('logo-modal-1').style.display = "none";
    document.querySelector('.mensage-1').style.display = "none";
    document.getElementById("cloce_modal").style.display = "none"
    document.getElementById("go_everywhere").style.display = "block"
}


function user_complete_campos() {
    // <i class="far fa-times-circle"></i>
    logo.style.display = "block";
    //cabiarmos el icono
    logo.classList.remove("fa-check-circle");
    logo.classList.add("fa-times-circle");
    logo.style.color = "grey"

    mensage.style.display = "block";
    // cambiamos el texto 
    mensage.innerHTML = "Porfavor ingrese todos los campos."

    boton.style.display = "block";
    boton.style.transition = "1.5s";
    boton.style.opacity = "1";

    document.getElementById('logo-modal-1').style.display = "none";
    document.querySelector('.mensage-1').style.display = "none";
    document.getElementById("cloce_modal").style.display = "block"
    document.getElementById("go_everywhere").style.display = "none"
}

function user_usuario_incorrecto() {
    // <i class="far fa-times-circle"></i>
    logo.style.display = "block";
    //cabiarmos el icono
    logo.classList.remove("fa-check-circle");
    logo.classList.add("fa-times-circle");
    logo.style.color = "grey"

    mensage.style.display = "block";
    // cambiamos el texto 
    mensage.innerHTML = "Datos incorrectos, por favor ingrese de nuevo."

    boton.style.display = "block";
    boton.style.transition = "1.5s";
    boton.style.opacity = "1";

    document.getElementById('logo-modal-1').style.display = "none";
    document.querySelector('.mensage-1').style.display = "none";
    document.getElementById("cloce_modal").style.display = "block"
    document.getElementById("go_everywhere").style.display = "none"
}

// usuario REGISTRO
function user_usuario_paswords_same() {
    // <i class="far fa-times-circle"></i>
    logo.style.display = "block";
    //cabiarmos el icono
    logo.classList.remove("fa-check-circle");
    logo.classList.add("fa-times-circle");
    logo.style.color = "grey"

    mensage.style.display = "block";
    // cambiamos el texto 
    mensage.innerHTML = "La contrasena no conicide!"

    boton.style.display = "block";
    boton.style.transition = "1.5s";
    boton.style.opacity = "1";

    document.getElementById('logo-modal-1').style.display = "none";
    document.querySelector('.mensage-1').style.display = "none";
}

function user_usuario_paswords_invalido() {
    // <i class="far fa-times-circle"></i>
    logo.style.display = "block";
    //cabiarmos el icono
    logo.classList.remove("fa-check-circle");
    logo.classList.add("fa-times-circle");
    logo.style.color = "grey"

    mensage.style.display = "block";
    // cambiamos el texto 
    mensage.innerHTML = "La contrasena debe tener al menos 6 caracteres!"

    boton.style.display = "block";
    boton.style.transition = "1.5s";
    boton.style.opacity = "1";

    document.getElementById('logo-modal-1').style.display = "none";
    document.querySelector('.mensage-1').style.display = "none";
}

function user_usuario_mail_invalido() {
    // <i class="far fa-times-circle"></i>
    logo.style.display = "block";
    //cabiarmos el icono
    logo.classList.remove("fa-check-circle");
    logo.classList.add("fa-times-circle");
    logo.style.color = "grey"

    mensage.style.display = "block";
    // cambiamos el texto 
    mensage.innerHTML = "Correo Invalido!"

    boton.style.display = "block";
    boton.style.transition = "1.5s";
    boton.style.opacity = "1";

    document.getElementById('logo-modal-1').style.display = "none";
    document.querySelector('.mensage-1').style.display = "none";
}

function user_usuario_registrado() {
    logo.classList.remove("fa-check-circle");
    logo.classList.add("fa-times-circle");
    logo.style.display = "block";
    logo.style.transition = "1.5s";
    logo.style.opacity = "1";

    mensage.style.display = "block";
    mensage.style.transition = "1.5s";
    mensage.style.opacity = "1";

    boton.style.display = "block";
    boton.style.transition = "1.5s";
    boton.style.opacity = "1";

    
    logo.classList.add("fa-check-circle");
    logo.classList.remove("fa-times-circle");
    mensage.innerHTML = "Usuario Resgistrado Corectamente."
    logo.style.color = "rgb(125, 240, 125)"

    document.getElementById('logo-modal-1').style.display = "none";
    document.querySelector('.mensage-1').style.display = "none";
}

// para registrar EMPRESA

function user_empresa_registrado() {
    logo.classList.remove("fa-check-circle");
    logo.classList.add("fa-times-circle");
    logo.style.display = "block";
    logo.style.transition = "1.5s";
    logo.style.opacity = "1";

    mensage.style.display = "block";
    mensage.style.transition = "1.5s";
    mensage.style.opacity = "1";

    boton.style.display = "block";
    boton.style.transition = "1.5s";
    boton.style.opacity = "1";

    
    logo.classList.add("fa-check-circle");
    logo.classList.remove("fa-times-circle");
    mensage.innerHTML = "Empresa Resgistrada Correctamente."
    logo.style.color = "rgb(125, 240, 125)"

    document.getElementById('logo-modal-1').style.display = "none";
    document.querySelector('.mensage-1').style.display = "none";
}

function user_comfirm_empresa() {
    logo.classList.remove("fa-check-circle");
    // logo.classList.add("fa-times-circle");
    logo.style.display = "block";

    mensage.style.display = "block";

    boton.style.display = "block";

    
    // logo.classList.add("fa-check-circle");
    logo.classList.remove("fa-times-circle");
    mensage.innerHTML = "Porfavor registre su empresa primero."
    logo.style.color = "rgb(125, 240, 125)"

    document.getElementById('logo-modal-1').style.display = "none";
    document.querySelector('.mensage-1').style.display = "none";
}

// modal de acceptacion de terminos
// --------------------- terminos de aceptacion
const modal_terminos_aceptacion = document.getElementById('modal-aceptacion-terminos-id');
const modar_terminos = document.getElementById('cotendor-modal-terminos-id')
function mostrar_modal_acptar_terminos(){

    modal_terminos_aceptacion.style.visibility = "visible";
    modal_terminos_aceptacion.style.opacity = "1";
    modar_terminos.style.transform = "translateY(0%)"
}


function close_modal(){
    modal_terminos_aceptacion.style.visibility = "hidden";
    modal_terminos_aceptacion.style.opacity = "0";
    modar_terminos.style.transform = "translateY(-30%)"
}

// actualizadr datos 
function user_actualizando_usuario() {
    logo.classList.remove("fa-check-circle");
    logo.classList.add("fa-times-circle");
    logo.style.display = "block";

    mensage.style.display = "block";

    boton.style.display = "block";
    boton.style.transition = "1.5s";
    boton.style.opacity = "1";

    
    logo.classList.add("fa-check-circle");
    logo.classList.remove("fa-times-circle");
    mensage.innerHTML = "Datos actualizados Correctamente."
    logo.style.color = "rgb(125, 240, 125)"

    document.getElementById('logo-modal-1').style.display = "none";
    document.querySelector('.mensage-1').style.display = "none";
    document.getElementById("cloce_modal").style.display = "none"
    document.getElementById("go_everywhere").style.display = "block"
}
function user_contrasena_no_coincide() {// contrasena no coindie
    // <i class="far fa-times-circle"></i>
    logo.style.display = "block";
    //cabiarmos el icono
    logo.classList.remove("fa-check-circle");
    logo.classList.add("fa-times-circle");
    logo.style.color = "grey"

    mensage.style.display = "block";
    // cambiamos el texto 
    mensage.innerHTML = "Las contraseñas no coinciden."

    boton.style.display = "block";
    boton.style.transition = "1.5s";
    boton.style.opacity = "1";

    document.getElementById('logo-modal-1').style.display = "none";
    document.querySelector('.mensage-1').style.display = "none";
}