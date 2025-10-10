package handlers

import (
	"context"
	"fmt"
	"net/http"

	"github.com/ManoVikram/AI-Writing-Assistant/backend/api/models"
	pb "github.com/ManoVikram/AI-Writing-Assistant/backend/api/proto"
	"github.com/gin-gonic/gin"
	"google.golang.org/grpc"
	"google.golang.org/grpc/credentials/insecure"
)

func AskAIHandler(c *gin.Context) {
	var askAIRequest models.AskAIRequest

	if err := c.ShouldBindJSON(&askAIRequest); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request payload"})
		return
	}

	// Convert selected AI strings to proto enum values
	var aiEnums []pb.AI
	for _, ai := range askAIRequest.AISelected {
		switch ai {
		case "CHATGPT":
			aiEnums = append(aiEnums, pb.AI_CHATGPT)
		case "CLAUDE":
			aiEnums = append(aiEnums, pb.AI_CLAUDE)
		case "LLAMA":
			aiEnums = append(aiEnums, pb.AI_LLAMA)
		default:
			c.JSON(http.StatusBadRequest, gin.H{"error": fmt.Sprintf("Unknown AI selected: %s", ai)})
			return
		}
	}

	// Connect to Python gRPC server and send the request
	connection, err := grpc.NewClient("localhost:50051", grpc.WithTransportCredentials(insecure.NewCredentials()))
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to connect to AI service"})
		return
	}
	defer connection.Close()

	// Create a gRPC client to call the AI service
	client := pb.NewAIWritingAssistantServiceClient(connection)

	responses, err := client.AskAI(context.Background(), &pb.AskAIRequest{
		AiSelected:  aiEnums,
		RequestText: askAIRequest.RequestText,
	})
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": fmt.Sprintf("Failed to get a response from the AI: %v", err)})
		return
	}

	c.JSON(http.StatusOK, responses)
}
