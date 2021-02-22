import { Funko } from "./funkoClass.js";

let nuevoFunkopop = new Funko(1, "batman", "as6d54", "DC", "asdasdsadsa", "sadasdsa");
console.log("🚀 ~ file: admin.js ~ line 13 ~ nuevoFunkopop", nuevoFunkopop);

window.agregarFunkopop = function() {
    event.preventDefault();
    console.log("Dentro de f agregarFunkopop");
}