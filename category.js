import {GetData, RenderCategoryList,listCategory } from './source.js';

//const source = require('./source');
const $menuList = document.getElementsByClassName('dropdown-menu')[0];
const list = listCategory;
(  function load() {
    RenderCategoryList(listCategory,$menuList);
})()