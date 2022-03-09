const canasta = [];
const IVA = 1.21;

class Productos{
    constructor (nombreProducto,cantidad,precioUnidad){
        this.nombreProducto=nombreProducto,
        this.cantidad= cantidad
        this.precioUnidad = precioUnidad;
    }
   precioFinal (){
        let resultadoPrecioFinal = cantidad * precioUnidad * IVA;
        return resultadoPrecioFinal;
    }
}

function calcularCarrito (){
    nombreProducto = prompt('Ingrese el nombre del producto');
    cantidad = parseFloat(prompt('Ingrese la cantidad de productos a adquirir'));
    precioUnidad = parseFloat(prompt('Ingrese el precio de la unidad a adquirir'));

    totalCarrito = new Productos (nombreProducto,cantidad,precioUnidad);
    canasta.push(totalCarrito);
    alert('Usted debe abonar:' + totalCarrito.precioFinal());
    console.table(canasta);

}

