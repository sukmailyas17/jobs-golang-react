package db

import "sukma-go-crud/internal/entity"

type Model struct {
	Model interface{}
}

func MigrateModels() []Model {
	return []Model{
		{Model: entity.JobEntity{}},
	}
}
