package service

func (s *serviceStruct) GetService(level, employment string) (interface{}, error) {
	var filter []string
	if level != "" {
		filter = append(filter, "level_text LIKE '%"+level+"%'")
	}
	if employment != "" {
		filter = append(filter, "employment_type LIKE '%"+employment+"%'")
	}
	return s.Repo.Get(filter)
}
func (s *serviceStruct) GetServiceByID(id int) (interface{}, error) {
	return s.Repo.GetByID(id)
}
