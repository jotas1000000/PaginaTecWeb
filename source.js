const urlApi='https://www.etnassoft.com/api/v1/get/';
const $ListOne = document.getElementById('ListOne');
const $ListTwo = document.getElementById('ListTwo');
const $ListThree = document.getElementById('ListThree');
const $ListFour = document.getElementById('ListFour');
const $ListFive = document.getElementById('ListFive');
const $ListSix = document.getElementById('ListSix');

const $imgLeft = document.getElementById('img-left');
const $titleLeft = document.getElementById('title-left');
const $textLeft = document.getElementById('text-left');

const $menuList = document.getElementsByClassName('dropdown-menu')[0];

const $buttonNav = document.getElementById('buttonNav');

let listCategory = '';

let NavTo = '';

function RunNavTo(dirNavTo) {
    
    location.href="category.html?"+escape(dirNavTo);
}


async function GetData(restApi) {
    let response = await fetch(`${urlApi}${restApi}`);
    let data = await response.json();
    //debugger
    return data;
}

function createTemplate(HTMLString){
    const html = document.implementation.createHTMLDocument();
    html.body.innerHTML = HTMLString;
    return html.body.children[0];
}

function HTMLStringTemplate(book) {
   // debugger
    return (
    `
    <div class="primaryPlaylistItem" data-id="${book.ID}" data-img=${book.cover} data-content_short="${book.content_short}" data-title="${book.title}">
        <div class="primaryPlaylistItem-image">
            <img src="${book.thumbnail}">
        </div>
        <h4 class="primaryPlaylistItem-title">
        ${book.title}
        </h4>
    </div>
    `);
}

function RechargeLeftSide(id,img,title,content) {
    SetAttributes($imgLeft, {
        src : img
    });
    $titleLeft.textContent = title;
    $textLeft.textContent = content;
    
}

function AddEventClick($element) {
    $element.addEventListener('click',() => {
        RechargeLeftSide($element.dataset.id,
            $element.dataset.img,
            $element.dataset.title,
            $element.dataset.content_short)
    });
}

function SetAttributes($element,attributes) {
    for(const attribute in attributes) {
        //debugger
        $element.setAttribute(attribute,attributes[attribute]);
    }
}

async function ChargeLeftSide(restUrl) {
    let dataLeftSide = await GetData(restUrl);
    SetAttributes($imgLeft, {
        src : dataLeftSide[0].cover
    });
    $titleLeft.textContent = dataLeftSide[0].title;
    $textLeft.textContent = dataLeftSide[0].content_short;
}

function RenderCategoryList(list, $dropdownContainer) {
    list.forEach(element => {
        const HTMLString = `<a class="dropdown-item" id="${element.nicename}" href="#">${element.name}</a>`;
        const categoryElement = createTemplate(HTMLString);
        $dropdownContainer.append(categoryElement);
        categoryElement.addEventListener('click',(event) => {
            //debugger
            NavTo = event.srcElement.id;
            RunNavTo(NavTo);
        });
    });
}

(async function load() {

    listCategory = await GetData('?get_categories');
    RenderCategoryList(listCategory,$menuList);

    await ChargeLeftSide('?book_author=LUDEK PACHMAN');
    
    function RenderBookList(list, $listContainer) {
        if($listContainer.children[0] != null) {
            $listContainer.children[0].remove();
        }
        list.forEach(element => {
           // debugger
            const HTMLString = HTMLStringTemplate(element);
            const BookElement = createTemplate(HTMLString);
            $listContainer.append(BookElement);
            const $img = BookElement.querySelector('img');
            $img.addEventListener('load',event => {
                event.srcElement.classList.add('fadeIn');
            });
            AddEventClick(BookElement);
        });
    }
    let listOne = await GetData('?category=libros_programacion&criteria=most_viewed');
    RenderBookList(listOne,$ListOne);
    let listTwo = await GetData('?category=arte-bellas-artes&criteria=most_viewed');
    RenderBookList(listTwo,$ListTwo);
    let listThree = await GetData('?category=comics&criteria=most_viewed');
    RenderBookList(listThree,$ListThree);
    let listFour = await GetData('?category=desarrollo_web&criteria=most_viewed');
    RenderBookList(listFour,$ListFour);
    let listFive = await GetData('?category=cine&criteria=most_viewed');
    RenderBookList(listFive,$ListFive);
    let listSix = await GetData('?category=marketing_y_business&criteria=most_viewed');
    RenderBookList(listSix,$ListSix);
    
    $buttonNav.addEventListener('click',() => {
    });
})();

export {GetData,RenderCategoryList,listCategory,RunNavTo};