# Breath of Words - AI Writing Assistant

## Install the Necessary Packages

The below command installs the necessary Python gRPC packages.

```bash
pip3 install grpcio grpcio-tools
```

The below command installs the necessary Go gRPC packages.

```bash
go install google.golang.org/protobuf/cmd/protoc-gen-go@latest
go install google.golang.org/grpc/cmd/protoc-gen-go-grpc@latest
```

Add the installed Go protoc-gen-go package to PATH

```bash
export PATH="$PATH:$(go env GOPATH)/bin"
```

## Generate the gRPC Files

Run the below command from the /backend folder to generate the Python gRPC files.

```bash
python3 -m grpc_tools.protoc -I./proto --python_out=./services/proto --grpc_python_out=./services/proto ./proto/service.proto
```

Run the below command from the /backend folder to generate the Go gRPC files.

```bash
protoc --proto_path=./proto --go_out=./api/proto --go_opt=paths=source_relative --go-grpc_out=./api/proto --go-grpc_opt=paths=source_relative ./proto/service.proto
```

## API Usage

```bash
curl --location 'http://localhost:8080/api/ask' \
--header 'Content-Type: application/json' \
--data '{
    "ai_selected": ["CHATGPT", "CLAUDE"],
    "request_text": "Hello!"
}'
```

## Commands to run

```bash
ollama serve
```

```bash
python3 ./backend/services/serve.py
```

```bash
go run .
```

```bash
npm run dev
```

 ## UI
 

https://github.com/user-attachments/assets/f3372d2e-584a-4423-806f-1bb85eac8d7b

