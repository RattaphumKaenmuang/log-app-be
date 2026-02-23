# InternQuest Log Application - Backend

***ส่งงานที่ branch main ครับ***

## Setup

1. Clone the repository

   ```
   git clone https://github.com/RattaphumKaenmuang/log-app-be.git
   ```
2. Create a .env file following the .env.example file
   * If left empty, the default MongoDB connection string will be mongodb://mongodb:27017/log-app
   * You can fill in the MONGO_URI environment variable with your preferred MongoDB connection string
3. Download and install Docker and Docker Compose
   * On Windows OS, Docker Desktop must be running for the following steps
4. Run the following Docker Compose command within the project's directory
   ```
   docker-compose up -d
   ```
5. The backend API should be accessible at http://localhost:3000/api (Nothing will be returned here)
   * The OpenAPI swagger page should be accessible at http://localhost:3000/docs