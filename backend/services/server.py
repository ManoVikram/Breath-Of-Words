from concurrent import futures
import os
from dotenv import load_dotenv
import grpc
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
        pass

    def call_llama(self, prompt):
        pass

    def AskAI(self, request, context):
        responses = []

        for model in request.ai_selected:
            responses.append(
                service_pb2.AIResponse(
                    model=model,
                    response=f"Response from {service_pb2.AI.Name(model)} for prompt: {request.request_text}"
                )
            )

        return service_pb2.AskAIResponse(responses=responses)
    
def serve():
    load_dotenv()
    assert os.getenv("OPENAI_API_KEY"), "OPENAI_API_KEY environment variable not set in the environment variables."

    server = grpc.server(futures.ThreadPoolExecutor(max_workers=10))
    service_pb2_grpc.add_AIWritingAssistantServiceServicer_to_server(AIWritingAssistantService(), server)

    server.add_insecure_port('[::]:50051')
    server.start()
    print("Python server started on port 50051")
    server.wait_for_termination()

if __name__ == '__main__':
    serve()