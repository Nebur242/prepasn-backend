#!/bin/bash

set -euo pipefail

S3_BUCKET_NAME="prepasn-assets"
S3_VIDEO_NAME="video-input.mp4"
S3_VIDEO_PREFIX="videos/uploads"
S3_URL=$(aws s3 presign s3://$S3_BUCKET_NAME/$S3_VIDEO_PREFIX/$S3_VIDEO_NAME)
AWS_ACCESS_KEY_ID=$(aws --profile default configure get aws_access_key_id)
AWS_SECRET_ACCESS_KEY=$(aws --profile default configure get aws_secret_access_key)
AWS_DEFAULT_REGION=$(aws --profile default configure get region)

bash ./scripts/build.sh -b unstaged
docker build -t hls-service:latest -f apps/hls/Dockerfile .
docker run --env AWS_EXECUTION_ENV="AWS_ECS" --env AWS_DEFAULT_REGION=$AWS_DEFAULT_REGION --env AWS_ACCESS_KEY_ID=$AWS_ACCESS_KEY_ID --env AWS_SECRET_ACCESS_KEY=$AWS_SECRET_ACCESS_KEY --env S3_URL=$S3_URL --env S3_BUCKET_NAME=$S3_BUCKET_NAME hls-service:latest
