package service

import (
	"sukma-go-crud/internal/repository"
)

type ServiceIntf interface {
	GetService(level, employment string) (interface{}, error)
	GetServiceByID(id int) (interface{}, error)
}

type serviceStruct struct {
	Repo repository.RepoInf
}

func NewService(repo repository.RepoInf) ServiceIntf {
	return &serviceStruct{
		Repo: repo,
	}
}
