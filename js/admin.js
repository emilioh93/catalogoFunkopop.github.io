import { Funko } from "./funkoClass.js";
import { validarGeneral, validarCodigo, validarNombre, validarSerie, validarCategoria, validarDescripcion, validarImagen } from "./validaciones.js";

let listaFunkopop = [];
const modalProducto = new bootstrap.Modal(document.getElementById('modalFunkopop'));
let btnAgregar = document.getElementById("btnAgregar");
btnAgregar.addEventListener("click", function() {
    limpiarFormulario();
    modalProducto.show();
});

// Variable bandera, la cual me ayuda a decidir cuando tengo que modificar y cuando crear Funkopop
// modificarFunkopop = true; estoy modificando un Funkopop
// modificarFunkopop = false; estoy agregando un Funkopop
let modificarFunkopop = false;

// Llamo a la función que lee datos del local storage
leerDatos();

function agregarFunkopop() {
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
    // Cambio el estado de mi variable booleana
    modificarFunkopop = false;
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
    // Recorro todo el arreglo con un "for in"
    for (let i in _listaFunkopop) {
        filas = `<tr>
            <td>${_listaFunkopop[i].codigo}</td>
            <td>${_listaFunkopop[i].nombre}</td>
            <td>${_listaFunkopop[i].numSerie}</td>
            <td>${_listaFunkopop[i].categoria}</td>
            <td>${_listaFunkopop[i].descripcion}</td>
            <td>${_listaFunkopop[i].imagen}</td>
            <td>
                <button class="btn btn-warning" onclick="prepararFunkopop(this)" id="${_listaFunkopop[i].codigo}">Editar</button>
                <button class="btn btn-danger" onclick="eliminarFunkopop(this)" id="${_listaFunkopop[i].codigo}">Borrar</button>
            </td>
        </tr>`;
        // Agrego la fila al padre
        tabla.innerHTML += filas;
    }
}

window.eliminarFunkopop = function(boton) {
    console.log(boton.id);
    Swal.fire({
        title: '¿Está seguro que desea eliminar el Funkopop?',
        text: "Al eliminarlo, no podrás recuperarlo.",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#666',
        confirmButtonText: '¡Eliminar!',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            // Agrego lógica para eliminar Funkopop
            // let funkopopFiltrado = listaFunkopop.filter(function(producto) {
            //     return producto.codigo != boton.id
            // });
            let funkopopFiltrado = listaFunkopop.filter((producto) => producto.codigo != boton.id);

            listaFunkopop = funkopopFiltrado;

            console.log(funkopopFiltrado);
            // Guardo datos en LS
            localStorage.setItem("listaFunkoKey", JSON.stringify(funkopopFiltrado));
            // Cargar los nuevos datos
            leerDatos();

            Swal.fire(
                '¡Eliminado!',
                'Su Funkopop ha sido eliminado.',
                'success'
            )
        }
    })
}

window.prepararFunkopop = function(boton) {
    console.log(boton);
    // Busco el Funkopop seleccionado
    let funkopopEncontrado = listaFunkopop.find((producto) => { return producto.codigo === boton.id });

    console.log(funkopopEncontrado);
    // Completo con los datos, todos los inputs de mi formulario
    document.getElementById("codigo").value = funkopopEncontrado.codigo;
    document.getElementById("nombre").value = funkopopEncontrado.nombre;
    document.getElementById("numSerie").value = funkopopEncontrado.numSerie;
    document.getElementById("categoria").value = funkopopEncontrado.categoria;
    document.getElementById("descripcion").value = funkopopEncontrado.descripcion;
    document.getElementById("imagen").value = funkopopEncontrado.imagen;
    // Cambio el estado de mi variable booleana
    modificarFunkopop = true;
    // Muestro ventana modal
    modalProducto.show();
}

window.guardarFunko = function(event) {
    event.preventDefault();
    if (modificarFunkopop) {
        // Modifico Funkopop existente
        modificarFunkoExistente();
    } else {
        // Agrego Funkopop nuevo
        agregarFunkopop();
    }
}

function modificarFunkoExistente() {
    // Validar nuevamente los datos ingresados
    // Tomo los valores modificados del formulario
    let codigo = document.getElementById("codigo").value;
    let nombre = document.getElementById("nombre").value;
    let numSerie = document.getElementById("numSerie").value;
    let categoria = document.getElementById("categoria").value;
    let descripcion = document.getElementById("descripcion").value;
    let imagen = document.getElementById("imagen").value;
    // Busco el objeto y modifico sus datos
    for (let i in listaFunkopop) {
        if (listaFunkopop[i].codigo === codigo) {
            listaFunkopop[i].nombre = nombre;
            listaFunkopop[i].categoria = categoria;
            listaFunkopop[i].numSerie = numSerie;
            listaFunkopop[i].descripcion = descripcion;
            listaFunkopop[i].imagen = imagen;
        }
    }
    // Actualizo LS
    localStorage.setItem("listaFunkoKey", JSON.stringify(listaFunkopop));
    // Muestro alerta al usuario
    Swal.fire(
        '¡Funkopop modificado!',
        'El Funkopop se modificó correctamente.',
        'success'
    );
    // Dibujo datos actualizados en tabla
    leerDatos();
    // Cerrar ventana modal
    modalProducto.hide();
}