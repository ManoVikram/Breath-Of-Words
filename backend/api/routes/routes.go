package routes

import (
	"github.com/ManoVikram/AI-Writing-Assistant/backend/api/handlers"
	"github.com/gin-gonic/gin"
)

func RegisterRoutes(server *gin.Engine) {
	// Ask the AI for help
	server.POST("/api/ask", handlers.AskAIHandler)
}
