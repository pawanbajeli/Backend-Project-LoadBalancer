const endpoints = {
    'rest': [
      'http://localhost:5001/rest',
      'http://localhost:5002/rest',
      'http://localhost:5003/rest', 
    ],
    'graphql': [
      'http://localhost:5001/graphql',
      'http://localhost:5002/graphql',
      'http://localhost:5003/graphql', 
    ],
    'grpc': [
      'http://localhost:5001/grpc',
      'http://localhost:5002/grpc',
      'http://localhost:5003/grpc', 
    ]
  };
  

async function simulateResponseTime(endpoint) {
    if (endpoint.includes('slow')) {
        await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate slow response
    } else {
        await new Promise(resolve => setTimeout(resolve, 500)); // Simulate fast response
    }
    return { status: 'success', endpoint };
}

module.exports = { endpoints, simulateResponseTime };
