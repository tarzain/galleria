function ajax(url, params, callback){
    // populate URL params
    param_names = Object.keys(params);

    for (var i = param_names.length - 1; i >= 0; i--) {
      param_name = param_names[i];
      url += param_name + '=' + params[param_name] + '&';
    }

    var xhr;
    
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

  ajax(BASE_URL, params, callback);
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
        imageId = parseInt(event.getAttribute('data-id'));
        renderImage(imageId);
    }
}

var preloadImages = function(imageId){
  // for slow connections, when the lightbox is open 
  // we preload the previous and next images in the gallery
  begin = imageId > 0 ? imageId - 1 : 0;
  end = imageId < results.length-1 ? imageId + 2 : results.length-1;
  neighbors = results.slice(begin, end);

  // initialize preload container with 3 empty image elements
  preloadContainer = document.getElementById('preload');
  while(preloadContainer.children.length < 3){
    preloadTemplate = preloadContainer.children[0].cloneNode(true);
    preloadContainer.appendChild(preloadTemplate);
  }

  for (var i = neighbors.length - 1; i >= 0; i--) {
    preloadContainer.children[i].setAttribute('src', neighbors[i]['images']['original']['url']);
  }
}

var renderImage = function(imageId){
    preloadImages(imageId);

    imageUrl = results[imageId]['images']['original']['url'];
    imageTitle = results[imageId]['slug'].split('-').slice(0,-1).join(' ');
    lightboxImage = document.getElementById('bigImage').getElementsByTagName('img')[0];
    lightboxTitle = document.getElementById('bigImage').getElementsByTagName('p')[0];

    lightboxImage.style.backgroundImage = 'url("'+results[imageId]['images']['fixed_height_downsampled']['url']+'")';
    lightboxImage.setAttribute('src', imageUrl);
    lightboxTitle.innerHTML = imageTitle;
}

var prevImage = function(){
  if(imageId > 0){
    imageId--;
    renderImage(imageId);
  }
}

var nextImage = function(){
  if(imageId < results.length-1){
    imageId++;
    renderImage(imageId);
  }
}

var checkKey = function(e) {
    e = e || window.event;

    if (e.keyCode === 37) {
      prevImage();
    }
    else if (e.keyCode === 39) {
      nextImage();
    }
    else if (e.keyCode === 27) {
        toggleLightbox(e);
    }
}