                                                                                    Descripción del Proyecto

Este es un e-commerce básico implementado con HTML, CSS y JavaScript que permite a los usuarios agregar productos al carrito, modificar la cantidad de productos, eliminar artículos y finalizar la compra. La aplicación interactúa con un archivo JSON que contiene la información de los productos.

Funcionalidad General
	1. Agregar productos al carrito
		- La función addCar(productId, amount) se encarga de agregar productos al carrito.
		- Se realiza una petición a un archivo products.json que contiene los detalles de los productos.
		- Si el producto ya está en el carrito, se actualiza su cantidad y precio total. Si no, se añade un nuevo producto al carrito.
		- Tras agregar un producto, se actualizan las variables total (precio total) y el número de artículos en el carrito, se guarda el carrito en localStorage y se actualiza la   visualización del carrito en pantalla.
		- Se muestra un toast con la confirmación del producto agregado usando la librería Toastify.
	2. Eliminar productos del carrito
		- La función removeItem(index) permite disminuir la cantidad de un producto o eliminarlo completamente si la cantidad llega a 0.
		- De nuevo, se consulta el archivo products.json para obtener el precio del producto y actualizar los totales correspondientes.
		- Si el producto se elimina por completo, se actualiza el carrito y el precio total, y se muestra un toast indicando que se ha eliminado un artículo.
	3. Aumentar cantidad de un producto
		- La función addItem(index) permite incrementar la cantidad de un producto que ya está en el carrito.
		- Actualiza la cantidad y el precio total del producto en cuestión, guardando los cambios en localStorage y reflejando las modificaciones en la visualización del carrito.
	4. Finalizar compra
		- La función finalizePurchase() captura la información del usuario (nombre, apellido y dirección), vacía el carrito y muestra un mensaje de confirmación con los detalles de la compra y la dirección de envío.
		- Después de finalizar, el carrito se vacía y se guarda nuevamente en localStorage con valor cero.
	5. Confirmaciones y alertas
		- La función alertCheck() muestra una alerta si el usuario intenta finalizar la compra sin haber confirmado los términos de la compra.
		- Se utiliza un modal para mostrar mensajes de advertencia y botones para aceptar o cancelar la acción.
	6. Guardar y mostrar el carrito
		- LocalStorage se utiliza para guardar el estado del carrito (car) y el total (total) en el navegador, lo que permite que el carrito se mantenga incluso si el usuario recarga la página.
		- La función renderCartItems() es responsable de renderizar visualmente los artículos del carrito en el modal correspondiente, mostrando el nombre, cantidad, imagen y precio de cada producto.
	7. Interacción con el DOM
		- La aplicación utiliza eventos como click para abrir y cerrar el modal del carrito, continuar comprando o eliminar todo el carrito.
		- Se muestra una advertencia de confirmación cuando se intenta eliminar todo el carrito, permitiendo al usuario cancelar la acción si así lo desea.
	8. Notificaciones
		- Se utiliza Toastify para mostrar notificaciones visuales en la parte superior de la pantalla cuando se agrega o elimina un producto, así como cuando se vacía el carrito completo.
		
Tecnologías Utilizadas
	- HTML5 y CSS3 para la estructura y estilos de la interfaz de usuario.
	- JavaScript ES6 para la funcionalidad del carrito de compras.
	- Fetch API para obtener datos de productos desde un archivo JSON local.
	- LocalStorage para almacenar el estado del carrito de compras en el navegador.
	- Toastify para mostrar notificaciones visuales (toasts).
	
Instalación y Configuración
	- Clona este repositorio en tu máquina local.
	- Asegúrate de que el archivo products.json se encuentra en la ruta ../data/products.json en relación con tu archivo principal.
	- Abre el archivo index.html en tu navegador para comenzar a usar la aplicación.
	
Uso
	- Agregar productos: selecciona la cantidad deseada y haz clic en "Agregar al carrito".
	- Modificar cantidad: dentro del carrito, usa los botones para aumentar o disminuir la cantidad de un producto.
	- Eliminar productos: puedes eliminar productos del carrito o vaciar todo el carrito.