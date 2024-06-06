#!/bin/bash

# Base URL of the load balancer
BASE_URL="http://localhost:3000/route"

# Array of API types
API_TYPES=("rest" "graphql" "grpc")

# Function to generate a random payload size between 10 and 1000 bytes
generate_payload() {
    local size=$(( (RANDOM % 991) + 10 ))
    head -c $size </dev/urandom | base64 | tr -d '\n'
}

# Number of requests to send
NUM_REQUESTS=10

# Send requests
for ((i=1; i<=NUM_REQUESTS; i++))
do
    # Select a random API type
    API_TYPE=${API_TYPES[$RANDOM % ${#API_TYPES[@]}]}
    
    # Generate a random payload
    PAYLOAD=$(generate_payload)
    
    # Generate a random number to determine the criteria
    CRITERIA=$((RANDOM % 3))

    if [ $CRITERIA -eq 0 ]; then
        # Send request to the load balancer with FIFO queue criteria
        curl -X POST -H "Content-Type: application/json" -d "{\"apiType\": \"$API_TYPE\", \"payload\": \"$PAYLOAD\", \"customCriteria\": \"fifo\"}" $BASE_URL
        echo "Sent request $i to $API_TYPE API with FIFO queue criteria"
    elif [ $CRITERIA -eq 1 ]; then
        # Send request to the load balancer with priority queue criteria
        curl -X POST -H "Content-Type: application/json" -d "{\"apiType\": \"$API_TYPE\", \"payload\": \"$PAYLOAD\", \"customCriteria\": \"priority\"}" $BASE_URL
        echo "Sent request $i to $API_TYPE API with priority queue criteria"
    else
        # Send request to the load balancer with round-robin criteria
        curl -X POST -H "Content-Type: application/json" -d "{\"apiType\": \"$API_TYPE\", \"payload\": \"$PAYLOAD\"}" $BASE_URL
        echo "Sent request $i to $API_TYPE API with round-robin criteria"
    fi
done
