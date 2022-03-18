const canasta = [];
const IVA = 1.21;

class Productos {
    constructor(nombreProducto, cantidad, precioUnidad) {
        this.nombreProducto = nombreProducto,
            this.cantidad = cantidad
        this.precioUnidad = precioUnidad;
    }
    precioFinal() {
        let resultadoPrecioFinal = cantidad * precioUnidad * IVA;
        return resultadoPrecioFinal;
    }
}

function calcularCarrito() {
    do {
        nombreProducto = prompt('Ingrese el nombre del producto');
        cantidad = parseFloat(prompt('Ingrese la cantidad de productos a adquirir'));
        precioUnidad = parseFloat(prompt('Ingrese el precio de la unidad a adquirir'));

        item = new Productos(nombreProducto, cantidad, precioUnidad);
        canasta.push(item);
        nuevaCompra = prompt('Si quiere comprar un nuevo producto ingrese SI o NO');
    }
    while (nuevaCompra == "SI" || nuevaCompra == "si");
    console.table(canasta);

    const totalPorProducto = canasta.map(i => i.cantidad * i.precioUnidad * IVA);
    
    const totalAPagar = totalPorProducto.reduce((a,b)=> a+b);
    console.log('Su total a pagar es: $' + totalAPagar);

    agregarFilas();
}

// Interaccion con el HTML


function agregarFilas(){
    const tabladeProductos = document.getElementById('tableBody');
    for(datos of canasta){
        const td = "<tr><td>"+datos.nombreProducto+"</td><td>"+datos.cantidad+"</td><td>"+datos.precioUnidad+"</td></tr>"
        tabladeProductos.innerHTML+=td;
    }

    

}





