const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}
function maxNum(arr){
    var num = parseFloat(arr[0]);
    for(var i=0;i<arr.length;i++){
        if(num < parseFloat(arr[i])){
            num = arr[i]
        }
    }
    return num;    
}
module.exports = {
  formatTime: formatTime,
  maxNum:maxNum
}
