package routes

import "github.com/gin-gonic/gin"

func RegisterRoutes(server *gin.Engine) {
	// Ask the AI for help
	server.POST("/api/ask", handlers.AskAIHandler)
}
