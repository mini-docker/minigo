package main

import (
	"fmt"
	"os"

	"github.com/urfave/cli"
)

// go run main.go  12345678
func main() {
	app := cli.NewApp()
	app.Name = "greet"

	app.Usage = "fight the loneliness!"
	app.Action = func(c *cli.Context) error {
		var cmd string
		if c.NArg() > 0 {
			cmd = c.Args()[0]
		}
		fmt.Println("Hello friend! cmd:", cmd)
		return nil
	}

	app.Run(os.Args) //run 的时候会调用action中的函数
}
