package main

import (
	"fmt"
)

func funcA() int {
	x := 5
	defer func() {
		x += 1
	}()
	return x
}

func funcB() (x int) { //返回的是x的int类型值 6
	defer func() {
		x += 1
	}()
	return 5
}

func funcC() (y int) { // 5
	x := 5
	defer func() {
		x += 1
	}()
	return x
}

func funcD() (x int) { //5
	defer func(x int) {
		x += 1
	}(x)
	return 5
}

func main() {
	// fmt.Println(funcA())
	fmt.Println(funcB())
	// fmt.Println(funcC())
	// fmt.Println(funcD())
}

// 5
// 6
// 5
// 5
