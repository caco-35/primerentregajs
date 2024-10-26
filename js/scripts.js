const cartIcon = document.getElementById('cartIcon');
const cartModal = document.getElementById('cartModal');
const closeModal = document.querySelector('.close');
const closeModal2 = document.querySelector('.close2');
const cartItemsContainer = document.getElementById('cartItems');
const cartCount = document.getElementById('cartCount');
const checkoutBtn = document.getElementById('checkoutBtn');
const continueShoppingBtn = document.getElementById('continueShoppingBtn');
const cartTotal = document.getElementById('cartTotal');
const modalContent = document.querySelector('.modal-content2');

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));


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

/*let products = [
    {
        id: 1,
        name: 'Remera',
        price: 550,
        image: '../img/RemeraBasica.jpg'
        
    },
    {
        id: 2,
        name: 'Short',
        price: 600,
        image: '../img/short.jpg'
    },
    {
        id: 3,
        name: 'Vaquero',
        price: 1100,
        image: '../img/pantalon-vaquero.jpg'
        
    },
    {
        id: 4,
        name: 'Camisa',
        price: 650,
        image: '../img/camisa.jpg'
    },
    {
        id: 5,
        name: 'Musculosa',
        price: 450,
        image: '../img/musculosa.jpg'
        
    },
    {
        id: 6,
        name: 'Maya',
        price: 550,
        image: '../img/maya.jpg'
    },
    {
        id: 7,
        name: 'Gorra',
        price: 200,
        image: '../img/gorro.jpg'
        
    },
    {
        id: 8,
        name: 'Protector solar',
        price: 400,
        image: '../img/protectorsolar.jpg'
    }
]
*/

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



const displayProducts = async () => {
    const container = document.getElementById('productContainer');
    loading.style.display = 'flex';
    await sleep(1500);

    fetch('../data/products.json')
        .then(response => response.json())
        .then(products => {
            loading.style.display = 'none';
            container.innerHTML = '';

            //Idea de filtro
            //const filteredProducts = products.filter(product => 
            //    product.name.toLowerCase().includes("protector solar")
            //);

            products.forEach((product) => {
                const cardHTML = `
                    <div class="product-card">
                        <img src="${product.image}" alt="${product.name}">
                        <h3>${product.name}</h3>
                        <p>$ ${product.price}</p>
                        <button class="btn" id="${product.id}">Agregar al carrito</button>
                    </div>
                `;
                container.innerHTML += cardHTML;
            });

            const buttons = document.querySelectorAll('.btn');
            buttons.forEach(button => {
                button.addEventListener('click', (event) => {
                    const productId = event.target.getAttribute('id');
                    addCar(productId);
                });
            });
        })
        .catch(error => {
            loading.style.display = 'none';
            console.error('Error al cargar los productos:', error);
            container.innerHTML = 'Error al cargar los productos';
        });
}

displayProducts();


/*const displayProducts = () => {
    const container = document.getElementById('productContainer');
    products.forEach((product) => {

        const card = document.createElement('div');
            card.classList.add('product-card');

        const productImage = document.createElement('img');
            productImage.src = product.image;
            productImage.alt = product.name;  
            card.appendChild(productImage);

        const productName = document.createElement('h3');
            productName.textContent = product.name;
            card.appendChild(productName);

        const productPrice = document.createElement('p');
            productPrice.textContent = `$ ${product.price}`;
            card.appendChild(productPrice);

        const addButton = document.createElement('button');
            addButton.textContent = 'Agregar al carrito';
            addButton.classList.add('btn');
            addButton.setAttribute('id', product.id);
            addButton.addEventListener('click', () => {
                const productId = event.target.getAttribute('id');
                addCar(productId);
            });
        card.appendChild(addButton);
        container.appendChild(card);
    });
}
displayProducts(); */

const carAmount = () => {
    cartCount.textContent = car.reduce((e, item) => e + item.amount, 0);
}

/*Carrito con LocalStorage*/

const saveCartToLocalStorage = () => {
    localStorage.setItem('cart', JSON.stringify(car));
    localStorage.setItem('total', total.toFixed(2));
};

const loadCartFromLocalStorage = () => {
    const storedCart = localStorage.getItem('cart');
    const storedTotal = localStorage.getItem('total');
    if (storedCart) {
        car = JSON.parse(storedCart);
        renderCartItems();
    }
    if (storedTotal) {
        total = parseFloat(storedTotal);
        cartTotal.textContent = `Total: $ ${total.toFixed(2)}`;
    }
};

/*Carrito sin LocalStorage*/

/*
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
*/
const addCar = (productId) => {
    fetch('../data/products.json')
    .then(response => response.json())
    .then(products => {
        let index = productId - 1;
        let product = products[index];
        let thisCart = car.find((e) => e.id == product.id);

        if(thisCart) {
            thisCart.amount += 1;
            thisCart.price += product.price;
        } else {
            car.push({ id: products[index].id, name: products[index].name, price: products[index].price, image: products[index].image, amount: 1 });
        }
        total += products[index].price;
        showAddItemToast(products[index].name)
        carAmount();
        saveCartToLocalStorage();
        renderCartItems();
        
    })
    .catch(error => console.error('Error al cargar los productos', error));      
};

cartIcon.addEventListener('click', () => {
    cartModal.style.display = 'block';
    renderCartItems(); 
});


closeModal.addEventListener('click', () => {
    cartModal.style.display = 'none';
});

closeModal2.addEventListener('click', () => {
    modalFin.style.display = 'none';
});

const renderCartItems = () => {
    cartItemsContainer.innerHTML = '';

    car.forEach((item, index) => {
        const cartRow = document.createElement('div');
        cartRow.classList.add('cart-item');
        cartRow.innerHTML = `
            <div>${item.name} (${item.amount})</div>
            <div class="item-price">$ ${item.price.toFixed(2)}</div>
            <div class="btns-items">
                <button class="btn-add" onclick="addItem(${index})">+</button>
                <button class="btn-delete" onclick="removeItem(${index})">-</button>
            </div>
        `;

        cartItemsContainer.appendChild(cartRow);
    });

    carAmount();
    cartTotal.textContent = `Total: $ ${total.toFixed(2)}`;
};
loadCartFromLocalStorage();

const addItem = (index) => {
    fetch('../data/products.json')
    .then(response => response.json())
    .then(products => {
        itemPrice = car[index].id;
        car[index].amount += 1;
        car[index].price += products[itemPrice - 1].price;
        total += products[itemPrice - 1].price;
        saveCartToLocalStorage();
        renderCartItems();
        carAmount();
        showAddItemToast(car[index].name);
    })
    .catch(error => console.error('Error al agregar producto', error));
}

const removeItem = (index) => {
    fetch('../data/products.json')
    .then(response => response.json())
    .then(products => {
        itemPrice = car[index].id;  
        car[index].amount -= 1;
        car[index].price -= products[itemPrice - 1].price;
        total -= products[itemPrice - 1].price;
        showDeleteItemToast(car[index].name); 
        saveCartToLocalStorage();
        if (car[index].amount === 0) {
            car.splice(index, 1); 
            saveCartToLocalStorage();
        }
        renderCartItems();
        carAmount();   
    })
    .catch(error => console.error('Error al eliminar producto', error));   
};


checkoutBtn.addEventListener('click', () => {  
    modalContent.innerHTML = `      
        <p>¿Desea finalizar su compra?</p>
        <div class="cart-buttons">
            <button class="btn-finalize" id="aceptBtn">Aceptar</button>
            <button class="btn-continue" id="cancelBtn">Cancelar</button>
        </div>
    `;
    modalFin.style.display = 'block';
    const aceptBtn = document.getElementById('aceptBtn');
    const cancelBtn = document.getElementById('cancelBtn');

    aceptBtn.addEventListener('click', () => {
        car = [];
        total = 0;
        carAmount();
        saveCartToLocalStorage();
        modalContent.innerHTML = `
            <p>Gracias por su compra</p>
            <button id="closeBtn" class="btn-bye">Aceptar</button>
        `;
        const closeBtn = document.getElementById('closeBtn');
            closeBtn.addEventListener('click', () => {
                modalFin.style.display = 'none';
                cartModal.style.display = 'none';
            });
        });

    cancelBtn.addEventListener('click', () => {
        modalFin.style.display = 'none';
    });

    //const closeBtn2 = document.querySelector('.close2');
    //closeBtn2.addEventListener('click', () => {
    //    modalFin.style.display = 'none';
    //});
});


continueShoppingBtn.addEventListener('click', () => {
    cartModal.style.display = 'none';
});

window.addEventListener('click', (event) => {
    if (event.target == cartModal) {
        cartModal.style.display = 'none';
    }
});
