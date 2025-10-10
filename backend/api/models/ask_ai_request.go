package models

type AskAIRequest struct {
	AISelected  []string `json:"ai_selected"`
	RequestText string   `json:"request_text"`
}
