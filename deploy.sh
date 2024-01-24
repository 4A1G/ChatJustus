#!/bin/bash

# Define variables
BUILD_DIR="out" # The directory where Next.js outputs the build
GH_PAGES_REPO_DIR="../gh" # Path to the local clone for gh-pages

# Step 1: Build the Next.js app
echo "Building the Next.js app..."
npm run build

# Check if build was successful
if [ $? -ne 0 ]; then
    echo "Build failed, exiting script."
    exit 1
fi

# Step 3: Switch to the gh-pages repository and pull latest changes
echo "Switching to gh-pages repository..."
cd $GH_PAGES_REPO_DIR
git checkout gh-pages
git pull origin gh-pages

# Step 4: Copy the built files to the gh-pages repository
echo "Copying built files to gh-pages repository..."
rm -rf *
cp -R $OLDPWD/$BUILD_DIR/* .
touch .nojekyll

# Step 5: Add and commit changes
echo "Adding and committing changes..."
git add .
git commit -m "Deploying to GitHub Pages"

# Step 6: Push to the gh-pages branch
echo "Pushing to GitHub Pages..."
git push origin gh-pages

# Step 7: Return to the original directory
cd $OLDPWD

echo "Deployment completed successfully."
