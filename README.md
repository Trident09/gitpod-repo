# URL Shortener Service

## Overview

This project is a URL shortening service built with Go using the Fiber framework, offering high performance due to the underlying fasthttp package that Fiber is built on. The service utilizes Redis as an in-memory datastore for quick read/write operations, and Docker is employed to containerize both the Go application and the Redis datastore, ensuring consistent development and deployment environments.

## Development Highlights

-   **Build Process**: The service is designed with performance in mind, using Go's concurrency features and Fiber's minimal overhead.
-   **Project Structure**: A systematic folder structure divides the application into logical components (`/api`, `/database`, `/helpers`, `/routes`) for maintainability and modularity.
-   **Containerization with Docker**: Dockerfiles and a docker-compose.yml are provided for containerization and orchestrating multi-container setups with the Go service and Redis datastore running in tandem.
-   **Port Mapping**: The service is configured to run on port 3000 by default, in alignment with standard web applications, with Redis occupying port 6379.

## Technical Insights

-   **Fiber Framework**: Chosen for its express-like simplicity and speed, making HTTP request handling both familiar and efficient for developers with a Node.js background.
-   **Redis Integration**: Utilized for its low-latency, high-throughput capabilities that suit the demands of a URL redirection service.
-   **Development Experience**: Enhanced by the use of `godotenv` for loading environment variables from a `.env` file, streamlining configuration management across different development stages.
-   **Docker Compose**: Allows developers to get the service up and running with minimal setup, handling the orchestration of the Go application and Redis instance seamlessly.

## Setup Instructions

1. **Clone the Repository**: Start by cloning the repository to your local machine using the following command:

    ```bash
    git clone https://github.com/Trident09/url-shortner.git
    cd url-shortner
    ```

2. **Install Dependencies**: Ensure that you have Go installed on your machine. Then, install the project dependencies using the following command:

    ```bash
     go mod download
    ```

3. **Set Up Environment Variables**: Create a `.env` file in the root directory of the project and populate it with the following environment variables:

    ```bash
    DB_ADDR="db:port"
    DB_PASSWORD="password"
    APP_PORT="port_number"
    DOMAIN="api_port"
    API_QUERY_LIMIT=request_limit
    ```

4. **Start the Service**: Run the following command to start the service:

    ```bash
     go run main.go
    ```

5. **Access the Service**: The service will be accessible at `http://localhost:3000` by default. You can interact with the API using tools like Postman or cURL.

6. **Running Tests**: To run the tests, use the following command:

    ```bash
     go test ./...
    ```

## Known Developmental Challenges

-   **Client-Server Synchronization**: Currently, the system is optimized for API interaction through tools like Postman. Direct client-server synchronicity is an ongoing development focus.
-   **CORS Configuration**: Developers should be aware of potential CORS issues when testing different client-server setups, and make use of the properly configured CORS middleware.

## Running the Service Using Docker

1. **Build the Docker Image**: Run the following command to build the Docker image:

    ```bash
    docker-compose build
    ```

2. **Start the Service**: Start the service using the following command:

    ```bash
     docker-compose up
    ```

-   [DOCKER](https://docs.docker.com/get-docker/) must be installed on your machine to run the service using Docker.
-   Running the docker-compose has to be run in the root folder of the project.
-   The API is accessible at `http://localhost:3000` by default.
-   The Redis instance is accessible at `http://localhost:6379` by default.
-   The Client is accessible at `http://localhost:3006` by this project configuration.

## API Endpoints

-   **POST /api/shorten**: Shortens a given URL and returns a shortened URL.

    -   **Request Body**:

        ```json
        {
        	"url": "https://rupam.vercel.app",
        	"short": "hello"
        }
        ```

    -   **Response**:

        ```json
        {
        	"url": "https://rupam.vercel.app",
        	"short": "localhost:3000/hello",
        	"expiry": 24,
        	"rate_limit": 9,
        	"rate_limit_reset": 30
        }
        ```

    -   **Request Format**:

        ```javascript
        const myHeaders = new Headers();

        myHeaders.append("Accept-Language", "es-ES");
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
        "url": "https://rupam.vercel.app",
        "short": "hello"
        });

        const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
        };

        fetch("localhost:3000/api/shorten/", requestOptions)
        .then((response) => response.text())
        .then((result) => console.log(result))
        .catch((error) => console.error(error));
        ```

    - ScreenShot

        ![Shorten](https://i.imgur.com/0Nbyz2S.png)

## Contributing

Development is an iterative process, and contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

Check [CONTRIBUTING.md](CONTRIBUTING.md) for detailed instructions on how to contribute.

## License

Distributed under the MIT License. See [LICENSE.md](LICENSE.md) for more information.

