const { getMemoryUsage } = require('./profiler');
const N = 1000000;
const aMB = (bytes) => bytes / 1024 / 1024;
const memoriaInicial = getMemoryUsage();
const antes = process.memoryUsage();

class CoordenadaObj {
 constructor(lat, lng) {
 this.lat = lat; 
 this.lng = lng;
 }
}
let coordenadas = [];
for (let i = 0; i < N; i++) {
 coordenadas.push(new CoordenadaObj(i * 0.1, i * -0.1));
}
const memoriaFinal = getMemoryUsage();
const despues = process.memoryUsage();


// En este caso el uso de Heao es más notable
console.log(`[Enfoque Objetos] Memoria inicial: ${memoriaInicial} MB`);
console.log(`[Enfoque Objetos] Memoria final: ${memoriaFinal} MB`);
console.log(`[Enfoque Objetos] Consumo Neto: ${memoriaFinal - memoriaInicial} MB`);

console.log(`[arrayBuffers]: ${aMB(despues.arrayBuffers - antes.arrayBuffers)} MB`);
console.log(`[rss]:          ${aMB(despues.rss - antes.rss)} MB`);
