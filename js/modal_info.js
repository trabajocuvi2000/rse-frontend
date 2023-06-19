setTimeout(() => {
    const boton_mostrar_modal = document.querySelectorAll(".mostrar_modal");
    //obtenemos los datos de las filas de estadnares
    const mostrar_modal_info = function (evento) {
        document.getElementById("modal-info-id").style.visibility = "visible";
        document.getElementById("modal-info-id").style.opacity = "1";
        //document.getElementById("cotendor-modal-info-id").transform = "translateY(0%)";

    }
    // boton_mostrar_modal es un arreglo así que lo recorremos
    boton_mostrar_modal.forEach(boton => {
        //Agregar listener
        boton.addEventListener("click", mostrar_modal_info);
    });



    document.getElementById("cerrar-modal").addEventListener('click', () => {
        document.getElementById("modal-info-id").style.visibility = "hidden";
        document.getElementById("modal-info-id").style.opacity = "0";
        //document.getElementById("cotendor-modal-info-id").transform = "translateY(-30%)";
    })

}, 1500)