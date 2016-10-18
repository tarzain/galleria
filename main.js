function callAjax(url, params, callback){
    // populate URL params
    param_names = Object.keys(params);

    for (var i = param_names.length - 1; i >= 0; i--) {
      param_name = param_names[i];
      url += param_name + '=' + params[param_name] + '&';
    }

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
  var BASE_URL = 'http://api.giphy.com/v1/gifs/search?';
  var params = {'q' : search_tag, 'api_key' : API_KEY, 'limit' : n_images};

  callAjax(BASE_URL, params, callback);
}

var resultsCallback = function(data){
    results = JSON.parse(data)['data'];
    gallery = document.getElementById('gallery');

    for(var i = 0; i<=results.length-1; i++){
        galleryItem = document.getElementById('gallery').children[0];
        if(i > 0){
            galleryItem = galleryItem.cloneNode(true);
            gallery.appendChild(galleryItem);
        }

        img_url = results[i]['images']['fixed_height_downsampled']['url']
        img_title = results[i]['slug'].split('-').slice(0,-1).join(' ');

        galleryItem.setAttribute('data-id', i);

        image = galleryItem.children[0].getElementsByTagName('img')[0];

        image.setAttribute('src', img_url);
        image.setAttribute('title', img_title)
    }
}

var toggleLightbox = function(event){
    document.getElementById('lightbox').classList.toggle('show');

    if(event.className === 'item'){
        imageId = event.getAttribute('data-id');
        renderImage(imageId);
    }

}

var renderImage = function(imageId){
    imageUrl = results[imageId]['images']['original']['url'];
    lightboxImage = document.getElementById('bigImage').getElementsByTagName('img')[0];
    lightboxImage.setAttribute('src', imageUrl);
}

var checkKey = function(e) {
    e = e || window.event;

    if (e.keyCode === 37) {
        if(imageId > 0){
            imageId--;
            renderImage(imageId);
        }
    }
    else if (e.keyCode === 39) {
        if(imageId < results.length-1){
            imageId++;
            renderImage(imageId);
        }
    }
    else if (e.keyCode === 27) {
        toggleLightbox(e);
    }
}