#!/bin/bash

# Step 1: Build the Next.js app
echo "Building the Next.js app..."
npm run build

# Check if build was successful
if [ $? -ne 0 ]; then
    echo "Build failed, exiting script."
    exit 1
fi

# Step 2: Copy the built files to the backend server directory
echo "Copying built files to the backend server..."
cp -R out/ ../backend/webapp_static/ChatJustus/

# Confirm completion
echo "Files copied successfully."
