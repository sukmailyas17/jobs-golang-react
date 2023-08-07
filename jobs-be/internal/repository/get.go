package repository

import (
	"strings"
	"sukma-go-crud/internal/entity"
)

func (r *RepoStruct) Get(filter []string) ([]*entity.JobEntity, error) {
	var datas []*entity.JobEntity
	var x interface{}
	if len(filter) > 0 {
		x = r.DB.Where(strings.Join(filter, " AND "))
	}
	tx := r.DB.Find(&datas, x)
	if tx.Error != nil {
		return nil, tx.Error
	}
	return datas, nil
}

func (r *RepoStruct) GetByID(id int) (*entity.JobEntity, error) {
	var datas *entity.JobEntity
	tx := r.DB.First(&datas, id)
	if tx.Error != nil {
		return nil, tx.Error
	}
	return datas, nil
}
