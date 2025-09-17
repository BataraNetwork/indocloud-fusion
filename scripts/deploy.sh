#!/bin/bash

# IndoBlockCloud Deployment Script
set -e

echo "🚀 Starting IndoBlockCloud deployment..."

# Environment variables
ENVIRONMENT=${1:-staging}
VERSION=${2:-latest}
REGISTRY="indoblockcloud"

echo "📦 Building Docker image..."
docker build -t $REGISTRY/indoblockcloud:$VERSION .

echo "🏷️  Tagging image..."
docker tag $REGISTRY/indoblockcloud:$VERSION $REGISTRY/indoblockcloud:latest

if [ "$ENVIRONMENT" = "production" ]; then
    echo "🔒 Running security scan..."
    docker run --rm -v /var/run/docker.sock:/var/run/docker.sock \
        aquasec/trivy image $REGISTRY/indoblockcloud:$VERSION
fi

echo "📤 Pushing to registry..."
docker push $REGISTRY/indoblockcloud:$VERSION
docker push $REGISTRY/indoblockcloud:latest

echo "🎯 Deploying to $ENVIRONMENT..."
if [ "$ENVIRONMENT" = "production" ]; then
    kubectl apply -f k8s/deployment.yaml
    kubectl set image deployment/indoblockcloud-app indoblockcloud=$REGISTRY/indoblockcloud:$VERSION
elif [ "$ENVIRONMENT" = "staging" ]; then
    kubectl apply -f k8s/deployment-staging.yaml
    kubectl set image deployment/indoblockcloud-app-staging indoblockcloud=$REGISTRY/indoblockcloud:$VERSION
fi

echo "⏳ Waiting for rollout to complete..."
kubectl rollout status deployment/indoblockcloud-app$([ "$ENVIRONMENT" = "staging" ] && echo "-staging")

echo "🔍 Running health checks..."
sleep 30
kubectl get pods -l app=indoblockcloud

echo "✅ Deployment completed successfully!"

# Send notification
if [ "$ENVIRONMENT" = "production" ]; then
    curl -X POST -H 'Content-type: application/json' \
        --data '{"text":"🚀 IndoBlockCloud production deployment completed successfully!"}' \
        $SLACK_WEBHOOK_URL
fi