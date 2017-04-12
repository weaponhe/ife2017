var Observer = require('./Observer')
let app1 = new Observer({
    name: 'youngwind',
    age: 25
});

let app2 = new Observer({
    university: 'bupt',
    major: 'computer'
});


app1.$watch('name', function () {
    console.log("你修改了name")
})


// 要实现的结果如下：
console.log(app1.data.name)
app1.data.name = "weapon"
console.log(app1.data.name)
