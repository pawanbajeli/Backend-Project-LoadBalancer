#!/bin/bash

# URL of the load balancer
URL="http://localhost:3000/route"

# Array of API types
API_TYPES=("rest" "grpc" "graphql")

# Function to generate random payload
generate_payload() {
    local size=$1
    head -c "${size}" </dev/urandom | base64
}

# Loop to send requests
for i in {1..10}; do
    # Select a random API type
    API_TYPE=${API_TYPES[$RANDOM % ${#API_TYPES[@]}]}

    # Generate a random payload size between 10 and 100 bytes
    PAYLOAD_SIZE=$((RANDOM % 91 + 10))

    # Generate the payload
    PAYLOAD=$(generate_payload ${PAYLOAD_SIZE})

    # Send the request
    RESPONSE=$(curl -s -X POST ${URL} \
        -H "Content-Type: application/json" \
        -d @- <<EOF
{
    "apiType": "${API_TYPE}",
    "payload": "${PAYLOAD}",
    "customCriteria": "priority"
}
EOF
    )

    # Print the response
    echo "Response: ${RESPONSE}"

    # Wait a random time between 1 and 3 seconds before the next request
    sleep $((RANDOM % 3 + 1))
done
