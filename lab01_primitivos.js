const { getMemoryUsage } = require('./profiler');
const N = 1000000;
const memoriaInicial = getMemoryUsage();

let lat = new Float64Array(N);
let lng = new Float64Array(N);
for (let i = 0; i < N; i++) {
 lat[i] = i * 0.1;
 lng[i] = i * -0.1;
}
const memoriaFinal = getMemoryUsage();
console.log(`[Enfoque Primitivos] Memoria inicial: ${memoriaInicial} MB`);
console.log(`[Enfoque Primitivos] Memoria final: ${memoriaFinal} MB`);
console.log(`[Enfoque Primitivos] Consumo Neto: ${memoriaFinal - memoriaInicial} MB`);

//Typed Arrays reservan un bloque contiguo de memoria fuera del heap de V8,
// por eso el heap no crece, pero la memoria sí se consume.
const m = process.memoryUsage();
console.log(`[arrayBuffers]: ${(m.arrayBuffers / 1024 / 1024)} MB`);
console.log(`[rss]:          ${(m.rss / 1024 / 1024)} MB`);
