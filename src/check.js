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

// add to local storage

export function storeList() {
  localStorage.setItem('myList', JSON.stringify(myList));
}

const list = document.getElementById('licontainer');
// add items to dom
export const addList = (array, element) => {
  array.forEach((item) => {
    const listItems = document.createElement('li');
    listItems.classList.add('mystyle');
    element.appendChild(listItems);
    listItems.innerHTML = `
    <input type="checkbox" class = "check" id="${item.index} ">
    <label for="${item.index}">${item.description}&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp
    <i class="fas fa-ellipsis-v"></i>
    `;
  });
};
addList(myList, list);

// function
export function ifChecked() {
  const checkbox = document.querySelectorAll('.check');
  checkbox.forEach((item) => {
    item.addEventListener('change', () => {
      const parent = item.parentNode;
      const superParent = parent.parentNode;
      const index = Array.prototype.indexOf.call(superParent.children, parent);
      const parentItem = myList[index].completed;
      if (parentItem) {
        myList[index].completed = false;
      } else {
        myList[index].completed = true;
      }
      storeList();
    });
  });
}
ifChecked();

export function showStorage() {
  window.addEventListener('load', () => {
    const localData = JSON.parse(localStorage.getItem('myList'));
    myList.splice(0, myList.length, ...localData);
    const cboxes = document.querySelectorAll('.check');

    cboxes.forEach((item) => {
      const parent = item.parentNode;
      const superParent = parent.parentNode;
      const index = Array.prototype.indexOf.call(superParent.children, parent);
      const parentItem = myList[index].completed;

      if (parentItem === true) {
        item.setAttribute('checked', '');
      }
    });
  });
}
showStorage();
