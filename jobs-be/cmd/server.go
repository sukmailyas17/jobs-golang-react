package cmd

import (
	"context"
	"fmt"
	"log"
	"net/http"
	"os"
	"os/signal"
	"sukma-go-crud/api/server"
	"sukma-go-crud/configs"
	"sukma-go-crud/internal/pkg/db"
	"syscall"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/spf13/cobra"
)

var configURL string
var cartCommand = &cobra.Command{
	Use: "serve",
	Run: func(_ *cobra.Command, _ []string) {
		runServer()
	},
}

func prepare() (db.DBMysqlInf, *configs.Config) {
	// load yaml config
	configPath := configs.GetConfigPath()
	cfg, err := configs.GetConfig(configPath)
	if err != nil {
		log.Fatalf("Loading config: %v", err)
	}
	db, err := db.NewDB(cfg)
	if err != nil {
		log.Fatalf("db : %v", err)
	}
	err = db.Migrate()
	if err != nil {
		log.Fatalf("migrate db : %v", err)
	}
	err = db.Ping()
	if err != nil {
		log.Fatalf("db ping : %v", err)
	}
	return db, cfg
}

func runServer() {
	dbConfig, cfg := prepare()
	// Setting up a channel to capture system signals
	ctx, stop := signal.NotifyContext(context.Background(), os.Interrupt, syscall.SIGHUP, syscall.SIGINT, syscall.SIGTERM, syscall.SIGQUIT, syscall.SIGKILL)
	if cfg.App.Mode == "prod" {
		gin.SetMode(gin.ReleaseMode)
	}
	router := server.SetupRoutes(dbConfig)
	srv := &http.Server{
		ReadHeaderTimeout: 10 * time.Second,
		Addr:              fmt.Sprintf(":%d", cfg.App.Port),
		Handler:           router,
	}

	// Initializing the server in a goroutine so that
	// it won't block the graceful shutdown handling below
	go func() {
		if err := srv.ListenAndServe(); err != nil && err != http.ErrServerClosed {
			stop()
			log.Fatalf("listen: %s\n", err)
		}
	}()
	// Listen for the interrupt signal.
	<-ctx.Done()
	// Restore default behavior on the interrupt signal and notify user of shutdown.
	stop()
	log.Println("shutting down gracefully, press Ctrl+C again to force")
	// The context is used to inform the server it has 5 seconds to finish
	// the request it is currently handling
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	if err := srv.Shutdown(ctx); err != nil {
		cancel()
		log.Fatal("Server forced to shutdown: ", err)
	}
	cancel()

	log.Println("Server exiting")
}
