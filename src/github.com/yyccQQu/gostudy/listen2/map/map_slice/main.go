package main

import (
	"fmt"
		)

func sliceMap() {
	//rand.Seed(time.Now().UnixNano())
	var s []map[string]int
	s = make([]map[string]int, 5, 16)
	for index, val := range s {
		fmt.Printf("slice[%d]=%v\n", index, val)// 0 map[string]int
	}

	fmt.Println()
	s[0] = make(map[string]int, 16)
	s[0]["stu01"] = 1000
	s[0]["stu02"] = 1000
	s[0]["stu03"] = 1000
	fmt.Println(s) //[map[stu02:1000 stu01:1000 stu03:1000]

	for index, val := range s {
		fmt.Printf("slice[%d]=%v\n", index, val) //0,map[stu02:1000 stu01:1000 stu03:1000]
	}
}

func mapSlice() {
	//rand.Seed(time.Now().UnixNano())
	var s map[string][]int
	s = make(map[string][]int, 16)//map[string][]int
	key := "stu01"
	value, ok := s[key]// []int
	if !ok {
		s[key] = make([]int, 0, 16)
		value = s[key]
	}

	value = append(value, 100)
	value = append(value, 200)
	value = append(value, 300)
	s[key] = value //[100,200,300]
	fmt.Printf("map:%v\n", s) // map[stu01:[100,200,300]]
}

func main() {
	sliceMap()
	mapSlice()
}
