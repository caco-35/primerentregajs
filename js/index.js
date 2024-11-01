const cartIcon = document.getElementById('cartIcon');
const deleteIcon = document.getElementById('deleteIcon');
const cartModal = document.getElementById('cartModal');
const closeModal = document.querySelector('.close');
const cartItemsContainer = document.getElementById('cartItems');
const cartCount = document.getElementById('cartCount');
const checkoutBtn = document.getElementById('checkoutBtn');
const continueShoppingBtn = document.getElementById('continueShoppingBtn');
const cartTotal = document.getElementById('cartTotal');
const searchInput = document.getElementById('searchInput');
const modalContent = document.querySelector('.modal-content2');
const modalAlert = document.querySelector('.modal-contentAlert');
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

let total = 0;
let car = [];
let productsData = [];

class Products {
    constructor(id, name, price, image){
        this.id = id;
        this.name = name;
        this.price = price;
        this.image = image;
    }
}

const displayProducts = async () => {
    const container = document.getElementById('productContainer');
    loading.style.display = 'flex';
    await sleep(1500);

    fetch('../data/products.json')
        .then(response => response.json())
        .then(products => {
            productsData = products;
            loading.style.display = 'none';
            renderProducts(productsData);
        })
        .catch(error => {
            loading.style.display = 'none';
            container.innerHTML = 'Error al cargar los productos';
        });

    const renderProducts = (products) => {
        container.innerHTML = '';
        products.forEach((product) => {
            const cardHTML = `
                <div class="product-card">
                    <img src="${product.image}" alt="${product.name}">
                    <h3>${product.name}</h3>
                    <p>$ ${product.price}</p>
                    <span>Cantidad: <input type="number" id="amount-${product.id}" min="1" value="1" class="input-amount" title="Ingresar la cantidad que desea comprar."></span>
                    <button class="btn" id="${product.id}">Agregar al carrito</button>
                </div>
            `;
            container.innerHTML += cardHTML;
        });

     document.querySelectorAll(".btn").forEach(button => {
        button.addEventListener("click", (e) => {
            const productId = e.target.id;
            const amountInput = document.getElementById(`amount-${productId}`);
            const amount = parseInt(amountInput.value) || 1;
            addCar(productId, amount);
            amountInput.value = 1;
            });
        });
    };

    searchInput.addEventListener('input', (event) => {
        const searchTerm = event.target.value.toLowerCase();
        const filteredProducts = productsData.filter(product => 
            product.name.toLowerCase().includes(searchTerm)
        );
        renderProducts(filteredProducts); 
    });
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


const carAmount = () => {
    cartCount.textContent = car.reduce((e, item) => e + item.amount, 0);
}


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

checkoutBtn.addEventListener('click', () => {  
    modalContent.innerHTML = ` 
        <p>Para finalizar su compra, complete los datos:</p>
        <p><label for="name">Nombre:</label> <input type="text" id="name" placeholder="Nombre/s" required></p>
        <p><label for="lastname">Apellido:</label> <input type="text" id="lastname"  placeholder="Apellido/s" required></p>
        <p><label for="email">Email:</label> <input type="email" id="email"  placeholder="Correo@correo.com" required></p>
        <p><label for="direction">Dirección:</label> <input type="text" id="direction"  placeholder="Direccion" required></p>
        <p><label for="checkboxConfirm">Check para confirmar:</label> <input type="checkbox" id="checkboxConfirm" ></p>
        <div class="cart-buttons">
            <button class="btn-finalize" id="aceptBtn">Aceptar</button>
            <button class="btn-continue" id="cancelBtn">Cancelar</button>
        </div>
    `;
    modalFin.style.display = 'block';
    const checkboxConfirm = document.getElementById('checkboxConfirm');
    const aceptBtn = document.getElementById('aceptBtn');
    const cancelBtn = document.getElementById('cancelBtn');

    aceptBtn.addEventListener('click', () => {
        checkboxConfirm.checked ? finalizePurchase() : alertCheck()
        });

    cancelBtn.addEventListener('click', () => {
        modalFin.style.display = 'none';
    });
});


displayProducts();