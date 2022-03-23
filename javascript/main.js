const canasta = [];
const IVA = 1.21;


// Informacion de Productos que se populara Dinamicamente

const informacionDeProductos = [{
        "titulo": "Peluche Elefante",
        "Precio": 560,
        "imagenURL": 'images/juguete1.jpg',
        "id": "pelucheElefante"
    },
    {
        "titulo": "Peluche Ardillita",
        "Precio": 520,
        "imagenURL": 'images/juguete2.jpg',
        "id": "pelucheArdillita"

    },
    {
        "titulo": "Gatito Pelota",
        "Precio": 1300,
        "imagenURL": 'images/juguete3.jpg',
        "id": "gatitoPelota"

    },
    {
        "titulo": "Varita Gallina",
        "Precio": 700,
        "imagenURL": 'images/juguete4.jpg',
        "id": "varitaGallina"

    },
    {
        "titulo": "Raton Elastico",
        "Precio": 900,
        "imagenURL": 'images/juguete5.jpg',
        "id": "ratonElastico"

    },
    {
        "titulo": "Pelota de Goma",
        "Precio": 1100,
        "imagenURL": 'images/juguete6.jpg',
        "id": "pelotaGoma"

    },
    {
        "titulo": "Ratoncito a Colores",
        "Precio": 990,
        "imagenURL": 'images/juguete7.jpg',
        "id": "ratoncitoColores"

    },
    {
        "titulo": "Patito Cascabel",
        "Precio": 1200,
        "imagenURL": 'images/juguete8.jpg',
        "id": "patitoCascabel"

    },
    {
        "titulo": "Ratoncito Catnip",
        "Precio": 1000,
        "imagenURL": 'images/juguete9.jpg',
        "id": "ratoncitoCatnip"

    },
    {
        "titulo": "Caballito de Mar",
        "Precio": 1200,
        "imagenURL": 'images/juguete10.jpg',
        "id": "caballitoMar"

    },
    {
        "titulo": "Varita para Gatos",
        "Precio": 1250,
        "imagenURL": 'images/juguete11.jpg',
        "id": "varitaGatos"

    },
    {
        "titulo": "Cerdito de Goma",
        "Precio": 1500,
        "imagenURL": 'images/juguete12.jpg',
        "id": "cerditoGoma"

    },

]


function agregarProductosDinamicos() {
    const cardProductos = document.getElementById('cardProductos');
    for (articulos of informacionDeProductos) {
        const estructura = `<span><div class='box'><img src=${articulos.imagenURL}></div><p class='producto'>${articulos.titulo}</p><p class='precio'>$${articulos.Precio}</p><a class='botonComprar'id=${articulos.id} >Agregar al Carrito</a></span>`
        cardProductos.innerHTML += estructura;

    }
}
agregarProductosDinamicos();


//Aqui lo que hacemos es identificar en que producto hizo click el cliente y su carrito.

const botonDeComprar = document.querySelectorAll('.botonComprar');
botonDeComprar.forEach(boton => {
    boton.addEventListener('click', () => {
        var botonId = boton.getAttribute("id");
        for (productos of informacionDeProductos) {
            if (productos.id === botonId) {
                canasta.push(productos);
            }
        }
        agregarFilas();
        alert('🐶Producto Agregado a tu carrito 😺' );
    })
})


// Interaccion con el HTML (DOM)
function agregarFilas() {
    const tabladeProductos = document.getElementById('tableBody');
    while (tabladeProductos.hasChildNodes()) {
        tabladeProductos.removeChild(tabladeProductos.firstChild);
      }
    for (datos of canasta) {
        const td = "<tr><td>" + datos.titulo + "</td><td>" + 1 + "</td><td>" + datos.Precio+ "</td></tr>"
        tabladeProductos.innerHTML += td;
        
    }
    guardarCarrito();
} 



//Storage en memoria

const guardarCarrito = ()=> {
    localStorage.setItem("CarritoAbandonado",JSON.stringify(canasta));
}

//Persistencia de datos

const recuperoCarrito = ()=> {
    var recuperoDeCarrito = localStorage.getItem("CarritoAbandonado");
    for(recupero of JSON.parse(recuperoDeCarrito)){
        canasta.push(recupero);
    }
    agregarFilas();
}

recuperoCarrito()