package main

import (
	"fmt"
	"os"
)

func main() {
	fmt.Println("args[0]=", os.Args[0])
	if len(os.Args) > 1 { //当用户传入参数时 以空格为分割符
		for index, v := range os.Args {
			if index == 0 {
				continue
			}
			fmt.Printf("args[%d]=%v\n", index, v)
		}
	}
}

// os.Args[0] 为当前的程序名
// args[1]=aabb
// args[2]=ccdd
// args[3]=未付费
