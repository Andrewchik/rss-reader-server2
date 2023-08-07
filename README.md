# Server README

This is the backend server for your application. It handles user authentication using JSON Web Tokens (JWT) and provides API endpoints for logging in and checking user authentication status.

## Getting Started

Follow these steps to get the server up and running.

### Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (https://nodejs.org/)
- MongoDB (https://www.mongodb.com/try/download/community)

### Installation

1. Clone the repository:

   ```bash
   git clone <repository_url>
   cd server

2. Install dependencies:
   
    ```bash
    npm install

### Usage
1. Connecting to the database
   - Place my .env file into the server folder.
   
3. Generate a JWT token:
 - Open a terminal and navigate to the server directory.
 - Run the following command:
   
     ```bash
     ts-node generateKey.ts
     
3. Start the server:
   
     ```bash
     npm start
     
The server will start and listen for incoming requests.
