
function getMemoryUsage() {
  const memoryData = process.memoryUsage();
  return Math.round((memoryData.heapUsed / 1024 / 1024) * 100) / 100;
}

module.exports = { getMemoryUsage };
