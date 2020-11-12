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


const hotelsArea = document.querySelector('.hotels');
const hotelsContainer = hotelsArea.querySelector('.hotels__container');
const hotelTemplate = hotelsArea.querySelector('#hotel-template').content;

const showButton = hotelsArea.querySelector('.hotels__show-button');
const incrementButton = hotelsArea.querySelector('.hotels__filter-button_type_increment');
const decrementButton = hotelsArea.querySelector('.hotels__filter-button_type_decrement');

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

function addAppend(x) {
  hotelsContainer.append(x);
}

function renderElements(x) {
  for (let i = 0; i < x.length; i++) {
    addAppend(createHotel(x[i].title, x[i].price, x[i].photo));
  }
}




function removeAllHotels() {
  const elementsForRemove = hotelsArea.querySelectorAll('.hotel');
  for (let i = 0; i < elementsForRemove.length; i++) {
    elementsForRemove[i].remove()
  }
}




function showIncrementHotels() {
  const hotelsIncrement = hotels.sort((a, b) => a.price - b.price);
  removeAllHotels()
  renderElements(hotelsIncrement.slice(0, 3))
  hotelsContainer.classList.add('incremented')
  hotelsContainer.classList.remove('decremented')
}

function showDecrementHotels() {
  const hotelsDecrement = hotels.sort((a, b) => b.price - a.price);
  removeAllHotels()
  renderElements(hotelsDecrement.slice(0, 3))
  hotelsContainer.classList.add('decremented')
  hotelsContainer.classList.remove('incremented')
}

showIncrementHotels()


function showAllHotels() {
  if (hotelsContainer.classList.contains('incremented')) {
    const hotelsIncrement = hotels.sort((a, b) => a.price - b.price);
    removeAllHotels()
    renderElements(hotelsIncrement)
    hotelsContainer.classList.add('incremented')
    hotelsContainer.classList.remove('decremented')
  }
  if (hotelsContainer.classList.contains('decremented')) {
    const hotelsDecrement = hotels.sort((a, b) => b.price - a.price);
    removeAllHotels()
    renderElements(hotelsDecrement)
    hotelsContainer.classList.add('decremented')
    hotelsContainer.classList.remove('incremented')
  }

}


showButton.addEventListener('click', showAllHotels);
incrementButton.addEventListener('click', showIncrementHotels);
decrementButton.addEventListener('click', showDecrementHotels);