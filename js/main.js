
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
const products = [
    { id: 1, name: "Procesador Intel i3", price: 160000, image: "https://http2.mlstatic.com/D_NQ_NP_671623-MLA54687847194_032023-O.webp"},
    { id: 2, name: "Procesador Intel i5", price: 230000, image: "https://http2.mlstatic.com/D_NQ_NP_859509-MLU73213842167_122023-O.webp"},
    { id: 3, name: "Procesador Intel i7", price: 400000, image: "https://http2.mlstatic.com/D_NQ_NP_960803-MLU70044930468_062023-O.webp"},
    { id: 4, name: "Tarjeta Gráfica NVIDIA GTX 1080", price: 330000, image: "https://http2.mlstatic.com/D_NQ_NP_928140-MLB25873293517_082017-O.webp"},
    { id: 5, name: "Tarjeta Gráfica NVIDIA RTX 2080", price: 620000, image: "https://http2.mlstatic.com/D_NQ_NP_869238-MLU54957418809_042023-O.webp"},
    { id: 6, name: "Tarjeta Gráfica NVIDIA RTX 3080", price: 980000, image: "https://http2.mlstatic.com/D_NQ_NP_748274-MLU74977413814_032024-O.webp"},
    { id: 7, name: "Tarjeta Gráfica NVIDIA RTX 4080", price: 2200000, image: "https://http2.mlstatic.com/D_NQ_NP_782697-MLU69821067861_062023-O.webp"}
    
];

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

// Funcion para cargar las cartas de los productos en la pagina principal DOM
function loadProducts() {
    const productList = document.getElementById('product-list');
    productList.innerHTML = products.map(product => generateProductHTML(product)).join('');
}

// Función para agregar un producto al carrito de compras
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existingProduct = cart.find(item => item.id === productId);
    if (existingProduct) {
        existingProduct.quantity++;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Función para cargar el carrito desde el almacenamiento local y renderizarlo
function loadCart() {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
        cart = JSON.parse(storedCart);
    }
    renderCart();
}

// Función para renderizar el carrito de compras en la pagina del carrito DOM
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
                        <button class="btn btn-danger" onclick="removeFromCart(${item.id})">Eliminar</button>
                    </div>
                </div>
            </div>
        `;
        cartItemsContainer.appendChild(itemElement);
        total += item.price * item.quantity;
    });

    totalElement.textContent = total.toFixed(2);
}

// Función para eliminar un ítem del carrito
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    localStorage.setItem('cart', JSON.stringify(cart));
    renderCart();
}

// Event listener para cargar productos o el carrito cuando se carga la página
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('product-list')) {
        loadProducts();
    } else if (document.querySelector('.cart-items')) {
        loadCart();
    }
});
