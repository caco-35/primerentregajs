let total = 0;
let opcion;
let carrito = [];
const error = 'Ingrese una opcion valida.'
let productos = [
    { id: 1, nombre: "Remera", precio: 550 },
    { id: 2, nombre: "Short", precio: 600 },
    { id: 3, nombre: "Vaquero", precio: 1100 },
    { id: 4, nombre: "Camisa", precio: 650 },
    { id: 5, nombre: "Musculosa", precio: 450 },
    { id: 6, nombre: "Maya", precio: 550 },
    { id: 7, nombre: "Gorra", precio: 200 },
    { id: 8, nombre: "Protector solar", precio: 400 }
];

const listarProductos = () => {
    let lista = 'Seleccione el producto: \n\n';
    for ( let i = 0; i < productos.length; i++){
        lista += `${productos[i].id}. ${productos[i].nombre} - $${productos[i].precio}\n`;
    }
    lista += '\n9. Finalizar compra';
    return lista;
}

const finalizarCompra = () => {
    let salir = confirm('Quiere finalizar su compra?')
            if (salir){
                let productosComprados = carrito.map(item => `${item.nombre} - $${item.precio}`).join('\n');
                alert(`Gracias por tu compra!\n\nSu compra:\n${productosComprados}\n\nTotal de la compra: $${total}`);
            }else{
                opcion = null;
            }
}

const selectProductos = () => {
    switch (opcion) {
        case '1':
        case '2':
        case '3':
        case '4':
        case '5':
        case '6':
        case '7':
        case '8':
            let indice = parseInt(opcion) - 1;
            carrito.push({ id: productos[indice].id, nombre: productos[indice].nombre, precio: productos[indice].precio });
            total += productos[indice].precio;
            alert(`Has añadido ${productos[indice].nombre}.\n\nTotal: $${total}`);
            break;
        case '9':
            finalizarCompra();
            break;
        default:
            alert(error);
            break;
    }
}


do {

    opcion = prompt(listarProductos());
    selectProductos(opcion);

}while (opcion !== '9');

console.log(carrito, total)