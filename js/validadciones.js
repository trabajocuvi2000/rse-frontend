const formulario = document.getElementById('formulario');
const inputs = document.querySelectorAll('#formulario input');


const expresiones = {
    usuario: /^[a-zA-Z0-9\_\-]{4,16}$/, // Letras, numeros, guion y guion_bajo
    nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
    password: /^.{6,12}$/, // 4 a 12 digitos.
    correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
    telefono: /^\d{7,14}$/, // 7 a 14 numeros.
    numero: /^([0-9])*$/,
    letras_numeros: /^[A-Za-z0-9\s]+$/,
    pagina_web: /^$/, // 4 a 12 digitos.
}

const campos = {
    usuario: false,
    nombre: false,
    password: false,
    correo: false,
    telefono: false,
    numero: false,
}

const validarFormulario = (e) => {
    // console.log(e.target.name)
    switch (e.target.name) {
        case "nombre-empresa":
            validarCampo(expresiones.nombre, e.target, 'nombre-empresa');
            break;
        case "pagina-web":
            // validarCampo(expresiones.pagina_web, e.target, 'pagina-web');
            break;
        case "direccion-operacion":
            // validarCampo(expresiones.letras_numeros, e.target, 'direccion-operacion');
            break;
        case "numero-sedes": // mal
            validarCampo(expresiones.numero, e.target, 'numero-sedes');
            break;
        case "numero-empleados-empresa":
            validarCampo(expresiones.numero, e.target, 'numero-empleados-empresa');
            break;
        case "ruc-empresa":
            validarCampo(expresiones.letras_numeros, e.target, 'ruc-empresa');
            break;
        case "estimado-ingresos":
            validarCampo(expresiones.numero, e.target, 'estimado-ingresos');
            break;
        // __________-
        case "nombre":
            validarCampo(expresiones.nombre, e.target, 'nombre');
            break;
        case "apellido":
            validarCampo(expresiones.nombre, e.target, 'apellido');
            break;
        case "usuario":
            validarCampo(expresiones.usuario, e.target, 'usuario');
            break;
        case "correo":
            validarCampo(expresiones.correo, e.target, 'correo');
            break;
        case "password":
            validarCampo(expresiones.password, e.target, 'password');
            validarPassword2();
            break;
        case "password2":
            validarPassword2();
            break;

    }
}

const validarCampo = (expresion, input, campo) => {
    if (expresion.test(input.value)) {
        document.getElementById(`grupo_${campo}`).classList.remove('formulario__grupo-incorrecto');
        document.getElementById(`grupo_${campo}`).classList.add('formulario__grupo-correcto');
        document.querySelector(`#grupo_${campo} i`).classList.add('fa-check-circle');
        document.querySelector(`#grupo_${campo} i`).classList.remove('fa-times-circle');
        document.querySelector(`#grupo_${campo} .formulario__input-error`).classList.remove('formulario__input-error-activo');
        campos[campo] = true;
    } else {
        document.getElementById(`grupo_${campo}`).classList.add('formulario__grupo-incorrecto');
        document.getElementById(`grupo_${campo}`).classList.remove('formulario__grupo-correcto');
        document.querySelector(`#grupo_${campo} i`).classList.add('fa-times-circle');
        document.querySelector(`#grupo_${campo} i`).classList.remove('fa-check-circle');
        document.querySelector(`#grupo_${campo} .formulario__input-error`).classList.add('formulario__input-error-activo');
        campos[campo] = false;
    }
}

const validarPassword2 = () => {
    const inputPassword1 = document.getElementById('contrasena-id');
    const inputPassword2 = document.getElementById('contrasena-confir');

    if (inputPassword1.value !== inputPassword2.value) {
        document.getElementById(`grupo_password2`).classList.add('formulario__grupo-incorrecto');
        document.getElementById(`grupo_password2`).classList.remove('formulario__grupo-correcto');
        document.querySelector(`#grupo_password2 i`).classList.add('fa-times-circle');
        document.querySelector(`#grupo_password2 i`).classList.remove('fa-check-circle');
        document.querySelector(`#grupo_password2 .formulario__input-error`).classList.add('formulario__input-error-activo');
        campos['password'] = false;
    } else {
        document.getElementById(`grupo_password2`).classList.remove('formulario__grupo-incorrecto');
        document.getElementById(`grupo_password2`).classList.add('formulario__grupo-correcto');
        document.querySelector(`#grupo_password2 i`).classList.remove('fa-times-circle');
        document.querySelector(`#grupo_password2 i`).classList.add('fa-check-circle');
        document.querySelector(`#grupo_password2 .formulario__input-error`).classList.remove('formulario__input-error-activo');
        campos['password'] = true;
    }
}

inputs.forEach((input) => {
    input.addEventListener('keyup', validarFormulario);
    input.addEventListener('blur', validarFormulario);
});


const formulario_user = document.getElementById('formulario_user');
const inputs_user = document.querySelectorAll('#formulario_user input');

inputs_user.forEach((input) => {
    input.addEventListener('keyup', validarFormulario);
    input.addEventListener('blur', validarFormulario);
});