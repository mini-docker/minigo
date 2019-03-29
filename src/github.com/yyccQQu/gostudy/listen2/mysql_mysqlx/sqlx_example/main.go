package main

import (
	"database/sql"
	"fmt"

	_ "github.com/go-sql-driver/mysql"
	"github.com/jmoiron/sqlx"
)

var DB *sqlx.DB

func initDb() error {
	var err error
	dsn := "root:root@tcp(localhost:33061)/agency_dev"
	DB, err = sqlx.Open("mysql", dsn)
	if err != nil {
		return err
	}

	DB.SetMaxOpenConns(100)
	DB.SetMaxIdleConns(16)
	return nil
}

type GolangDb struct {
	Id   int64          `db:"id"`
	Name sql.NullString `db:"name"`
	Age  int            `db:"age"`
}

func testQuery() {
	sqlstr := "select id, name, age from golang_db where id=?"
	var user GolangDb

	err := DB.Get(&user, sqlstr, 2)
	if err != nil {
		fmt.Printf("get failed, err:%v\n", err)
		return
	}

	fmt.Printf("user:%#v\n", user)
}

func testQueryMulti() {
	sqlstr := "select id, name, age from golang_db where id>?"
	var user []GolangDb

	//返回一个 ID>1的 数组
	err := DB.Select(&user, sqlstr, 1)
	if err != nil {
		fmt.Printf("get failed, err:%v\n", err)
		return
	}

	fmt.Printf("user:%#v\n", user)
}

func testUpdate() {
	sqlstr := "update golang_db set name=? where id=?"
	result, err := DB.Exec(sqlstr, "abc", 1)
	if err != nil {
		fmt.Printf("update failed, err:%v\n", err)
		return
	}
	count, err := result.RowsAffected()
	if err != nil {
		fmt.Printf("affected rows failed, err:%v\n", err)
		return
	}
	fmt.Printf("affect rows:%d\n", count)
}

func queryDB(name string) {
	sqlstr := fmt.Sprintf("select id, name, age from golang_db where name='%s'", name)
	fmt.Printf("sql:%s\n", sqlstr)
	var user []GolangDb
	err := DB.Select(&user, sqlstr)
	if err != nil {
		fmt.Printf("select failed, err:%v\n", err)
		return
	}

	for _, v := range user {
		fmt.Printf("user:%#v\n", v)
	}
}

func queryDBBySqlx(name string) {
	sqlstr := "select id, name, age from golang_db where name=?"
	//fmt.Printf("sql:%s\n", sqlstr)
	var user []GolangDb
	err := DB.Select(&user, sqlstr, name)
	if err != nil {
		fmt.Printf("select failed, err:%v\n", err)
		return
	}

	for _, v := range user {
		fmt.Printf("user:%#v\n", v)
	}
}

func testSqlInject() {
	// and 并且
	// union 或
	// queryDB("abc' or 1 = 1 #")
	// queryDB("name=abc' and (select count(*) from golang_db ) < 10#")
	// queryDB("name=123' union select *from golang_db #")
	queryDBBySqlx("name=123' union select *from golang_db #")
}

func main() {

	err := initDb()
	if err != nil {
		fmt.Printf("init db failed, err:%v\n", err)
		return
	}

	testQuery()
	testQueryMulti()
	testUpdate()
	testSqlInject()
}
