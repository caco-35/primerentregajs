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
}

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
}

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