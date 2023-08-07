package server

import (
	"sukma-go-crud/internal/pkg/db"
	"sukma-go-crud/internal/repository"
	"sukma-go-crud/internal/service"
	"time"

	ratelimit "github.com/JGLTechnologies/gin-rate-limit"
	"github.com/gin-gonic/gin"
)

func keyFunc(c *gin.Context) string {
	return c.ClientIP()
}

func errorHandler(c *gin.Context, info ratelimit.Info) {
	c.String(429, "Rate Limit: Too many requests. Try again in "+time.Until(info.ResetTime).String())
}

// SetupRoutes is route with dependency injection and ratelimit
func SetupRoutes(db db.DBMysqlInf) *gin.Engine {
	r := gin.Default()
	r.Use(gin.Logger())

	// rate limit, this affect globally to other endpoint
	store := ratelimit.InMemoryStore(&ratelimit.InMemoryOptions{
		Rate:  time.Second,
		Limit: 5,
	})
	mw := ratelimit.RateLimiter(store, &ratelimit.Options{
		ErrorHandler: errorHandler,
		KeyFunc:      keyFunc,
	})
	// routes
	r.GET("/health", func(c *gin.Context) { c.JSON(200, gin.H{"status": "ok", "message": "success"}) })
	r.GET("/job", mw, get(service.NewService(repository.NewRepository(db))))
	r.GET("/job/:id", mw, getID(service.NewService(repository.NewRepository(db))))

	return r
}
