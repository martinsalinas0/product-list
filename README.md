## Product List

This project has been created by a student at Parsity, an online software engineering course. The work in this repository is wholly of the student based on a sample starter project that can be accessed by looking at the repository that this project forks.

If you have any questions about this project or the program in general, visit [parsity.io](https://parsity.io/) or email hello@parsity.io.

# Install dependencies

npm install

# Install required packages

npm install react-bootstrap bootstrap axios react-icons

Create a .env file in your backend directory:
envPORT=8000
MONGO_URI=mongodb://localhost/products

# OR use your own MongoDB connection string:

# MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/products

Running the Application
Start the Backend Server
bash# From root directory
npm run dev

# Server will run on http://localhost:8000

Start the Frontend Application
bash# From frontend directory
npm run dev

# App will run on http://localhost:3000

Configuration
Port Configuration

Backend: Runs on process.env.PORT || 8000
Frontend: Must run on port 3000 (CORS is configured for this port)

Database Configuration
The MongoDB connection string is set to:
javascriptconst connectString = process.env.MONGO_URI || "mongodb://localhost/products"
You can either:

Use the default local MongoDB setup
Set your own MONGO_URI in the .env file

Troubleshooting
Common Issues:
CORS Error:

Ensure frontend runs on port 3000
Check CORS configuration in backend

Database Connection:

Verify MongoDB is running locally
Check MONGO_URI environment variable

Port Already in Use:

Change PORT in .env file
