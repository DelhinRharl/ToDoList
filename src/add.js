const myList = [];

function strikeThrough(todoInput) {
  todoInput.forEach((item) => {
    if (item.hasAttribute('checked')) {
      item.nextSibling.style.strikeThrough = 'line-through';
    } else {
      item.nextSibling.style.strikeThrough = 'none';
    }
  });
}

function interactive(todoInput) {
  todoInput.forEach((item) => {
    item.addEventListener('change', () => {
      const localData = JSON.parse(localStorage.getItem('localData'));
      const parent = item.parentNode;
      const grandParent = parent.parentNode;
      const index = Array.prototype.indexOf.call(grandParent.children, parent);
      const currentItem = localData[index].completed;
      if (currentItem) {
        item.removeAttribute('checked');
        parent.lastChild.style.display = 'none';
        localData[index].completed = false;
      } else {
        item.setAttribute('checked', '');
        parent.lastChild.style.display = 'block';
        localData[index].completed = true;
      }
      strikeThrough(todoInput);
      localStorage.setItem('localData', JSON.stringify(localData));
      myList.splice(0, myList.length, ...localData);
    });
  });
}
function deleteItem() {
  const button = document.querySelectorAll('.fastrash');
  button.forEach((item) => {
    const parent = item.parentNode;
    const grandParent = parent.parentNode;
    const index = Array.prototype.indexOf.call(grandParent.children, parent);
    const todoInput = parent.firstChild;
    item.addEventListener('click', () => {
      const localData = JSON.parse(localStorage.getItem('localData'));
      myList.splice(0, myList.length, ...localData);
      if (todoInput.hasAttribute('checked')) {
        parent.remove();
        myList.splice(index, 1);
      }
      for (let i = 0; i < myList.length; i += 1) {
        myList[i].index = i + 1;
      }
      localStorage.setItem('localData', JSON.stringify(myList));
    });
  });
}
function clearAll() {
  const localData = JSON.parse(localStorage.getItem('localData'));
  myList.splice(0, myList.length, ...localData);
  const list = document.querySelector('#licontainer');
  const clearCompleted = document.querySelector('#btn');
  clearCompleted.addEventListener('click', () => {
    for (let i = 0; i < myList.length; i += 1) {
      if (myList[i].completed) {
        myList.splice(i, 1);
        list.childNodes[i].remove();
      }
    }
    for (let i = 0; i < myList.length; i += 1) {
      myList[i].index = i + 1;
    }
    localStorage.setItem('localData', JSON.stringify(myList));
  });
}

function editItems() {
  const itemDetails = document.querySelectorAll('.todos');
  itemDetails.forEach((item) => {
    const parent = item.parentNode;
    const grandParent = parent.parentNode;
    const index = Array.prototype.indexOf.call(grandParent.children, parent);
    item.addEventListener('change', () => {
      myList[index].description = item.value;
      localStorage.setItem('localData', JSON.stringify(myList));
    });
  });
}

function populateDom() {
  const list = document.querySelector('#licontainer');
  const localData = JSON.parse(localStorage.getItem('localData'));
  myList.splice(0, myList.length, ...localData);
  list.innerHTML = '';
  for (let i = 0; i < localData.length; i += 1) {
    const { description } = localData[i];
    const elem = document.createElement('li');
    elem.innerHTML = `<input class="check" type="checkbox"><textarea name="textarea class="todos">${description}</textarea>
    <button type="button" class="fastrash">
          <i class="fas fa-trash"></i> 
          </button>  <i class="fas fa-ellipsis-v"></i>`;
    list.appendChild(elem);
  }
  const todoInput = document.querySelectorAll('.check');
  interactive(todoInput);
  deleteItem();
  clearAll();
  editItems();
}

function displayItems() {
  const sbtn = document.querySelector('.fasfas');
  const form = document.querySelector('#formation');
  sbtn.addEventListener('click', () => {
    const values = form.elements[0].value;
    if (values !== '') {
      const myData = {
        description: values,
        completed: false,
        index: myList.length + 1,
      };
      form.reset();
      myList.push(myData);
      localStorage.setItem('localData', JSON.stringify(myList));
      populateDom();
    }
  });
}

function getStorage() {
  window.addEventListener('load', () => {
    populateDom();
    const todoInput = document.querySelectorAll('.check');
    const localData = JSON.parse(localStorage.getItem('localData'));
    todoInput.forEach((item) => {
      const parent = item.parentNode;
      const grandParent = parent.parentNode;
      const index = Array.prototype.indexOf.call(grandParent.children, parent);
      const currentItem = localData[index].completed;
      if (currentItem) {
        item.setAttribute('checked', '');
        parent.lastChild.style.display = 'block';
      }
    });
    strikeThrough(todoInput);
  });
}
getStorage();
displayItems();
