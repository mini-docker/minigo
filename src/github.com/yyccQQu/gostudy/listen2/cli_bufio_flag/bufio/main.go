package main

import (
	"bufio"
	"fmt"
	"os"
)

func main() {
	var str string
	/*
		fmt.Scanf("%s", &str)
		fmt.Println("read from fmt:", str)
	*/
	// 带缓冲的读写
	reader := bufio.NewReader(os.Stdin) //标准输入
	str, _ = reader.ReadString('\n')    //输入回车即可打印
	fmt.Println("read from bufio:", str)

	// 未带缓冲的读写
	var buf [16]byte
	os.Stdin.Read(buf[:])
	fmt.Println(string(buf[:]))
	os.Stdout.WriteString(string(buf[:]))
}

func mytest() {
	fmt.Println("this is a good day")
}
