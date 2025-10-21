export async function ai_summarization(aiSelected, text) {
    const response = await fetch(`${process.env.API_BASE_URL}/api/ask`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            ai_selected: aiSelected,
            request_text: text,
        })
    });

    const data = await response.json();
    
    return data;
}