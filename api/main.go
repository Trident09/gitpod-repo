package main

import (
	"fmt"
	"log"
	"os"

	"github.com/Trident09/url-shortner/routes"
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/logger"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/joho/godotenv"
)

func setUpRoutes(app *fiber.App) {
	app.Get("/:url", routes.ResolveURL)
	app.Post("/api/shorten", routes.ShortenURL)
}

func main() {
	err := godotenv.Load()
	if err != nil {
		fmt.Println("Error loading .env file")
	}

	app := fiber.New()

	// Setup CORS
	app.Use(cors.New(cors.Config{
		AllowOrigins: "http://localhost:3006", // This should match your frontend's origin
		AllowHeaders: "Origin, Content-Type, Accept",
		AllowMethods: "POST, GET, OPTIONS",
	}))

	app.Use(logger.New())

	setUpRoutes(app)

	port := os.Getenv("APP_PORT")
	if port == "" {
		port = "3000" // Default port if environment variable is not set
	}
	log.Println("Server started on port", port)

	log.Fatal(app.Listen(":" + port))

}