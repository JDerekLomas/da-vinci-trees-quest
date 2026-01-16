#!/bin/bash

# Parse arguments
FOLDER_NAME=""
STAGE=false

for arg in "$@"; do
  case $arg in
    --stage=*)
      STAGE="${arg#*=}"
      ;;
    --stage)
      STAGE=true
      ;;
    *)
      # Assume it's the folder name if it doesn't match any flag
      if [[ ! $arg == --* ]]; then
        FOLDER_NAME=$arg
      fi
      ;;
  esac
done

# Check if folder name is empty
if [ -z "$FOLDER_NAME" ]; then
    echo "Error: Folder name must be provided as argument"
    # list all folders in src/GAME_DATA
    echo "Available deployments:"
    ls ./src/GAME_DATA/
    exit 1
fi

if [ ! -d "./src/GAME_DATA/$FOLDER_NAME" ]; then
    echo "Error: Folder $FOLDER_NAME does not exist in src/GAME_DATA"
    exit 1
fi

# Set the target folder name based on staging flag
TARGET_FOLDER=$FOLDER_NAME
if [ "$STAGE" = "true" ]; then
    TARGET_FOLDER="${FOLDER_NAME}-stage"
    echo "Deploying to staging environment: $TARGET_FOLDER"
fi

# Upload to S3
echo "Uploading to S3..."
aws s3 rm s3://quests-core-app/$TARGET_FOLDER --recursive
aws s3 cp dist/$FOLDER_NAME s3://quests-core-app/$TARGET_FOLDER --recursive

aws s3 cp s3://quests-core-app/last-updated.json dist/last-updated.json
node scripts/generate-last-updated.js "$TARGET_FOLDER"
aws s3 cp dist/last-updated.json s3://quests-core-app/last-updated.json

echo "Invalidating CloudFront cache..."
aws cloudfront create-invalidation --distribution-id E1FPVJWCHEBLYK --paths "/last-updated.json" "/$TARGET_FOLDER/*" --no-cli-pager

echo "Deployment complete!"