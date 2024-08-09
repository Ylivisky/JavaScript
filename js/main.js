
// <---------------- 1era preentrega ---------------->

//mensaje de bienvenida
/*
alert("Bienvenido a tu simulador de prestamos de confianza\nEl interes mensual que manejamos es del 4% y aceptamos hasta 60 meses")

let edad = parseInt(prompt("ingrese su edad:"));
while (edad >= 18){
    let capital =  parseInt(prompt("ingrese su capital:"));
    let meses = parseInt(prompt("ingrese a cuantos meses desea devolverlo: (max: 60 meses)"));
    const interesMensual = 4;//equivalente a 4%
    if (meses < 60){
        cuota = cuotasPrestamo(capital, meses, interesMensual);
        alert("Capital: " + capital + "\n" + "Meses: " + meses + "\n" + "Interes Mensual: " + interesMensual + "%" + "\n" + "El valor de la cuota es de: $" + cuota.toFixed(2));
        edad = parseInt(prompt("ingrese su edad:"));
    }else{
        break;
    }
};



function cuotasPrestamo(capital, meses, interesMensual){
    return ((interesMensual/100)*capital)/(1-(1+(interesMensual/100))**-meses);
};
*/

// <---------------- 2da preentrega ---------------->
// Función para crear un nuevo libro
/*
function createBook() {
    let title = prompt("Ingrese el título del libro:");
    let author = prompt("Ingrese el autor del libro:");
    let year = prompt("Ingrese el año de publicación:");

    // Objeto libro
    let book = {
        title: title,
        author: author,
        year: parseInt(year),
        getSummary: function() {
        return `${this.title} fue escrito por ${this.author} en ${this.year}.`;
    }
    };
    return book;
}
// Array para almacenar los libros
let books = [];

// Función para añadir libros al array
function addBooks() {
    let numberOfBooks = prompt("¿Cuántos libros desea ingresar?");
    for (let i = 0; i < numberOfBooks; i++) {
        let newBook = createBook();
        books.push(newBook);
    }
}

// Función para mostrar los libros ingresados
function showBooks() {
    let summaries = books.map(book => book.getSummary()).join("\n");
    alert(`Resumen de libros:\n${summaries}`);
}

addBooks();
showBooks();
*/

// <---------------- 3era preentrega ---------------->
// Lista de productos
let products = [];

// Array para el carrito
let cart = [];

// Funcion para generar las cartas de la pagina principal
function generateProductHTML(product) {
    return `
        <div class="col-md-4">
            <div class="card mb-4">
                <img src="${product.image}" class="card-img-top" alt="${product.name}">
                <div class="card-body">
                    <h5 class="card-title">${product.name}</h5>
                    <p class="card-text">Precio: $${product.price}</p>
                    <button class="btn btn-primary" onclick="addToCart(${product.id})">Agregar al Carrito</button>
                </div>
            </div>
        </div>
    `;
}

// Funcion para para traer los datos del JSON con validaciones
function loadProducts() {
    fetch('json/products.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al cargar los productos');
            }
            return response.json();
        })
        .then(data => {
            products = data;
            renderProducts();
        })
        .catch(error => {
            console.error('Hubo un problema con la carga de productos:', error);
        });
}

// Funcion para cargar las cartas de los productos en la pagina principal DOM
function renderProducts() {
    const productList = document.getElementById('product-list');
    productList.innerHTML = products.map(product => generateProductHTML(product)).join('');
}

// Funcion para agregar un producto al carrito de compras
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existingProduct = cart.find(item => item.id === productId);
    if (existingProduct) {
        existingProduct.quantity++;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    localStorage.setItem('cart', JSON.stringify(cart));

    Toastify({
        text: "Se ha agregado al carrito!",
        duration: 2000,
        close: true,
        gravity: "top",
        position: "right",
        stopOnFocus: false,
        style: {
        background: "linear-gradient(to right, #00b09b, #96c93d)",
        }
    }).showToast();

    updateCartCount()
}

// Funcion para cargar el carrito desde el almacenamiento local y renderizarlo
function loadCart() {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
        cart = JSON.parse(storedCart);
    }
    if (document.querySelector('.cart-items')) {
        renderCart();
    }
    updateCartCount();
}


// Funcion para renderizar el carrito de compras en la pagina del carrito DOM
function renderCart() {
    const cartItemsContainer = document.querySelector('.cart-items');
    const totalElement = document.getElementById('total');
    cartItemsContainer.innerHTML = '';
    let total = 0;
    cart.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.className = 'card mb-3';
        itemElement.innerHTML = `
            <div class="row no-gutters">
                <div class="col-md-4">
                    <img src="${item.image}" class="card-img" alt="${item.name}">
                </div>
                <div class="col-md-8">
                    <div class="card-body">
                        <h5 class="card-title">${item.name} - $${item.price} x ${item.quantity}</h5>
                        <div class="d-flex justify-content-center align-items-center">
                            <input type="number" id="quantity-${item.id}" class="form-control w-25 mr-2" value="1" min="1" max="${item.quantity}">
                            <button class="btn btn-danger" onclick="removeFromCart(${item.id})">Eliminar</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        cartItemsContainer.appendChild(itemElement);
        total += item.price * item.quantity;
    });
    totalElement.textContent = total.toFixed(2);
}

// Funcion para eliminar un ítem del carrito
function removeFromCart(productId) {
    const quantityInput = document.getElementById(`quantity-${productId}`);
    const quantityToRemove = parseInt(quantityInput.value);
    const item = cart.find(item => item.id === productId);
    if (item) {
        if (item.quantity > quantityToRemove) {
            item.quantity -= quantityToRemove;
        } else {
            cart = cart.filter(item => item.id !== productId);
        }
        localStorage.setItem('cart', JSON.stringify(cart));
        renderCart();
        updateCartCount();
    }
}

// Event listener para cargar productos o el carrito cuando se carga la pagina
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('product-list')) {
        loadProducts();
    } else if (document.querySelector('.cart-items')) {
        loadCart();
    }
});

// Funcion para mostrar la cantidad de elementos del carrito (lo actualiza)
function updateCartCount() {
    const cartCountElement = document.getElementById('cart-count');
    const itemCount = cart.reduce((total, item) => total + item.quantity, 0);
    cartCountElement.textContent = itemCount;

    // Aca tambien agregue para que cambie el icono dependiendo si esta lleno o no
    const cartIconElement = document.getElementById('cart-icon');
    if (itemCount > 0) {
        cartIconElement.classList.remove('bi-minecart');
        cartIconElement.classList.add('bi-minecart-loaded');
    } else {
        cartIconElement.classList.remove('bi-minecart-loaded');
        cartIconElement.classList.add('bi-minecart');
    }
}

// Llamo a la funcion para cargar los productos y que el contador se actualice en cualquier pagina
document.addEventListener('DOMContentLoaded', () => {
    loadCart(); 
    if (document.getElementById('product-list')) {
        loadProducts();
    }
    updateCartCount(); 
});
