package server

import (
	"net/http"
	"net/http/httptest"
	"sukma-go-crud/internal/service/mocks"
	"testing"

	"github.com/gin-gonic/gin"
	"github.com/golang/mock/gomock"
	"github.com/stretchr/testify/assert"
)

func Test_get(t *testing.T) {
	testCases := []struct {
		httpCode int
		nameFunc string
		expected string
		doMock   func(mock *mocks.MockServiceIntf)
	}{
		{
			httpCode: 200,
			nameFunc: "positive test",
			expected: `{"data":"{\"name\":\"ok\"}", "message":"success", "status":"ok"}`,
			doMock: func(mock *mocks.MockServiceIntf) {
				mock.EXPECT().GetService(gomock.Any(), gomock.Any()).Return(`{"name":"ok"}`, nil).AnyTimes()
			},
		},
	}
	for _, v := range testCases {
		t.Run(v.nameFunc, func(t *testing.T) {
			gin.SetMode(gin.TestMode)
			mockCtrl := gomock.NewController(t)
			defer mockCtrl.Finish()
			mockInfra := mocks.NewMockServiceIntf(mockCtrl)
			v.doMock(mockInfra)
			req, err := http.NewRequest("GET", "/get", nil)
			if err != nil {
				t.Fatal(err)
			}
			rr := httptest.NewRecorder()
			r := gin.Default()
			r.Use(get(mockInfra))
			r.ServeHTTP(rr, req)
			assert.Equal(t, v.httpCode, rr.Code)
			assert.JSONEq(t, v.expected, rr.Body.String())
		})
	}
}
