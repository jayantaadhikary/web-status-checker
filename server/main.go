package main

import (
	// "fmt"
	"net/http"
	"os"
	"log"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
)

var link string = ""
var status string = ""

func main() {
	app := fiber.New()

	app.Use(cors.New())

	app.Get("/", func(c *fiber.Ctx) error {
		return c.SendString("Hello, World 👋!")
	})

	app.Get("/status", func(c *fiber.Ctx) error {
		return c.JSON(fiber.Map{
			"link":   link,
			"status": status,
		},
		)
	})

	app.Post("/check", func(c *fiber.Ctx) error {
		type Request struct {
			Link string `json:"link"`
		}
		body := new(Request)
		err := c.BodyParser(body)
		if err != nil {
			c.Status(fiber.StatusBadRequest).SendString(err.Error())
			return err
		}
		link = body.Link

		checkLink(link)

		return c.JSON(fiber.Map{
			"link":   link,
		})

	})

	// checkLink(link)

	port := os.Getenv("PORT")

	if port == "" {
		port = "5000"
	}

	log.Fatal(app.Listen("0.0.0.0:" + port))
}

func checkLink(link string) {
	_, err := http.Get(link)
	if err != nil {
		// fmt.Println(link, "might be down!")
		status = "down"
		return
	}
	// fmt.Println(link, "is up!")
	status = "up"
}
