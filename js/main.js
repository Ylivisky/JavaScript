//mensaje de bienvenida
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