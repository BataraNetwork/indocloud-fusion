#!/bin/bash

# BataraCloud Health Check Script
set -e

ENDPOINT=${1:-http://localhost}
MAX_RETRIES=5
RETRY_INTERVAL=10

echo "🔍 Running health checks for BataraCloud..."

# Function to check HTTP endpoint
check_endpoint() {
    local url=$1
    local expected_status=${2:-200}
    
    echo "Checking $url..."
    response=$(curl -s -o /dev/null -w "%{http_code}" "$url" || echo "000")
    
    if [ "$response" = "$expected_status" ]; then
        echo "✅ $url is healthy (HTTP $response)"
        return 0
    else
        echo "❌ $url is unhealthy (HTTP $response)"
        return 1
    fi
}

# Function to check with retries
check_with_retry() {
    local url=$1
    local retries=0
    
    while [ $retries -lt $MAX_RETRIES ]; do
        if check_endpoint "$url"; then
            return 0
        fi
        
        retries=$((retries + 1))
        echo "Retry $retries/$MAX_RETRIES in ${RETRY_INTERVAL}s..."
        sleep $RETRY_INTERVAL
    done
    
    echo "❌ Health check failed after $MAX_RETRIES attempts"
    return 1
}

# Main application health check
echo "📋 Checking main application..."
check_with_retry "$ENDPOINT/health"

# Check specific application endpoints
echo "📋 Checking application endpoints..."
check_endpoint "$ENDPOINT/" 200
check_endpoint "$ENDPOINT/auth" 200

# Check API endpoints if available
if curl -s "$ENDPOINT/api/health" > /dev/null 2>&1; then
    echo "📋 Checking API endpoints..."
    check_endpoint "$ENDPOINT/api/health" 200
fi

# Check monitoring endpoints
echo "📋 Checking monitoring endpoints..."
if [ "$CHECK_MONITORING" = "true" ]; then
    check_endpoint "http://localhost:9090/-/healthy" 200  # Prometheus
    check_endpoint "http://localhost:3000/api/health" 200  # Grafana
    check_endpoint "http://localhost:9093/-/healthy" 200  # Alertmanager
fi

echo "✅ All health checks passed!"

# Optional: Send success notification
if [ -n "$SLACK_WEBHOOK_URL" ]; then
    curl -X POST -H 'Content-type: application/json' \
        --data '{"text":"✅ BataraCloud health checks passed successfully!"}' \
        "$SLACK_WEBHOOK_URL"
fi