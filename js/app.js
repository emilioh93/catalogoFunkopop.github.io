// Variable que almacena los datos del LS
let listaFunkopop = [];
leerFunkopop();

function leerFunkopop() {
    if (localStorage.length > 0) {
        listaFunkopop = JSON.parse(localStorage.getItem("listaFunkoKey"));
        // Borro datos de la fila de cards
        let filaCards = document.getElementById("filaCards");
        filaCards.innerHTML = "";

        // Dibujo cada columna con los datos de los Funkopop
        for (let i in listaFunkopop) {
            let columna = `<div class="col-md-3 col-sm-6 my-2">
            <div class="card w-100 shadow">
                <img src="img/productos/${listaFunkopop[i].imagen}" class="card-img-top" alt="imagen de Funkopop">
                <div class="card-body">
                    <h5 class="card-title">${listaFunkopop[i].nombre}</h5>
                    <p class="card-text">${listaFunkopop[i].descripcion}</p>
                    <a href="#" class="btn btn-primary disabled">Ver más</a>
                </div>
            </div>
        </div>`;

            // Agrego las columnas a su elemento padre
            filaCards.innerHTML += columna;
        }
    }
}