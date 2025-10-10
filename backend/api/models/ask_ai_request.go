package models

type AskAIRequest struct {
	SelectedAI  []string `json:"selected_ai"`
	RequestText string   `json:"request_text"`
}
