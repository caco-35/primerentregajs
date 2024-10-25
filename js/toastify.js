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