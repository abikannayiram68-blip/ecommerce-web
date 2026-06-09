#!/bin/bash
# IT-NFR-009: Docker compose services start
# Input: docker-compose up -d
# Expected Output: All services (api, db, redis) report "healthy" within 60 seconds

set -e

COMPOSE_FILE="../docker-compose.yml"
SERVICES=("api" "db" "redis")
TIMEOUT=60
INTERVAL=5

echo "IT-NFR-009: Docker compose services start"
echo "Checking docker-compose.yml exists..."
if [ ! -f "$COMPOSE_FILE" ]; then
  echo "FAIL: docker-compose.yml not found"
  exit 1
fi

echo "Starting services..."
docker-compose -f "$COMPOSE_FILE" up -d

echo "Waiting for services to become healthy (timeout: ${TIMEOUT}s)..."
ELAPSED=0
while [ $ELAPSED -lt $TIMEOUT ]; do
  ALL_HEALTHY=true
  for SERVICE in "${SERVICES[@]}"; do
    STATUS=$(docker inspect --format='{{.State.Health.Status}}' "$(docker-compose -f "$COMPOSE_FILE" ps -q "$SERVICE")" 2>/dev/null || echo "unhealthy")
    if [ "$STATUS" != "healthy" ]; then
      ALL_HEALTHY=false
      echo "  $SERVICE: $STATUS"
    fi
  done
  if [ "$ALL_HEALTHY" = true ]; then
    echo "PASS: All services healthy"
    exit 0
  fi
  sleep $INTERVAL
  ELAPSED=$((ELAPSED + INTERVAL))
done

echo "FAIL: Timeout - Not all services became healthy within ${TIMEOUT}s"
docker-compose -f "$COMPOSE_FILE" logs
exit 1
