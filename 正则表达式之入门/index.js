function validatePhoneNumber(str)
{
  var reg = /^(?:13[0-9]|15[7-9]|153|156|18[7-9])[0-9]{8}$/
  return reg.test(str)
}

function validateAdjacentDuplicatedWords(str)
{
  var reg = /(\b\w+\b)\s+\1/g;
  return reg.test(str)
}

var str0 = '18812011232'  // 测试结果应该为 true
var str1 = '18812312'     // false
var str2 = '12345678909'  // false

console.log(validatePhoneNumber(str0))
console.log(validatePhoneNumber(str1))
console.log(validatePhoneNumber(str2))


var str3 = 'foo foo bar'      // true
var str4 = 'foo bar foo'      // false  有重复单词但是不相邻
var str5 = 'foo  barbar bar'  // false

console.log(validateAdjacentDuplicatedWords(str3))
console.log(validateAdjacentDuplicatedWords(str4))
console.log(validateAdjacentDuplicatedWords(str5))