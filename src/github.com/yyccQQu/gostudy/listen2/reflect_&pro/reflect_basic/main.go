package main

import (
	"fmt"
	"reflect"
)

func reflect_example(a interface{}) {
	t := reflect.TypeOf(a)
	fmt.Printf("type of a is:%v\n", t)

	k := t.Kind()
	fmt.Println(k, "kkkk") //map
	switch k {
	case reflect.Int64:
		fmt.Printf("a is int64\n")
	case reflect.String:
		fmt.Printf("a is string\n")
	}
}

func reflect_value(a interface{}) {
	v := reflect.ValueOf(a)
	t := reflect.TypeOf(a)
	fmt.Println(v, t, "vtvt") //map[int]main.Wofule
	k := v.Kind()
	//fmt.Printf("a store value is :%d\n", v.Int())
	switch k {
	case reflect.Int64:
		fmt.Printf("a is int64, store value is:%d\n", v.Int())
	case reflect.Float64:
		fmt.Printf("a is float64, store value is:%f\n", v.Float())
	}
}

func reflect_set_value(a interface{}) {
	v := reflect.ValueOf(a)
	// t := reflect.TypeOf(a)
	k := v.Kind()
	//fmt.Printf("a store value is :%d\n", v.Int())
	switch k {
	case reflect.Int64:
		v.SetInt(100)
		fmt.Printf("a is int64, store value is:%d\n", v.Int())
	case reflect.Float64:
		v.SetFloat(6.8)
		fmt.Printf("a is float64, store value is:%f\n", v.Float())
	case reflect.Ptr:
		fmt.Printf("set a to 6.8\n")
		v.Elem().SetFloat(6.8)
	default:
		fmt.Printf("default switch\n")
	}
}

var arr map[int]Wofule = make(map[int]Wofule, 0)

type Wofule struct {
	newbe int
	nam   string
	woqu  string
}

func main() {
	var x float64 = 3.4
	reflect_example(x)
	arr[0] = Wofule{1, "fule", "woqu"}
	arr[1] = Wofule{2, "fule", "woqu"}

	reflect_example(arr)

	reflect_value(arr)
	reflect_value(x)
	reflect_set_value(&x)
	// fmt.Printf("x value is %v\n", x)
	/*
		var b *int = new(int)
		*b = 100
	*/
}
