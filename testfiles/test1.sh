#!/bin/bash

# Endpoint URL
URL="http://localhost:3000/route"

# Function to generate a random payload size
generate_payload() {
    local size=$1
    head -c "$size" /dev/urandom | base64 | tr -d '\n'
}

# Loop to send 10 test inputs
for i in {1..10}
do
    # Generate a random payload size between 10 and 100 bytes
    payload_size=$(( ( RANDOM % 91 ) + 10 ))

    # Generate a random payload
    payload=$(generate_payload "$payload_size")

    # Create JSON payload
    json_payload=$(cat <<EOF
{
    "apiType": "grpc",
    "payload": {
        "method": "testMethod",
        "data": "$payload"
    },
    "customCriteria": "fifo"
}
EOF
)

    # Send the POST request
    curl -X POST "$URL" -H "Content-Type: application/json" -d "$json_payload"
    
    # Print a newline for readability
    echo
done
