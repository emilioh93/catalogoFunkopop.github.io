export function validarCodigo(codigo) {
    console.log("Se ejecutó onblur de código");
    if (codigo.value.trim() === "") {
        codigo.className = "form-control is-invalid";
        return false;
    } else {
        codigo.className = "form-control is-valid";
        return true;
    }
}

export function validarNombre(nombre) {
    console.log("Se ejecutó onblur de nombre");
    if (nombre.value.trim() === "") {
        nombre.className = "form-control is-invalid";
        return false;
    } else {
        nombre.className = "form-control is-valid";
        return true;
    }
}

export function validarSerie(serie) {
    console.log("Se ejecutó onblur de numero de serie");
    if (serie.value.trim() === "") {
        serie.className = "form-control is-invalid";
        return false;
    } else {
        serie.className = "form-control is-valid";
        return true;
    }
}

export function validarCategoria(categoria) {
    console.log("Se ejecutó onblur de categoria");
    if (categoria.value.trim() === "") {
        categoria.className = "form-control is-invalid";
        return false;
    } else {
        categoria.className = "form-control is-valid";
        return true;
    }
}

export function validarDescripcion(descripcion) {
    console.log("Se ejecutó onblur de descripcion");
    if (descripcion.value.trim() === "") {
        descripcion.className = "form-control is-invalid";
        return false;
    } else {
        descripcion.className = "form-control is-valid";
        return true;
    }
}

export function validarImagen(imagen) {
    console.log("Se ejecutó onblur de imagen");
    if (imagen.value.trim() === "") {
        imagen.className = "form-control is-invalid";
        return false;
    } else {
        imagen.className = "form-control is-valid";
        return true;
    }
}

// FUNCIÓN VALIDAR GENERAL

export function validarGeneral() {
    console.log("desde validar gral");
    if (validarCodigo(document.getElementById("codigo")) &&
        validarNombre(document.getElementById("nombre")) &&
        validarSerie(document.getElementById("numSerie")) &&
        validarCategoria(document.getElementById("categoria")) &&
        validarDescripcion(document.getElementById("descripcion")) &&
        validarImagen(document.getElementById("imagen"))) {

        return true;
    }
}