document.addEventListener("DOMContentLoaded", function () {
    document.querySelector("#btn-agregar-nota").addEventListener("click", agregarNota);
    cargarNotas()
});

const notas = JSON.parse(localStorage.getItem('notas')) || [];

let idNota;

//Si no hay notas guardadas asigna la id 0, sino toma la id del ultimo objeto y le suma 1
if (notas.length === 0) {
    idNota = 0
} else {
    idNota = notas[notas.length - 1].id + 1
};

function agregarNota() {

    let titulo = document.querySelector("#txt-titulo-nota");
    let contenido = document.querySelector("#txt-contenido-nota");

    if (titulo.value.length < 1 || contenido.value.length < 1) {
        alert("Por favor, rellena todos los campos")
    } else {
        let nuevaNota = {
            titulo: titulo.value,
            contenido: contenido.value,
            id: "nota" + idNota
        };

        notas.push(nuevaNota);

        localStorage.setItem('notas', JSON.stringify(notas));

        idNota++

        titulo.value = ""
        contenido.value = ""

        cargarNotas()
    };
};

function cargarNotas() {

    let contenidoHtml = ""

    document.querySelector("#container-notas").innerHTML = contenidoHtml

    for (let i = 0; i < notas.length; i++) {
        let notaActual = notas[i]

        contenidoHtml += `
        <a class="nota-link" href="#" data-bs-toggle="modal" id="nota${notaActual.id}" data-bs-target="#modal${notaActual.id}">
        <div class="nota">
            <div class="contenido">
                <h5>${notaActual.titulo}</h5>
                <p>${notaActual.contenido}</p>
            </div>
        </div>
        </a>

        <div class="modal fade" id="modal${notaActual.id}" tabindex="-1">
        <div class="modal-dialog">
            <div class="modal-content">
            <div class="modal-header">
                <h1 class="modal-title fs-5">${notaActual.titulo}</h1>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <p>${notaActual.contenido}</p>
            </div>
            <div class="modal-footer">
                <button class="button-eliminar" id="${notaActual.id}" onclick="eliminarNota(this.id)" data-bs-dismiss="modal"><i class="fa fa-trash-o"></i></button>
            </div>
            </div>
        </div>
        </div>
    `
    }

    document.querySelector("#container-notas").innerHTML = contenidoHtml
}

function eliminarNota(id) {
    for (let i = 0; i < notas.length; i++) {
        let notaActual = notas[i]

        if (notaActual.id === id) {
            notas.splice(i, 1)
        }
    }
    localStorage.setItem('notas', JSON.stringify(notas));
    cargarNotas();
}
