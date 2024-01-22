#!/bin/bash

# Define variables
BUILD_DIR="out" # The directory where Next.js outputs the build
GH_PAGES_BRANCH="gh-pages"
DEPLOY_DIR="/tmp/nextjs_ghpages_deploy" # Temporary directory for deployment

# Step 1: Build the Next.js app
echo "Building the Next.js app..."
npm run build

# Check if build was successful
if [ $? -ne 0 ]; then
    echo "Build failed, exiting script."
    exit 1
fi

# Step 2: Prepare the deployment directory
echo "Preparing deployment directory..."
rm -rf $DEPLOY_DIR
mkdir -p $DEPLOY_DIR

# Step 3: Copy the built files to the deployment directory
echo "Copying built files to the deployment directory..."
cp -R $BUILD_DIR/* $DEPLOY_DIR/

# Step 4: Switch to the gh-pages branch and clean existing files
echo "Switching to the gh-pages branch..."
git checkout $GH_PAGES_BRANCH

# Clean existing files
git rm -rf .
git clean -fdx

# Step 5: Copy files from the deployment directory to the current directory
echo "Copying files from the deployment directory..."
cp -R $DEPLOY_DIR/* .

# Step 6: Add and commit changes
echo "Adding and committing changes..."
git add .
git commit -m "Deploying to GitHub Pages"

# Step 7: Push to the gh-pages branch
echo "Pushing to GitHub Pages..."
git push origin $GH_PAGES_BRANCH

# Step 8: Switch back to the main branch
echo "Switching back to the main branch..."
git checkout main

# Clean up
rm -rf $DEPLOY_DIR

echo "Deployment completed successfully."
