
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