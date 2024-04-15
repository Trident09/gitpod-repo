package main

import (
	"fmt"
	"log"
	"os"

	"github.com/Trident09/url-shortner/routes"
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/logger"
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

	app.Use(logger.New())

	setUpRoutes(app)

	log.Println("Server started on port", os.Getenv("APP_PORT"))

	log.Fatal(app.Listen(":" + os.Getenv("APP_PORT")))

}