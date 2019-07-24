/*use demo
db.users.insert({name: 'jack', age: 18})
db.logs.insert({name: 'jack', age: 18})
db.users.find()
/!*
	数据库CRUD操作 增删改查
	C - create 增
		db.collections.insert(文档对象) 向当前数据（db）中指定集合（collections）内插入一条文档数据（文档对象）
	R - read 查
		db.collections.find(查询条件[, 投影])
		db.collections.findOne(查询条件[, 投影])
		- 操作符
			1. < <= > >= $lt $lte $gt $gte
			2. 与 或  $or $in 非  $ne
			3. 正则表达式
			4. $where
	U - update 改
		db.collections.updateOne(查询条件, 更新内容)
		db.collections.updateMany(查询条件, 更新内容)
	D - delete 删
		db.collections.deleteOne(查询条件)
		db.collections.deleteMany(查询条件)
*!/
db.users.insert({name: 'jerry', age: 19})

db.users.find({name: 'jack', age: 18})
db.users.find({age: {$gte: 18}})
db.users.find({age: {$in: [18, 20]}})
db.users.find({$or: [{age: 18}, {age: 16}]})
db.users.find({age: {$ne: 18}})
// age: 0 过滤age字段，其他字段保留下来
db.users.find({name: /^j/}, {age: 0, _id: 0})
// name: 1 只保留name字段，其他的过滤
// _id牛逼。必须设置为0才会过滤，否则一定会保留
db.users.find({name: /^j/}, {name: 1, _id: 0})

db.users.find({$where: function () {
	return this.name === 'jack' || this.age === 16;
}})

db.users.findOne({})
db.users.find({})

db.users.updateOne({name: 'jack'}, {$set: {age: 19}})
db.users.updateMany({}, {$inc: {age: -3}})*/


