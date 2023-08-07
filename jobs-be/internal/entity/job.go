package entity

import "time"

type Game struct {
	Team1  string
	Team2  string
	Score1 int
	Score2 int
}

type SaveRequest struct {
	Mdate   string `json:"mdate" binding:"required"`
	Stadium string `json:"stadium" binding:"required"`
	Team1   string `json:"team1" binding:"required"`
	Team2   string `json:"team2" binding:"required"`
}

type JobEntity struct {
	ID             int       `gorm:"primaryKey;autoIncrement" json:"id"`
	Position       string    `json:"position" binding:"required"`
	Level          string    `json:"level" binding:"required"`
	EmploymentType string    `json:"employment_type" binding:"required"`
	LevelText      string    `json:"level_text" binding:"required"`
	Qualification  string    `json:"qualification" binding:"required"`
	Experience     string    `json:"experience" binding:"required"`
	Skills         string    `json:"skills" binding:"required"`
	Benefit        string    `json:"benefit" binding:"required"`
	ImageUrl       string    `json:"image_url" binding:"required"`
	Description    string    `json:"description" binding:"required"`
	CreatedAt      time.Time `gorm:"autoCreateTime" json:"createdAt"`
	UpdatedAt      time.Time `gorm:"autoUpdateTime:milli" json:"updatedAt"`
}

// TableName is renaming entity
func (JobEntity) TableName() string {
	return "job_detail"
}
