## 格式化输入

### 从终端获取⽤户的输⼊
- fmt.Scanf(format string, a...interface{}): 格式化输⼊入，空格作为分隔符，占位符和格式化输出⼀一致
- fmt.Scan(a ...interface{}): 从终端获取⽤用户输⼊入，存储在Scanln中的参数⾥里里，空格和换⾏行行符 作为分隔符
- fmt.Scanln(a ...interface{}): 从终端获取⽤用户输⼊入，存储在Scanln中的参数⾥里里，空格作为分隔符， 遇到换⾏行行符结束


### 从字符串中获取输⼊
- fmt.Sscanf(str, format string, a...interface{}): 格式化输⼊入，空格作为分隔符，占位符和格式化输出⼀一致
- fmt.Sscan(str string, a ...interface{}): 从终端获取⽤用户输⼊入，存储在Scanln中的参数⾥里里， 空格和换行符作为分隔符
- fmt.Sscanln(str string, a ...interface{}): 从终端获取⽤用户输⼊入，存储在Scanln中的参数⾥里里， 空格作为分隔符，遇到换行符结束


### 格式化输出
- fmt.Printf(format string, a...interface{}): 格式化输出，并打印到终端
- fmt.Println(a ...interface{}): 把零个或多个变量量打印到终端， 并换⾏行行 fmt.Print(a ...interface{}): 把零个或多个变量打印到终端

### 格式化并返回字符串
- fmt.Sprintf(format string, a...interface{}): 格式化并返回字符串串
- fmt.Sprintln(a ...interface{}): 把零个或多个变量量按空格进⾏行行格式化并换⾏行行，返回字符串串 fmt.Sprint(a ...interface{}): 把零个或多个变量量按空格进⾏行行格式化，返回字符串串

### 终端其实是一个文件
- 终端相关文件的实例例 
- os.Stdin:标准输⼊的文件实例，类型为*File 
- os.Stdout:标准输出的文件实例，类型为*File 
- os.Stderr:标准错误输出的⽂件实例，类型为*File

### 终端读写
- 以⽂件的⽅式操作终端
- 终端读取: File.Read(b []byte)
- 终端输出: File.Write(b []byte) File.WriteString(str string)

### 格式化输⼊
- 从文件获取输⼊
- fmt.Fscanf(file, format string, a...interface{}): 从⽂件格式化输⼊，空格作为分隔符，占位符和格式化输出⼀一致
- fmt.Fscan(file, a ...interface{}): 从文件获取⽤户输⼊，存储在Scanln中的参数⾥，空格和换行符作为分隔符
- fmt.Fscanln(file, a ...interface{}): 从文件获取用户输⼊，存储在Scanln中的参数⾥，空格作为 分隔符，遇到换行符结束

### 格式化输出到文件中
- fmt.Fprintf(file, format string, a...interface{}): 格式化输出，并写入到⽂件中
- fmt.Fprintln(file, a ...interface{}): 把零个或多个变量写入到文件中， 并换行 fmt.Fprint(file, a ...interface{}): 把零个或多个变量写入到文件


### 带缓冲区的读写:
```
package main
    import ( "bufio"
        "fmt"
        "os" )
    var inputReader *bufio.Reader var input string
    var err error
    func main() {
        inputReader = bufio.NewReader(os.Stdin) 
        fmt.Println("Please enter some input: ") 
        input, err = inputReader.ReadString('\n')
        if err == nil {
        fmt.Printf("The input was: %s\n", input) }
    }
```












