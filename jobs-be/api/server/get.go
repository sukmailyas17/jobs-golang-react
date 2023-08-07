package server

import (
	"fmt"
	"strconv"
	"sukma-go-crud/internal/service"

	"github.com/gin-gonic/gin"
)

func get(s service.ServiceIntf) gin.HandlerFunc {
	return func(c *gin.Context) {
		level := c.Request.URL.Query().Get("level")
		employment := c.Request.URL.Query().Get("type")
		data, err := s.GetService(level, employment)
		if err != nil {
			c.AbortWithStatusJSON(500, gin.H{
				"status":  "failed",
				"message": fmt.Sprintf("%v", err.Error()),
			})
			return
		}
		c.JSON(200, gin.H{"status": "ok", "message": "success", "data": data})
	}
}

func getID(s service.ServiceIntf) gin.HandlerFunc {
	return func(c *gin.Context) {
		id := c.Param("id")
		if id == "" {
			c.AbortWithStatusJSON(400, gin.H{
				"status":  "failed",
				"message": "id required",
			})
			return
		}
		idx, err := strconv.Atoi(id)
		if err != nil {
			c.AbortWithStatusJSON(400, gin.H{
				"status":  "failed",
				"message": fmt.Sprintf("%v", err.Error()),
			})
			return
		}
		data, err := s.GetServiceByID(idx)
		if err != nil {
			c.AbortWithStatusJSON(500, gin.H{
				"status":  "failed",
				"message": fmt.Sprintf("%v", err.Error()),
			})
			return
		}
		c.JSON(200, gin.H{"status": "ok", "message": "success", "data": data})
	}
}
