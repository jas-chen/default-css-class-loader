# default css class loader for webpack

## What
This loader adds `toString()` to a style object that load via css-loader.

By default it will return `.root`.

**style.css**
```css
.root {
  border: 1px solid #ddd;
}
```

#### Before
```javascript
const style = require('./style.css');

console.log(style);      // [object Object]
console.log(style.root); // root___1J7bD
```

#### After
```javascript
const style = require('./style.css');

console.log(style);      // root___1J7bD
console.log(style.root); // root___1J7bD
```

## Why
BEM style like CSS naming conventions with CSS-Modules made easy.

```javascript
import React from 'react';
const Button = require('./button.scss');

const PrimaryButton = (
  <button className={`${Button} ${Button._primary}`}>Hi</button>
)
```

```javascript
import React from 'react';
const searchForm = require('./searchForm.scss');

const SearchForm = (
  <form className={`${searchForm}`}>
    <input className={`${searchForm.input}`}>
    <button className={`${searchForm.button} ${searchForm.button_disabled}`}>
      Search
    </button>
  </form>
)
```

## Install
```
npm install --save-dev default-css-class-loader
```

You need to install [css-loader](https://github.com/webpack/css-loader) too.

## Setup

**webpack.config.js**

```javascript
module.exports = {
  module: {
    loaders: [
      {
        test: /\.css$/,
        loader: 'style!default-css-class!css?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]'
      }
    ]
  }
};
```


## Config

Use `name` to customize the default class name.
```
default-css-class?name=base
```
