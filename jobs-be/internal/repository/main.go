package repository

import (
	"sukma-go-crud/internal/entity"
	"sukma-go-crud/internal/pkg/db"

	"gorm.io/gorm"
)

type RepoInf interface {
	Get(filter []string) ([]*entity.JobEntity, error)
	GetByID(id int) (*entity.JobEntity, error)
}

type RepoStruct struct {
	DB *gorm.DB
}

func NewRepository(db db.DBMysqlInf) RepoInf {
	return &RepoStruct{
		DB: db.Client(),
	}
}
