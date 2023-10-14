package main

import (
	"fmt"
	"net/http"

	"github.com/gofiber/fiber/v2"
)

var link string = "https://www.google.com"
var status string = ""

func main() {
	app := fiber.New()

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
			"link": link,
			"status": status,
		})

	})

	checkLink(link)

	app.Listen(":5000")
}

func checkLink(link string) {
	_, err := http.Get(link)
	if err != nil {
		fmt.Println(link, "might be down!")
		status = "down"
		return
	}
	fmt.Println(link, "is up!")
	status = "up"
}
