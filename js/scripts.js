let total = 0;
let option;
let car = [];
const error = 'Ingrese una opcion valida.'

class Products {
    constructor(id, name, price){
        this.id = id;
        this.name = name;
        this.price = price;
    }
}

let product1 = new Products(1, 'Remera', 550);
let product2 = new Products(2, 'Short', 600);
let product3 = new Products(3, 'Vaquero', 1100);
let product4 = new Products(4, 'Camisa', 650);
let product5 = new Products(5, 'Musculosa', 450);
let product6 = new Products(6, 'Maya', 550);
let product7 = new Products(7, 'Gorra', 200);
let product8 = new Products(8, 'Protector solar', 400);

let products = [product1, product2, product3, product4, product5, product6, product7, product8]

const listProducts = () => {
    let list = 'Seleccione el producto: \n\n';
    for ( let i = 0; i < products.length; i++){
        list += `${products[i].id}. ${products[i].name} - $${products[i].price}\n`;
    }
    list += '\n9. Finalizar compra';
    return list;
}

const finalizePurchase = () => {
    let exit = confirm('Quiere finalizar su compra?')
            if (exit){
                let productsPurchased = car.map(item => `Cant.: ${item.amount} - ${item.name} - $${item.price}`).join('\n');
                alert(`Gracias por tu compra!\n\nSu compra:\n${productsPurchased}\n\nTotal de la compra: $${total}`);
            }else{
                option = null;
            }
}

const addCar = () => {
    let index = parseInt(option) - 1;
    let product = products[index];
    let thisCart = car.find((e) => e.id == product.id);

    if(thisCart) {
        thisCart.amount += 1;
        thisCart.price += product.price;
    }else{
        car.push({ id: products[index].id, name: products[index].name, price: products[index].price, amount: 1});
    }
    total += products[index].price;
    alert(`Has añadido ${products[index].name}.\n\nTotal: $${total}`);
}

const selectProducts = () => {
    switch (option) {
        case '1':
        case '2':
        case '3':
        case '4': 
        case '5':
        case '6':
        case '7':
        case '8':
            addCar();
            break;
        case '9':
            finalizePurchase();
            break;
        default:
            alert(error);
            break;
    }
}


do {

    option = prompt(listProducts());
    selectProducts(option);

}while (option !== '9');

console.log(car, total)