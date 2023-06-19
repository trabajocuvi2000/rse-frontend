async function getToken() {
    const url = `${link_service}consultas/getTokenUnique`;
    console.log(url)
    const respuesta = await fetch(url)
    const json = await respuesta.json()
    return json;
}

(async function () {
    const token = await getToken();
    localStorage.token = token.token;
})()

async function getDatosUsuarios() {
    const respuesta = await fetch(`${link_service}consultas/usuarios`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': localStorage.token,
        }
    })
    const json = await respuesta.json()

    return json;
}

(async function () {
    const datos_usuario = await getDatosUsuarios();
    console.log("datos_usuario")
})()

function registrar_encuestado(){
    window.open(`${url_global_pagina}registrar_encuestado${extencion}`, '_blank');
}

function loging_encuestado(){
    window.open(`${url_global_pagina}login_encuestado${extencion}`, '_blank');
}