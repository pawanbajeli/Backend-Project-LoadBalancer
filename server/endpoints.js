const endpoints = {
    'rest': [
      'http://localhost:5001/rest',
      'http://localhost:5002/rest',
       
    ],
    'graphql': [
      'http://localhost:5001/graphql',
      'http://localhost:5002/graphql',
      
    ],
    'grpc': [
      'http://localhost:5001/grpc',
      'http://localhost:5002/grpc',
     
    ]
  };
  

  async function simulateResponseTime(endpoint) {
    let responseTime;
    if (endpoint && endpoint.includes && endpoint.includes('slow')) {
        responseTime = 3000 + Math.random() * 2000;
    } else {
        responseTime = 500 + Math.random() * 1000;
    }
    await new Promise(resolve => setTimeout(resolve, responseTime));
}

module.exports = { endpoints, simulateResponseTime };
