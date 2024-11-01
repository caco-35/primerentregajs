const addCar = (productId, amount) => {
    fetch('../data/products.json')
    .then(response => response.json())
    .then(products => {
        let index = productId - 1;
        let product = products[index];
        let thisCart = car.find((e) => e.id == product.id);

        if (thisCart) {
            thisCart.amount += amount;
            thisCart.price += product.price * amount;
        } else {
            car.push({ id: product.id, name: product.name, price: product.price * amount, image: product.image, amount });
        }

        total += product.price * amount;
        showAddItemToast(`${product.name} x${amount}`);
        carAmount();
        saveCartToLocalStorage();
        renderCartItems();
    })
    .catch(error => console.error('Error al cargar los productos', error));
};

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
};

const finalizePurchase = () => {

    const nameSend = document.getElementById('name').value;
    const lastnameSend = document.getElementById('lastname').value;
    const directionSend = document.getElementById('direction').value;

    car = [];
    total = 0;
    carAmount();
    saveCartToLocalStorage();
    modalContent.innerHTML = `
        <p>Gracias por su compra ${nameSend} ${lastnameSend}</p></br></br></br>
        <p>El producto sera enviado a:</p>
        <p>${directionSend}</p>
        <button id="closeBtn" class="btn-bye">Aceptar</button>
        `;
    const closeBtn = document.getElementById('closeBtn');
        closeBtn.addEventListener('click', () => {
        modalFin.style.display = 'none';
        cartModal.style.display = 'none';
     });
}

const alertCheck = () => {
    modalWarning.style.display = 'block';
    modalAlert.innerHTML = `
        <p class="p-check">¡No has confirmado el check!</p></br>
        <button id="closeBtn" class="btn-finalize">Aceptar</button>
        `;

        const closeBtn = document.getElementById('closeBtn');
            closeBtn.addEventListener('click', () => {
                modalWarning.style.display = 'none';
            });
}

const showAddItemToast = (itemName) => {
    Toastify({
        text: `Nuevo producto agregado: ${itemName}`,
        duration: 2000,
        gravity: "top",
        position: "center",
        style: {
            background: "linear-gradient(90deg, rgba(69,161,11,1) 0%, rgba(115,205,58,1) 70%)",
            color: "white",
            borderRadius: "15px",
        }
    }).showToast();
};

const showDeleteItemToast = (itemName) => {
    Toastify({
        text: `Producto eliminado: ${itemName}`,
        duration: 2000,
        gravity: "top",
        position: "center",
        style: {
            background: "linear-gradient(90deg, rgba(161,11,27,1) 0%, rgba(213,78,121,1) 70%)",
            color: "white",
            borderRadius: "15px",
        }
    }).showToast();
};

const showDeleteCarToast = () => {
    Toastify({
        text: `Se ha vaciado el carrito`,
        duration: 2000,
        gravity: "top",
        position: "center",
        style: {
            background: "linear-gradient(90deg, rgba(161,11,27,1) 0%, rgba(213,78,121,1) 70%)",
            color: "white",
            borderRadius: "15px",
        }
    }).showToast();
};

const saveCartToLocalStorage = () => {
    localStorage.setItem('cart', JSON.stringify(car));
    localStorage.setItem('total', total.toFixed(2));
};

cartIcon.addEventListener('click', () => {
    cartModal.style.display = 'block';
    renderCartItems(); 
});


closeModal.addEventListener('click', () => {
    cartModal.style.display = 'none';
});

continueShoppingBtn.addEventListener('click', () => {
    cartModal.style.display = 'none';
});

window.addEventListener('click', (event) => {
    if (event.target == cartModal) {
        cartModal.style.display = 'none';
    }
});


deleteIcon.addEventListener('click', () => {
    modalWarning.style.display = 'block'
    modalAlert.innerHTML = `
        <p class="p-check">¿Desea eliminar el carrito?</p></br>
        <button id="deleteBtn" class="btn-bye">Aceptar</button>
        <button id="closeBtn" class="btn-finalize">Cancelar</button>
        `;

        const deleteBtn = document.getElementById('deleteBtn');
            deleteBtn.addEventListener('click', () => {
                car = [];
                total = 0;
                carAmount();
                saveCartToLocalStorage();
                renderCartItems();
                showDeleteCarToast();
                modalWarning.style.display = 'none';
            })

        const closeBtn = document.getElementById('closeBtn');
            closeBtn.addEventListener('click', () => {
                modalWarning.style.display = 'none';
            });
})
