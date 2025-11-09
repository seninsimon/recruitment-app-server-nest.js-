
## Description
This is a NestJS project generated with the Nest CLI. It includes a basic user management module with MongoDB integration.

## Installation

1.  **Clone the repository:**
    ```bash
    git clone <repository_url>
    cd my-project
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    # or yarn install
    # or pnpm install
    ```

3.  **Set up environment variables:**
    Create a `.env` file in the root of the project and add the following:
    ```
    PORT=3000
    MONGODB_URI=mongodb://localhost:27017/nest-db
    ```
    *   `PORT`: The port on which the application will run.
    *   `MONGODB_URI`: Your MongoDB connection string.

## Usage

1.  **Start the application in development mode:**
    ```bash
    npm run start:dev
    ```

2.  **Access the API:**
    The API will be available at `http://localhost:3000/api/v1`.

