from concurrent import futures
import os
import anthropic
from dotenv import load_dotenv
import ollama
import grpc
from huggingface_hub import InferenceClient
from openai import OpenAI
from proto import service_pb2, service_pb2_grpc

class AIWritingAssistantService(service_pb2_grpc.AIWritingAssistantServiceServicer):
    def call_gpt(self, prompt):
        client = OpenAI()
        response = client.responses.create(
            model="gpt-4o",
            input=[
                {
                    "role": "user",
                    "content": prompt
                }
            ],
        )

        return response.output_text

    def call_claude(self, prompt):
        client = anthropic.Anthropic()
        response = client.messages.create(
            max_tokens=1024,
            model="claude-3-haiku-20240307",
            messages=[
                {"role": "user", "content": prompt}
            ]
        )

        return response.content[0].text

    def call_llama(self, prompt):
        response = ollama.chat(
            model="llama2",
            messages=[
                {"role": "user", "content": prompt}
            ]
        )

        return response["message"]["content"]

    def AskAI(self, request, context):
        responses = []

        for model in request.ai_selected:
            if model == service_pb2.CHATGPT:
                text = self.call_gpt(request.request_text)
            elif model == service_pb2.CLAUDE:
                text = self.call_claude(request.request_text)
            elif model == service_pb2.LLAMA:
                text = self.call_llama(request.request_text)
            else:
                text = "Unsupported model"

            responses.append(
                service_pb2.AIModelResponse(
                    model=int(model),
                    response=str(text)
                )
            )

        return service_pb2.AskAIResponse(responses=responses)
    
def serve():
    load_dotenv()
    assert os.getenv("OPENAI_API_KEY"), "OPENAI_API_KEY environment variable not set in the environment variables."
    assert os.getenv("ANTHROPIC_API_KEY"), "ANTHROPIC_API_KEY environment variable not set in the environment variables."
    assert os.getenv("HF_TOKEN"), "HF_TOKEN environment variable not set in the environment variables."

    server = grpc.server(futures.ThreadPoolExecutor(max_workers=10))
    service_pb2_grpc.add_AIWritingAssistantServiceServicer_to_server(AIWritingAssistantService(), server)

    server.add_insecure_port('[::]:50051')
    server.start()
    print("Python server started on port 50051")
    server.wait_for_termination()

if __name__ == '__main__':
    serve()