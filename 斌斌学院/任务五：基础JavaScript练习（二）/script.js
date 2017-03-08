var input      = document.getElementById('input'),
    optionArea = document.getElementById('option-area'),
    showArea   = document.getElementById('show-area')

optionArea.onclick = function (e)
{
  var target = e.target
  if (target.nodeName != 'BUTTON') {
    return
  }
  var value = parseFloat(input.value)
  if (isNaN(value) || value < 10 || value > 100)
  {
    alert("输入的数字要在[10,100]范围内")
    return
  }

  var id = target.id
  if (id === 'left-in') {
    leftIn(value)
  } else if (id === 'right-in') {
    rightIn(value)
  } else if (id === 'left-out') {
    leftOut(value)
  } else if (id === 'right-out')
  {
    rightOut(value)
  }
}

showArea.onclick = function (e)
{

}

input.onkeydown = function (e)
{
  //处理输入的合法性
  if (e.keyCode === 8 || e.keyCode === 37 || e.keyCode === 39)
  {
    return
  }

  var valid = false,
      value = this.value + e.key,
      reg   = /^[+-]?\d+\.?\d*$/
  if (reg.test(value)) {
    valid = true
  }
  !valid && e.preventDefault()
}

function getEventObject(e)
{

}
function checkNotEmptyArray()
{
  return showArea.querySelectorAll('span').length
}
function checkOverflow()
{
  if (showArea.querySelectorAll('span').length >= 60) {
    alert("添加的数字不能超过60个")
    return true
  }
  return false
}
function leftIn(num)
{
  if (checkOverflow()) {
    return
  }
  var item          = document.createElement('span')
  item.style.height = num * 5 + 'px'
  showArea.insertBefore(item, showArea.firstChild)
}

function rightIn(num)
{
  if (checkOverflow()) {
    return
  }
  var item          = document.createElement('span')
  item.style.height = num * 5 + 'px'
  showArea.appendChild(item)
}

function leftOut()
{
  if (checkNotEmptyArray()) {
    showArea.removeChild(showArea.firstElementChild)
  }
}

function rightOut()
{
  if (checkNotEmptyArray()) {
    showArea.removeChild(showArea.lastElementChild)
  }
}
