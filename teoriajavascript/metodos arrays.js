/**var colores = ["amarillo", "azul"];
colores.push("rojo");
colores.unshift("verde");
colores.pop();
colores.shift();
console.log(colores);



var tiendas = ["hym", "sara", "vershka"];
var incluyeTiendas = tiendas.includes("sara");
console.log(incluyeTiendas);
**/

var numeros = [8, 7 ,6 ,20];
var condicionDeNumeros = numeros.every((num) => {
    return num > 5;
});
console.log(condicionDeNumeros);
