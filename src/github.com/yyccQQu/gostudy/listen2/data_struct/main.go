package main


import (
	"fmt"
	"strings"
	"none/minigo/src/github.com/yyccQQu/gostudy/listen2/access"
)

func testBool() {
	var a bool
	fmt.Println(a)
	a = true
	fmt.Println(a)

	a = !a
	fmt.Println(a)

	var b bool = true
	if a == true && b == true {
		fmt.Println("right")
	} else {
		fmt.Println("not right")
	}

	if a == true || b == true {
		fmt.Println("|| right")
	} else {
		fmt.Println("||not right")
	}

	fmt.Printf("%t %t\n", a, b)
}

func testInt() {
	var a int8 
	a = 18
	fmt.Println("a=", a)
	a = -12
	fmt.Println("a=", a)

	var b int
	b = 138338338

	b = int(a)
	fmt.Println("b=", b)


	var c  = 5.6
	fmt.Println(c)

	fmt.Printf("a=%d a=%x c=%f\n", a, a, c)
}

func testStr() {
	var a  string
	a = "a:hello"
	fmt.Println(a)

	b := a
	fmt.Println(b)    
	
	c := "c:\nhello"
	fmt.Println(c)   

	fmt.Printf("a=%v b=%v c=%v\n", a, b, c)
	c = `
	chuang qian ming yue guang
	ying shi dishang shuang
	`
	fmt.Printf("a=%v b=%v c=%v\n", a, b, c)
    //var clen int
	//clen = len(c)
	clen := len(c)
	fmt.Printf("len of c =%d\n", clen)

	c = c + c
	fmt.Printf("c =%s\n", c)
	c = fmt.Sprintf("%s%s", c, c)
	fmt.Printf("c =%s\n", c)
	ips := "10.108.34.30;10.108.34.31"

	ipArray:= strings.Split(ips, ";")
	fmt.Printf("first ip :%s\n", ipArray[0])
	fmt.Printf("second ip :%s\n", ipArray[1])

	result := strings.Contains(ips, "10.108.34.31")// ips是否包含后面的内容
	fmt.Println(result)

	str := "http://baidu baidu.com"
	if strings.HasPrefix(str, "http") { //是否有http关键字
		fmt.Printf("str is http url /")
	} else {
		fmt.Printf("str is not http url")
	}

	if strings.HasSuffix(str, "baidu.com") {//是否是网址
		fmt.Printf("str is baidu url /")
	} else {
		fmt.Printf("str is not baidu url")
	}

	index := strings.Index(str, "baidu") //查找baidu在字符串中的下标
	fmt.Printf("baidu is index:%d\n", index)
	index = strings.LastIndex(str, "baidu")
	fmt.Printf("baidu last index:%d\n", index)

	var strArr []string  = []string{"10.237.8.2", "10.237.8.3", "10.237.8.3"}
	resultStr := strings.Join(strArr, ";")//拼接字符串
	fmt.Printf("result=%s\n", resultStr)
}


func testOperator() {
	var a int = 2
	if a != 2 {
		fmt.Printf("is right\n")
	} else {
		fmt.Printf("is not right\n")
	}

	a = a + 100
	fmt.Printf("a=%d\n", a)
}

func testAccess() {
	fmt.Printf("access.a=%d\n", access.A)
}
func main() {
	testBool()
	testInt()
	testStr()
	testOperator()
	//testAccess()
}