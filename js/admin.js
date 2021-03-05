import { Funko } from "./funkoClass.js";
import { validarGeneral } from "./validaciones.js";

let listaFunkopop = [];
const modalProducto = new bootstrap.Modal(document.getElementById('modalFunkopop'));
let btnAgregar = document.getElementById("btnAgregar");
btnAgregar.addEventListener("click", function() {
    modalProducto.show();
});

// Llamo a la función que lee datos del local storage
leerDatos();

window.agregarFunkopop = function(event) {
    event.preventDefault();
    console.log("Dentro de f agregarFunkopop");
    let nuevoFunkopop;

    if (validarGeneral()) {
        let codigo = document.getElementById("codigo").value;
        let nombre = document.getElementById("nombre").value;
        let numSerie = document.getElementById("numSerie").value;
        let categoria = document.getElementById("categoria").value;
        let descripcion = document.getElementById("descripcion").value;
        let imagen = document.getElementById("imagen").value;
        // Creo el nuevo producto funkopop
        nuevoFunkopop = new Funko(codigo, nombre, numSerie, categoria, descripcion, imagen);
        // Agrego el nuevo funkopop a la lista
        console.log(nuevoFunkopop);
        listaFunkopop.push(nuevoFunkopop);
        // Guardo lista de funkos en local storage
        localStorage.setItem("listaFunkoKey", JSON.stringify(listaFunkopop));
        // Limpio formulario
        limpiarFormulario();
        // Envío mensaje al usuario que el producto fue creado
        Swal.fire(
            '¡Nuevo Funkopop!',
            'El Funkopop se agregó correctamente.',
            'success'
        );
        // Cierro la ventana modal
        leerDatos();
        modalProducto.hide();
    } else {
        document.getElementById("alert").className = "alert alert-danger text-center";
        document.getElementById("alert").innerHTML = "Debe corregir los datos cargados";
    }
}

function limpiarFormulario() {
    document.getElementById("formFunkopop").reset();
}

function leerDatos() {
    // Esta función se encargará de leer los datos del local storage
    if (localStorage.length > 0) {
        // Traigo los datos del local storage
        let _listaFunkopop = JSON.parse(localStorage.getItem("listaFunkoKey"));
        console.log(_listaFunkopop);

        // Pregunto si mi arreglo listaFunkopop tiene datos
        if (listaFunkopop.length === 0) {
            listaFunkopop = _listaFunkopop
        }

        dibujarDatosEnTabla(_listaFunkopop);
    }
}

function dibujarDatosEnTabla(_listaFunkopop) {
    // Esta función agregará los datos del LS en cada fila de la tabla
    let tabla = document.getElementById("tablaFunkopop");
    // Borro filas extras (limpio)
    tabla.innerHTML = "";
    let filas;

    // for (let i = 0; i < _listaFunkopop.length; i++) {}
    // Recorro todo el arreglo con un for in
    for (let i in _listaFunkopop) {
        filas = `<tr>
            <td>${_listaFunkopop[i].codigo}</td>
            <td>${_listaFunkopop[i].nombre}</td>
            <td>${_listaFunkopop[i].numSerie}</td>
            <td>${_listaFunkopop[i].categoria}</td>
            <td>${_listaFunkopop[i].descripcion}</td>
            <td>${_listaFunkopop[i].imagen}</td>
            <td>
                <button class="btn btn-warning">Editar</button>
                <button class="btn btn-danger" onclick="eliminarFunkopop(this)">Borrar</button>
            </td>
        </tr>`;
        // Agrego la fila al padre
        tabla.innerHTML += filas;
    }
}

window.eliminarFunkopop = function(boton) {
    console.log("Dentro de la función Funkopop");

}