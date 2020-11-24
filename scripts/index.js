//МАССИВ ВОДНЫХ ДАННЫХ: ------------------------------------------------------------

const hotels = [{
    title: "Albus Hotel Amsterdam City Centre",
    price: 115,
    photo: 'https://cf.bstatic.com/xdata/images/hotel/square600/31881601.webp?k=25b6ebb4be040e97c397ac14ea706c37940679caed81ad3d8c4dddd1f10c71b2&o='
  },
  {
    title: 'Park Plaza Victoria Amsterdam',
    price: 150,
    photo: 'https://cf.bstatic.com/xdata/images/hotel/square600/13334194.webp?k=194460badd8a74b28e1bf59aa917de049ed1c9e1ec252ad26aec1ba492b7f69e&o='
  },
  {
    title: 'Park Inn by Radisson Amsterdam City West',
    price: 95,
    photo: 'https://cf.bstatic.com/xdata/images/hotel/square600/160590097.webp?k=4914b560022372de041f5e8ec2b257bdbbd318035848852193f0e64e04dd9402&o='
  },
  {
    title: 'NH City Centre Amsterdam',
    price: null,
    photo: 'https://cf.bstatic.com/xdata/images/hotel/square600/260988043.webp?k=f080732cb7ec98a4724a49936da46f5c36fa00d31e78cc3c7cc6f51c9e50ed37&o='
  },
  {
    title: 'Mercure Amsterdam Sloterdijk Station',
    price: 54,
    photo: 'https://cf.bstatic.com/xdata/images/hotel/square600/252169240.webp?k=09d57ae22ddc721dac84ccfbdf5433b8561e8995060b41128fb7271f79a075cc&o='
  },
  {
    title: 'Monet Garden Hotel Amsterdam',
    price: 102,
    photo: ''
  },
  {
    title: 'Radisson Blu Hotel, Amsterdam City Center',
    price: 154,
    photo: 'https://cf.bstatic.com/xdata/images/hotel/square600/228897852.webp?k=7b11c21a67b4f8e847628b69e83b7245fe2698b704a2f8245f44a49de5eb814a&o='
  },
  {
    title: 'NH Collection Amsterdam Barbizon Palace',
    price: 172,
    photo: 'https://cf.bstatic.com/xdata/images/hotel/square600/256888798.webp?k=03b5832921f7a206abdc69df10bcb91992fb14b614917e452bd082a2a1abf47e&o='
  },
];

//------------------------------------------------------------------------------



// Объект с текущим состоянием приложения
// sortOrder -- выбранная сортировка
// visibleHotels -- количесто отображаемых отелей
// hotels -- отфильтрованные отели (без отелей без цен)
// isPopupOpen -- открыт ли сейчас попап
const appState = {
  sortOrder: undefined,
  visibleHotels: 3,
  hotels: [],
  isPopupOpen: false,
};

const hotelTemplate = document.querySelector('#hotel-template').content.querySelector('.hotel');
const hotelsWrapper = document.querySelector('.hotels__container');
const showMoreHotelsButton = document.querySelector('.hotels__show-button');
const sortByPriceAscButton = document.querySelector('.hotels__filter-button_type_increment');
const sortByPriceDescButton = document.querySelector('.hotels__filter-button_type_decrement');


const popup = document.querySelector('.popup');
const popupContent = popup.querySelector('.popup__content');

//const closePopupButton = popup.querySelector('.close-popup');

// обработчки кнопки "показать больше"
// меняет количество appState.visibleHotel на максимальное, скрывает кнопку и заново отрисовывает отели
const handleShowMoreHotelClick = (e) => {
  e.preventDefault();

  appState.visibleHotels = appState.hotels.length;
  //showMoreHotelsButton.classList.add('button-show-more_hidden');
  renderHotels();
};

// создание элемента отеля
const renderSingleHotelItem = (hotel) => {
  const element = hotelTemplate.cloneNode(true);
  const hotelPhoto = element.querySelector('.hotel__image');
  const hotelTitle = element.querySelector('.hotel__title');
  const hotelPrice = element.querySelector('.hotel__price');

  hotelPhoto.src = hotel.photo;
  hotelPhoto.alt = hotel.title;
  hotelTitle.textContent = hotel.title;
  hotelPrice.textContent = '€ ' + hotel.price;

  return element
};

// рендер списка отелей -- очищаем hotelsWrapper и подготавлиаем hotelsToRender с нужным количеством отелей
const renderHotels = () => {
  hotelsWrapper.textContent = '';
  const hotelsToRender = appState.hotels.slice(0, appState.visibleHotels);
  hotelsToRender.forEach(item => hotelsWrapper.append(renderSingleHotelItem(item)));
};

// фильтрация отелей без цен -- их показывать нет смысла
const validateHotels = () => {
  appState.hotels = hotels.filter(item => item.price);
};

// сортировка по цене. Сортируем массив данных, а не сами элементы.
const sortHotels = () => {
  const sortBy = appState.sortOrder;
  appState.hotels.sort((a, b) => {
    if (sortBy === 'asc') {
      return a.price - b.price
    }
    if (sortBy === 'desc') {
      return b.price - a.price
    }
  });

  renderHotels();
};

// обработчик клика сортировки (order -- агрумент с направлением сортировки)
const handleSortButtonClick = (e, order) => {
  e.preventDefault();
  if (appState.sortOrder !== order) {
    appState.sortOrder = order;
    sortHotels();
  }
};

// проверка на выход курсора за пределы document
const onMouseOutDocument = (e) => {
  const element = e.relatedTarget || e.toElement;
  if ((!element || element.nodeName === "HTML") && !appState.isPopupOpen) {
    appState.isPopupOpen = true;
    // самый дешевый отель либо последний, либо первый -- зависит от направления сортировки
    const cheapestHotel = appState.sortOrder === 'desc' ? appState.hotels[appState.visibleHotels - 1] : appState.hotels[0];
    const element = renderSingleHotelItem(cheapestHotel);
    popupContent.insertAdjacentElement('afterbegin', element);
    popup.classList.add('popup_opened');
  }
};
/*
const closePopup = () => {
  popup.classList.remove('popup_opened');
};*/

// функция инициализации приложения -- фильтруем отели и потом отображаем их
const init = () => {
  validateHotels();
  renderHotels();

  showMoreHotelsButton.addEventListener('click', handleShowMoreHotelClick);
  sortByPriceAscButton.addEventListener('click', (e) => handleSortButtonClick(e, 'asc'));
  sortByPriceDescButton.addEventListener('click', (e) => handleSortButtonClick(e, 'desc'));
  //closePopupButton.addEventListener('click', closePopup)
  document.addEventListener('mouseleave', onMouseOutDocument);
};

init();
















/*
//КОНСТАНТЫ: -------------------------------------------------

const hotelsArea = document.querySelector('.hotels');
const hotelsContainer = hotelsArea.querySelector('.hotels__container');
const hotelTemplate = hotelsArea.querySelector('#hotel-template').content;

const showButton = hotelsArea.querySelector('.hotels__show-button');
const incrementButton = hotelsArea.querySelector('.hotels__filter-button_type_increment');
const decrementButton = hotelsArea.querySelector('.hotels__filter-button_type_decrement');

//--------------------------------------------------------------------------------------

//ФУНКЦИИ: -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

//СОЗДАЕМ ОТЕЛИ: -----------------

function createHotel(titleValue, priceValue, linkValue) {
  let hotelsElement = hotelTemplate.cloneNode(true);

  const hotelsElementImage = hotelsElement.querySelector('.hotel__image');
  const hotelsElementPrice = hotelsElement.querySelector('.hotel__price');
  const hotelsElementTitle = hotelsElement.querySelector('.hotel__title');

  hotelsElementImage.src = linkValue;
  hotelsElementImage.alt = titleValue;
  hotelsElementTitle.textContent = titleValue;
  hotelsElementPrice.textContent = '€ ' + priceValue;

  return hotelsElement
}

function addAppend(place, element) {
  place.append(element);
}

function renderElements(x) {
  for (let i = 0; i < x.length; i++) {
    addAppend(hotelsContainer, createHotel(x[i].title, x[i].price, x[i].photo));
  }
}

//-----------------------------------------------------------------------------

//ПОКАЗАТЬ ОТЕЛИ: ------

function showAllHotels() {
  const currentHotelsArray = hotelsContainer.querySelectorAll('.hotel');
  for (let i = 3; i < currentHotelsArray.length; i++) {
    currentHotelsArray[i].classList.add('hotel_opened');
  }
}

function showFirstsHotels() {
  const currentHotelsArray = hotelsContainer.querySelectorAll('.hotel');
  for (let i = 0; i < 3; i++) {
    currentHotelsArray[i].classList.add('hotel_opened');
  }

}


function showIncrementHotels() {
  const nodeList = document.querySelectorAll('.hotel');
  let itemsArray = [];
  const parent = nodeList[0].parentNode;
  for (var i = 0; i < nodeList.length; i++) {
    itemsArray.push(parent.removeChild(nodeList[i]));
  }
  itemsArray.sort(function(nodeA, nodeB) {
      const textA = nodeA.querySelector('.hotel__price').textContent;
      const textB = nodeB.querySelector('.hotel__price').textContent;
      const numberA = parseInt(textA.match(/\d+/));
      const numberB = parseInt(textB.match(/\d+/));
      return numberA - numberB;
    })
    .forEach(function(node) {
      parent.appendChild(node)
    });
}


function showDecrementHotels() {
  const nodeList = document.querySelectorAll('.hotel');
  let itemsArray = [];
  const parent = nodeList[0].parentNode;
  for (var i = 0; i < nodeList.length; i++) {
    itemsArray.push(parent.removeChild(nodeList[i]));
  }
  itemsArray.sort(function(nodeA, nodeB) {
      const textA = nodeA.querySelector('.hotel__price').textContent;
      const textB = nodeB.querySelector('.hotel__price').textContent;
      const numberA = parseInt(textA.match(/\d+/));
      const numberB = parseInt(textB.match(/\d+/));
      return numberB - numberA;
    })
    .forEach(function(node) {
      parent.appendChild(node)
    });
}




const popupBest = document.querySelector('.popup_type_best-hotel');
const bestContainer = popupBest.querySelector('.popup__best');


function chooseCheapestHotel() {
  const currentHotelsArray = hotelsContainer.querySelectorAll('.hotel');

  //currentHotelsArray.sort((a, b) => a.price - b.price);

  const cloneBestHotel = currentHotelsArray[0].cloneNode(true);
  return cloneBestHotel

}



function showBestPopup() {
  if (!popupBest.classList.contains('popup_opened')) {
    popupBest.classList.add('popup_opened');
    addAppend(bestContainer, chooseCheapestHotel());
  }
}




//СЛУШАТЕЛИ: ------------------------

document.addEventListener('mouseleave', showBestPopup);


showButton.addEventListener('click', showAllHotels);
incrementButton.addEventListener('click', showIncrementHotels);
decrementButton.addEventListener('click', showDecrementHotels);

//------------------------------------------------------------------



//ВЫПОЛНЯЕТСЯ: ------------------------------


renderElements(hotels);
showIncrementHotels()
showFirstsHotels();
*/