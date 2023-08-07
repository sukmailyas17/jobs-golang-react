package cmd

import (
	"fmt"
	"log"

	"github.com/spf13/cobra"
)

var rootCommand = &cobra.Command{
	Run: func(_ *cobra.Command, _ []string) {
		fmt.Println("Use command 'go run main.go serve' start a server")
		fmt.Println("Use -h to see the list of command")
	},
}

// Run command
func Run() {
	cartCommand.PersistentFlags().StringVarP(&configURL, "config", "c", "env://", "Config URL i.e. file://config.json")
	rootCommand.AddCommand(cartCommand)

	if err := rootCommand.Execute(); err != nil {
		log.Fatal(err)
	}
}
