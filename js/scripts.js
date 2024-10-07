const cartIcon = document.getElementById('cartIcon');
const cartModal = document.getElementById('cartModal');
const closeModal = document.querySelector('.close');
const cartItemsContainer = document.getElementById('cartItems');
const cartCount = document.getElementById('cartCount');
const checkoutBtn = document.getElementById('checkoutBtn');
const continueShoppingBtn = document.getElementById('continueShoppingBtn');
const cartTotal = document.getElementById('cartTotal');



let total = 0;
let option;
let car = [];
//const error = 'Ingrese una opcion valida.'

class Products {
    constructor(id, name, price, image){
        this.id = id;
        this.name = name;
        this.price = price;
        this.image = image;
    }
}

let products = [
    {
        id: 1,
        name: 'Remera',
        price: 550,
        image: '../img/IMG-20231220-WA0005.jpg'
        
    },
    {
        id: 2,
        name: 'Short',
        price: 600,
        image: '../img/IMG-20231220-WA0005.jpg'
    },
    {
        id: 3,
        name: 'Vaquero',
        price: 1100,
        image: '../img/IMG-20231220-WA0005.jpg'
        
    },
    {
        id: 4,
        name: 'Camisa',
        price: 650,
        image: '../img/IMG-20231220-WA0005.jpg'
    },
    {
        id: 5,
        name: 'Musculosa',
        price: 450,
        image: '../img/IMG-20231220-WA0005.jpg'
        
    },
    {
        id: 6,
        name: 'Maya',
        price: 550,
        image: '../img/IMG-20231220-WA0005.jpg'
    },
    {
        id: 7,
        name: 'Gorra',
        price: 200,
        image: '../img/IMG-20231220-WA0005.jpg'
        
    },
    {
        id: 8,
        name: 'Protector solar',
        price: 400,
        image: '../img/IMG-20231220-WA0005.jpg'
    }
]

//let product1 = new Products(1, 'Remera', 550);
//let product2 = new Products(2, 'Short', 600);
//let product3 = new Products(3, 'Vaquero', 1100);
//let product4 = new Products(4, 'Camisa', 650);
//let product5 = new Products(5, 'Musculosa', 450);
//let product6 = new Products(6, 'Maya', 550);
//let product7 = new Products(7, 'Gorra', 200);
//let product8 = new Products(8, 'Protector solar', 400);
//
//let products = [product1, product2, product3, product4, product5, product6, product7, product8]

/*const listProducts = () => {
    let list = 'Seleccione el producto: \n\n';
    for ( let i = 0; i < products.length; i++){
        list += `${products[i].id}. ${products[i].name} - $${products[i].price}\n`;
    }
    list += '\n9. Finalizar compra';
    return list;
}*/



/*const selectProducts = () => {
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

}while (option !== '9');*/


const displayProducts = () => {
    const container = document.getElementById('productContainer');
    products.forEach((product) => {
        // Crear la tarjeta del producto
        const card = document.createElement('div');
            card.classList.add('product-card');

        // Añadir la imagen del producto
        const productImage = document.createElement('img');
            productImage.src = product.image;
            productImage.alt = product.name;  
            card.appendChild(productImage);

        // Añadir el nombre del producto
        const productName = document.createElement('h3');
            productName.textContent = product.name;
            card.appendChild(productName);

        // Añadir el precio del producto
        const productPrice = document.createElement('p');
            productPrice.textContent = `$ ${product.price}`;
            card.appendChild(productPrice);

        // Añadir el botón de comprar
        const addButton = document.createElement('button');
            addButton.textContent = 'Agregar al carrito';
            addButton.classList.add('btn');
            addButton.setAttribute('id', product.id); //seteamos el atributo id en una variable
            addButton.addEventListener('click', () => {
                const productId = event.target.getAttribute('id');
                addCar(productId);
            });
        card.appendChild(addButton);
        container.appendChild(card);
    });
}
displayProducts();

const carAmount = () => {
    cartCount.textContent = car.reduce((e, item) => e + item.amount, 0);
}


// Función para agregar un artículo al carrito (puedes llamarla desde otros lugares)
const addCar = (productId) => {
    let index = productId - 1;
    let product = products[index];
    let thisCart = car.find((e) => e.id == product.id);

    if(thisCart) {
        thisCart.amount += 1;
        thisCart.price += product.price;
    }else{
        car.push({ id: products[index].id, name: products[index].name, price: products[index].price, image: products[index].image, amount: 1});
    }
    total += products[index].price;
    carAmount();
}

// Función para abrir el modal
cartIcon.addEventListener('click', () => {
    cartModal.style.display = 'block';
    renderCartItems(); // Mostrar los artículos cuando se abre el modal
});

// Función para cerrar el modal
closeModal.addEventListener('click', () => {
    cartModal.style.display = 'none';
});

const renderCartItems = () => {
    cartItemsContainer.innerHTML = '';

    car.forEach((item, index) => {
        const cartRow = document.createElement('div');
        cartRow.classList.add('cart-item');

        cartRow.innerHTML = `
            <div class="cart-column product-name">${item.name} (${item.amount})</div>
            <div class="cart-column product-price">$ ${item.price.toFixed(2)}</div>
            <div class="cart-column remove-item">
                <button onclick="removeItem(${index})">Eliminar</button>
            </div>
        `;

        cartItemsContainer.appendChild(cartRow);
    });

    carAmount();
    cartTotal.textContent = `Total: $ ${total.toFixed(2)}`;
};


const removeItem = (index) => {
    itemPrice = car[index].id;  
    car[index].amount -= 1;
    car[index].price -= products[itemPrice - 1].price;
    total -= products[itemPrice - 1].price;
    if (car[index].amount === 0) {
        car.splice(index, 1); 
    }

    renderCartItems();
    carAmount();
};



//const finalizePurchase = () => {
//    let exit = confirm('Quiere finalizar su compra?')
//            if (exit){
//                let productsPurchased = car.map(item => `Cant.: ${item.amount} - ${item.name} - $${item.price}`).join('\n');
//                alert(`Gracias por tu compra!\n\nSu compra:\n${productsPurchased}\n\nTotal de la compra: $${total}`);
//            }else{
//                option = null;
//            }
//}

checkoutBtn.addEventListener('click', () => {
    let exit = confirm('Quiere finalizar su compra?')
    
    if (exit){
        alert('Gracias por tu compra');
        car = [];
        total = 0;
        carAmount();
        cartModal.style.display = 'none';
    }else{
        cartModal.style.display = 'block';
    }
});


continueShoppingBtn.addEventListener('click', () => {
    cartModal.style.display = 'none';
});

window.addEventListener('click', (event) => {
    if (event.target == cartModal) {
        cartModal.style.display = 'none';
    }
});
