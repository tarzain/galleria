function callAjax(url, params, callback){
    
    param_names = Object.keys(params);

    for (var i = param_names.length - 1; i >= 0; i--) {
      param_name = param_names[i];
      url += param_name + '=' + params[param_name] + '&';
    }

    console.log(url);
    
    var xhr;
    // compatible with IE7+, Firefox, Chrome, Opera, Safari
    xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function(){
        if (xhr.readyState == 4 && xhr.status == 200){
            callback(xhr.responseText);
        }
    }
    xhr.open("GET", url, true);
    xhr.send();
}

var searchGiphy = function(search_tag, n_images, callback){
  // this function will return n thumbnail urls for a given search tag query
  var BASE_URL = 'http://api.giphy.com/v1/gifs/search?';
  var params = {'q' : search_tag, 'api_key' : API_KEY, 'limit' : n_images};
  callAjax(BASE_URL, params, callback);
}