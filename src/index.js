import './style.css';

const myList = [
  {
    description: 'Wash the dishes',
    completed: false,
    index: 0,
  },
  {
    description: 'Wash the dishes',
    completed: false,
    index: 1,
  },
  {
    description: 'Clean the house',
    completed: false,
    index: 2,
  },
];

const list = document.getElementById('licontainer');

// add items to dom
const addList = (array, element) => {
  array.forEach((item) => {
    const listItems = document.createElement('li');
    listItems.classList.add('mystyle');
    element.appendChild(listItems);
    listItems.innerHTML = `
    <input type="checkbox" class = "check" id="${item.index}">
    <label for="${item.index}">${item.description}&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp
    <i class="fas fa-ellipsis-v"></i>
    `;
  });
};
addList(myList, list);
