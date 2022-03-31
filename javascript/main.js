const canasta = [];
const IVA = 1.21;


function timedRefresh(timeoutPeriod) {
	setTimeout("location.reload(true);",timeoutPeriod);
}


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
        Toastify({
            text: "✔ Agregado al Carrito 🐶😺 ",
            duration: 3000,
            newWindow: true,
            close: true,
            gravity: "top", // `top` or `bottom`
            position: "right", // `left`, `center` or `right`
            stopOnFocus: true, // Prevents dismissing of toast on hover
            style: {
                background: "grey",
            },
            onClick: function () {} // Callback after click
        }).showToast();
    })
})


// Interaccion con el HTML (DOM)
function agregarFilas() {
    const tabladeProductos = document.getElementById('tableBody');
    while (tabladeProductos.hasChildNodes()) {
        tabladeProductos.removeChild(tabladeProductos.firstChild);
    }
/*     for (datos of canasta) {
        const td = "<tr><td>" + datos.titulo + "</td><td>" + 1 + "</td><td>" + datos.Precio + "</td></tr>" 
        tabladeProductos.innerHTML += td;

    } */

    for (var i = 0; i < canasta.length; i++) {
        var datos = canasta[i];
        const td = "<tr><td>"+i+"</td><td>" + datos.titulo + "</td><td>" + 1 + "</td><td>" + datos.Precio + "</td><td><button id='"+i+"' class='borradoIndividual'>❌</button></td></tr>" 
        tabladeProductos.innerHTML += td;
     }

    guardarCarrito();
}


//Storage en memoria

const guardarCarrito = () => {
    localStorage.setItem("CarritoAbandonado", JSON.stringify(canasta));
}

//Persistencia de datos

const recuperoCarrito = () => {
    var recuperoDeCarrito = localStorage.getItem("CarritoAbandonado");
    var jsonParseCarrito = JSON.parse(recuperoDeCarrito);
    if(jsonParseCarrito != null ){
        for (recupero of JSON.parse(recuperoDeCarrito)) {
            canasta.push(recupero);
        }
        agregarFilas();
    }
    
}

recuperoCarrito();

//Vaciar Carrito

var carritoVacio = [];



function borradoDeCarrito(){
    alert('toco el boton');
    
    carritoVacio= localStorage.removeItem("CarritoAbandonado");
        if(carritoVacio===undefined){
            Swal.fire({
                title: 'Tu carrito fue borrado! 😿',
                text: 'Se refrescara la pagina automaticamente',
                imageUrl: 'images/icono.JPG',
                confirmButtonText: 'Ok!'
              })
            timedRefresh(3000); // Se refresca la pagina
        }
}

const eliminarProductos = document.getElementById('botonVaciar');
eliminarProductos.addEventListener('click', () => {
        borradoDeCarrito();

})

//Borrado individual de productos

const borradoIndividual = document.querySelectorAll('.borradoIndividual');
borradoIndividual.forEach(boton => {
    boton.addEventListener('click', () => {
        var botonId = boton.getAttribute("id");
        canasta.splice(parseInt(botonId),1);
        location.reload()
        guardarCarrito();
    })
})


