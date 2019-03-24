package main

import (
	"bufio"
	"fmt"
	"io"
	"os"
)

func main() {
	//只读的方式打开
	file, err := os.Open("./buf.go")
	if err != nil {
		fmt.Println("open file failed, err:", err)
		return
	}
	defer file.Close()
	reader := bufio.NewReader(file) //读取文件
	for {
		line, err := reader.ReadString('\n') //循环读取每一行
		if err == io.EOF {
			break
		}
		if err != nil {
			fmt.Println("read file failed, err:", err)
			return
		}
		fmt.Println(line) //循环打印每一行
	}
}
