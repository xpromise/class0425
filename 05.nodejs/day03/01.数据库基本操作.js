// 切换到test数据库 （如果没有，就会新建： 里面至少存储一条数据才会显示）
use test
use class0425_test

// 展示当前数据库中所有集合
show collections
// 展示所有数据库
show databases
show dbs

// 新建集合 （不需要新建，当你插入一条数据时，会自动创建集合和数据库）
db.students.insert({name: 'jack', age: 18})
// 查找数据
db.students.find({name: 'jack'})


