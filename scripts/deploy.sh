#!/bin/bash

# BataraCloud Deployment Script
set -e

echo "🚀 Starting BataraCloud deployment..."

# Environment variables
ENVIRONMENT=${1:-staging}
VERSION=${2:-latest}
REGISTRY="bataracloud"

echo "📦 Building Docker image..."
docker build -t $REGISTRY/bataracloud:$VERSION .

echo "🏷️  Tagging image..."
docker tag $REGISTRY/bataracloud:$VERSION $REGISTRY/bataracloud:latest

if [ "$ENVIRONMENT" = "production" ]; then
    echo "🔒 Running security scan..."
    docker run --rm -v /var/run/docker.sock:/var/run/docker.sock \
        aquasec/trivy image $REGISTRY/bataracloud:$VERSION
fi

echo "📤 Pushing to registry..."
docker push $REGISTRY/bataracloud:$VERSION
docker push $REGISTRY/bataracloud:latest

echo "🎯 Deploying to $ENVIRONMENT..."
if [ "$ENVIRONMENT" = "production" ]; then
    kubectl apply -f k8s/deployment.yaml
    kubectl set image deployment/bataracloud-app bataracloud=$REGISTRY/bataracloud:$VERSION
elif [ "$ENVIRONMENT" = "staging" ]; then
    kubectl apply -f k8s/deployment-staging.yaml
    kubectl set image deployment/bataracloud-app-staging bataracloud=$REGISTRY/bataracloud:$VERSION
fi

echo "⏳ Waiting for rollout to complete..."
kubectl rollout status deployment/bataracloud-app$([ "$ENVIRONMENT" = "staging" ] && echo "-staging")

echo "🔍 Running health checks..."
sleep 30
kubectl get pods -l app=bataracloud

echo "✅ Deployment completed successfully!"

# Send notification
if [ "$ENVIRONMENT" = "production" ]; then
    curl -X POST -H 'Content-type: application/json' \
        --data '{"text":"🚀 BataraCloud production deployment completed successfully!"}' \
        $SLACK_WEBHOOK_URL
fi