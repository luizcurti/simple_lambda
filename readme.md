# Nodeless - Image Optimizer on AWS Lambda

This project consists of an AWS Lambda function for automatically optimizing images stored in Amazon S3. It resizes images to a maximum of **1280x720** pixels and converts them to **JPEG** with optimized quality.

## 📌 Features
- Listens for image upload events in S3 (`.jpg` and `.png` files).
- Resizes images while maintaining their original aspect ratio.
- Converts images to **JPEG** with 50% quality.
- Saves the optimized version in the `compressed/` folder within the same bucket.

## 🚀 Technologies Used
- **AWS Lambda**
- **Amazon S3**
- **Node.js 18.x**
- **Sharp (image processing library)**
- **Serverless Framework**

## 📂 Project Structure
```
├── optimize.js        # Main Lambda code
├── serverless.yml     # Serverless Framework configuration
├── package.json       # Project dependencies
├── README.md          # Documentation
```

## 🔧 Setup and Deployment
### Prerequisites
- AWS CLI configured with the necessary permissions.
- Node.js installed (recommended version 18.x).
- Serverless Framework installed (`npm install -g serverless`).

### Serverless Configuration
1. Edit the `serverless.yml` file and set your S3 bucket name:
```yaml
provider:
  environment:
    BUCKET_NAME: "your-bucket"
```

2. Install project dependencies:
```sh
npm install
```

### Deploying to AWS
To deploy the Lambda function, run:
```sh
serverless deploy -v
```

### Manual Testing
You can test the Lambda by uploading an image to the `uploads/` folder of your S3 bucket:
```sh
aws s3 cp my-image.jpg s3://your-bucket/uploads/my-image.jpg
```

If everything is configured correctly, the optimized version will be saved in the `compressed/` folder within the same bucket.

## 🛠️ Maintenance and Updates
To update the Lambda code, simply redeploy:
```sh
serverless deploy -v
```

If you need to remove the service:
```sh
serverless remove
```

## 📝 License
This project is open-source and licensed under the MIT license.

