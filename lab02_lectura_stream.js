const fs = require('fs');
const { performance } = require('perf_hooks');
const FILE_NAME = 'coordenadas_masivas.csv';
console.log(`[Lectura por Stream] Iniciando procesamiento...`);
const memoryBefore = process.memoryUsage().heapUsed;
const start = performance.now();
let totalRegistros = 0;
// Creamos un flujo de lectura secuencial no bloqueante
const readableStream = fs.createReadStream(FILE_NAME, { encoding: 'utf-8' });

// Ahorro del Garbage Collector:
    // El 'chunk' vive solo durante la ejecución del callback. Al terminar,
    // ya no existe ninguna referencia a él, por lo que V8 puede liberarlo en una recolección rápida 
    // de la generación joven, sin recorrer un heap grande, lo que ahorra el coste de recolección. 
    // Lo único que persiste entre un trozo y otro es la variable totalRegistros.

readableStream.on('data', (chunk) => {
    // Procesamos el chunk de datos actual sin almacenarlo completo

    let lineBreakCount = (chunk.match(/\n/g) || []).length;
    totalRegistros += lineBreakCount;
});

readableStream.on('end', () => {
    const end = performance.now();
    const memoryAfter = process.memoryUsage().heapUsed;
    console.log(`[Lectura por Stream] Total registros procesados: ${totalRegistros-1}`);
    console.log(`[Lectura por Stream] Tiempo de I/O parcializado: ${((end - start) / 1000).toFixed(2)} segundos.`);
    console.log(`[Lectura por Stream] Consumo Neto de RAM: ${((memoryAfter - memoryBefore) / 1024 / 1024).toFixed(2)} MB`);
});
