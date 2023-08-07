mod:
	go mod tidy

run:mod
	go run main.go serve

lint:
	golangci-lint run --fix

test:mod lint
	go test -count=1 -race -v ./...

# generate mock file
mock:
	mockgen -source=./internal/service/main.go -destination=./internal/service/mocks/mock_interface.go --package=mocks;
	mockgen -source=./internal/repository/main.go -destination=./internal/repository/mocks/mock_interface.go --package=mocks;