const canasta = [];
const IVA = 1.21;



function timedRefresh(timeoutPeriod) {
	setTimeout("location.reload(true);",timeoutPeriod);
}


// Informacion de Productos que se populara Dinamicamente

var informacionDeProductos;

    fetch("https://natacccha.github.io/meowcafeteria-javascript/javascript/productos.json")
    .then((response)=> response.json())
    .then(data => {
        setTimeout(()=>{
            informacionDeProductos = data; 
            agregarProductosDinamicos();
        },3000)
      });

function agregarProductosDinamicos() {
    document.getElementById("loader").style.display = "none";

    const cardProductos = document.getElementById('cardProductos');
     for (articulos of informacionDeProductos) {
        const estructura = `<span><div class='box'><img src=${articulos.imagenURL}></div><p class='producto'>${articulos.titulo}</p><p class='precio'>$${articulos.Precio}</p><a href="javascript:botonComprar(${articulos.id})" class='botonComprar'id=${articulos.id} >Agregar al Carrito</a></span>`
        cardProductos.innerHTML += estructura;
    } 
}


//Aqui lo que hacemos es identificar en que producto hizo click el cliente y su carrito.


function botonComprar(boton){
    for (productos of informacionDeProductos) {
        if (productos.id === boton.id) {
            canasta.push(productos);
        }
    }
    agregarFilas();
    Toastify({
        text: "✔ Agregado al Carrito 🐶😺 ",
        duration: 3000,
        newWindow: true,
        close: true,
        gravity: "top", 
        position: "right", 
        stopOnFocus: true, 
        style: {
            background: "grey",
        },
        onClick: function () {} 
    }).showToast();
}



// Interaccion con el HTML (DOM)
function agregarFilas() {
    const tabladeProductos = document.getElementById('tableBody');
    while (tabladeProductos.hasChildNodes()) {
        tabladeProductos.removeChild(tabladeProductos.firstChild);
    }
    for (var i = 0; i < canasta.length; i++) {
        var datos = canasta[i];
        const td = `<tr><td>${i}</td><td>${datos.titulo}</td><td> 1  </td><td>  ${datos.Precio} </td><td><button onclick='borradoIndividualProdu(${i})' id=${i} class='borradoIndividual'>❌</button></td></tr> `
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
        while(canasta.length > 0) {
            canasta.pop();
        }
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
   
    
    carritoVacio= localStorage.removeItem("CarritoAbandonado");
        if(carritoVacio===undefined){
            Swal.fire({
                title: 'Tu carrito fue borrado! 😿',
                text: 'Se refrescara la pagina automaticamente',
                imageUrl: 'images/icono.jpg',
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


function borradoIndividualProdu(boton){
    canasta.splice(parseInt(boton),1);
    guardarCarrito();
    recuperoCarrito();
}