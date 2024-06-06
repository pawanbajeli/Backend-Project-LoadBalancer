Wasserstoff Backend Task
Overview
This project implements an intelligent load balancer designed to manage and distribute traffic across multiple unique APIs. The primary goal is to showcase logical, reasoning, and analytical skills by designing and implementing a sophisticated routing mechanism that efficiently handles various types of requests.

Milestones
Milestone 1: Design and Functionality
Objective: Develop a load balancer that dynamically routes incoming requests to different API endpoints.
Requirements:
Dynamic Routing: Implement routing based on API type (e.g., REST, GraphQL, gRPC), request payload size and type, randomized routing, and custom criteria.
Function Simulation: Create multiple mock API endpoints with varied response times and behaviors.
Logging and Metrics: Capture and log metrics such as request times, endpoint selection, and response times.
Milestone 2: Queue Management and Analysis
Objective: Extend the load balancer to handle incoming requests using different queuing strategies and analyze the performance of each strategy.
Requirements:
Queue Management: Implement FIFO, priority-based, and round-robin queues.
Request Handling: Develop a mechanism to process requests from these queues and demonstrate the performance impact of each strategy.
Logging and Analysis: Provide detailed logs and metrics for each strategy and document performance findings.
Installation
Prerequisites
Ensure you have the following installed:

Node.js (v14.x or later)
npm (v6.x or later)
Setup
Clone the repository:

sh
Copy code
git clone https://github.com/yourusername/intelligent-load-balancer.git
cd intelligent-load-balancer
Install the dependencies:

sh
Copy code
npm install
Create a .env file at the root of the project and add the following content:

makefile
Copy code
PORT=3000
Usage
Running the Mock APIs
Start the mock API servers on ports 5001 and 5002:

Start API1:

sh
Copy code
node api1.js
Start API2:

sh
Copy code
node api2.js
Running the Load Balancer
Start the load balancer on the specified port (default: 3000):

sh
Copy code
node loadBalancer.js
Endpoints
GET /route: Test the load balancer with a simple GET request.
POST /route: Route a request with specific payload and criteria.
sh
Copy code
curl -X POST http://localhost:3000/route -H "Content-Type: application/json" -d '{"apiType": "rest", "payload": {"key": "value"}, "customCriteria": "priority"}'
Code Structure
api1.js: Mock API server 1.
api2.js: Mock API server 2.
loadBalancer.js: Main load balancer application.
endpoints.js: Contains the endpoints configuration.
fifoQueue.js: FIFO queue implementation.
priorityQueue.js: Priority queue implementation.
roundRobinQueue.js: Round-robin queue implementation.
logger.js: Logger setup using Winston.
router.js: Routing logic and queue processing functions.
Design Choices
Routing Logic: The load balancer uses dynamic routing based on API type, payload size, randomized routing, and custom criteria.
Queue Management: Different queuing strategies (FIFO, priority, round-robin) are implemented to handle request distribution.
Logging and Metrics: Detailed logging and metrics capture using Winston for performance analysis.
Logging and Metrics
The system captures logs for request times, endpoint selection, and response times.
Metrics are logged to logs/requests.log for analysis.
Analysis
The performance of different queuing strategies is logged and analyzed.
Detailed documentation of the findings is provided to understand the impact on load distribution and performance.
Conclusion
This project demonstrates a sophisticated approach to load balancing and queue management, showcasing creativity, logical reasoning, and analytical skills. The provided documentation and code structure ensure that the implementation is clear and maintainable.
