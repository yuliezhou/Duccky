export const ajax = (params) => {

    try {

        if(typeof params.url == 'undefined'){
            throw "error: 没求得url,不知道请求的啥子";
        }

        if(typeof params.method == 'undefined'){
            params.method = 'get';
        }

        if(typeof params.send == 'undefined'){
            params.send = {};
        }

        if(typeof params.callback == 'undefined'){
            throw "没得回调函数,不让调用";
        }

        if(typeof params.async == 'undefined'){
            params.async = false;
        }

        if(typeof params.data_type == 'undefined'){
            params.data_type = 'json';
        }

        if(params.method == 'get'){
            var query = [];
            for (var i in params.send){
                query.push(i+'='+params.send[i]);
                query.join('&');
            }
            if(query != ''){
                params.url += (params.url.indexOf('?' == -1) ? '?' : '') + query;
            }
        }

        if(params.method == 'post'){
            var arrs = [];
            for (var i in params.send){
                arrs.push(i+'='+params.send[i]);
            }
            params.send = arrs.join('&');
        }

        var xhr = window.XMLHttpRequest ?  new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
        xhr.open(params.method,params.url,params.async);
        if(params.method == 'post'){
            xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
            xhr.send(params.send);
        }else{
            xhr.send(null);
        }


        if(params.async == true){
            xhr.onreadystatechange = function(){
              if(xhr.readyState == 4){
                  if(xhr.status == 200){
                      var data = xhr.responseText;
                      if(params.data_type == 'json'){
                          data = JSON.parse(data);
                      }
                      params.callback(data, xhr);
                      
                  } else {
                      console.log('error:' + xhr.status + xhr.statusText);
                  }
              }
            }
        }

        if(params.async == false){
            if(xhr.status == 200){
                 var data = xhr.responseText;
                 if(params.data_type == 'json'){
                     data = JSON.parse(data);
                 }
                 params.callback(data, xhr);
            }else{
                 console.log('error:' + xhr.status + xhr.statusText);
            }
        }

    } catch (e){
     console.log(e);
    }

}
/*
ajax({
    url: 'http://m.lanmaosw.com/cash/index.html',
    callback: function(xhr, data){
        console.log(data);
    }
})
*/
