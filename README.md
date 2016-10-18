# Galleria: a simple vanilla JS image gallery
This gallery demo retrieves 20 photos from the [GIPHY API](https://github.com/Giphy/GiphyAPI) and displays them in a responsive gallery that works well across modern desktop and mobile browsers, with smart preloading for low bandwidth users. All of this with no dependencies, just plain ol' HTML5, Javascript, and CSS.

Check out the [live demo](http://tarzain.com/galleria)

### Features:
+ Load from any public API
+ Responsive grid design
+ Smart preloading for low bandwidth
+ Minimalist lightbox view

## Installation:
To run this yourself you'll need to clone the repository:
`git clone git@github.com:tarzain/galleria.git`

then cd into the directory:
`cd galleria`

and add your Giphy API key to the `config.js` file:
`echo "var API_KEY = [INSERT_YOUR_API_KEY_HERE];" >> config.js`