const cartIcon = document.getElementById('cartIcon');
const cartModal = document.getElementById('cartModal');
const closeModal = document.querySelector('.close');
const closeModal2 = document.querySelector('.close2');
const cartItemsContainer = document.getElementById('cartItems');
const cartCount = document.getElementById('cartCount');
const checkoutBtn = document.getElementById('checkoutBtn');
const continueShoppingBtn = document.getElementById('continueShoppingBtn');
const cartTotal = document.getElementById('cartTotal');
const searchInput = document.getElementById('searchInput');
const modalContent = document.querySelector('.modal-content2');
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));


let total = 0;
let car = [];
let productsData = [];  // Variable para almacenar los productos

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

    // Cargar los productos
    fetch('../data/products.json')
        .then(response => response.json())
        .then(products => {
            productsData = products; // Guardar los productos cargados
            loading.style.display = 'none';
            renderProducts(productsData); // Mostrar todos los productos inicialmente
        })
        .catch(error => {
            loading.style.display = 'none';
            console.error('Error al cargar los productos:', error);
            container.innerHTML = 'Error al cargar los productos';
        });

    // Función para renderizar los productos
    const renderProducts = (products) => {
        container.innerHTML = '';  // Limpiar el contenedor
        products.forEach((product) => {
            const cardHTML = `
                <div class="product-card">
                    <img src="${product.image}" alt="${product.name}">
                    <h3>${product.name}</h3>
                    <p>$ ${product.price}</p>
                    <button class="addbtn" id="${product.id}">Agregar al carrito</button>
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
});

displayProducts();