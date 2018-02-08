  // request 数据排序
function  mySort(data){
    var sdic = Object.keys(data).sort();
    var hash = '';
    for (var i = 0; i < sdic.length; i++) {
      if (i == 0) {
        hash += sdic[i] + "=" + data[sdic[i]];
      } else {
        hash += "&" + sdic[i] + "=" + data[sdic[i]];
      }
    }
    return hash
}
