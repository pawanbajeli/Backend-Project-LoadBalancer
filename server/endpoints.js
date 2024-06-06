const endpoints = {
  'rest': [
    'http://localhost:5001/rest', 
    'http://localhost:5002/rest?responseTime=slow', // Add query parameter
  ],
  'graphql': [
    'http://localhost:5001/graphql',
    'http://localhost:5002/graphql?responseTime=slow', // Add query parameter
  ],
  'grpc': [
    'http://localhost:5001/grpc',
    'http://localhost:5002/grpc?responseTime=slow', // Add query parameter
  ]
};

async function simulateResponseTime(endpoint) {
  let responseTime;
  // Extract query parameter from the endpoint URL
  const url = new URL(endpoint);
  const params = url.searchParams;
  if (params.has('responseTime') && params.get('responseTime') === 'slow') {
      responseTime = 3000 + Math.random() * 2000;
  } else {
      responseTime = 500 + Math.random() * 1000;
  }
  await new Promise(resolve => setTimeout(resolve, responseTime));
}


module.exports = { endpoints, simulateResponseTime };
