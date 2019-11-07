const ENTER_KEYCODE = 13;

document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('.form');
  const items = document.querySelector('.items');

  text.init(form, items);
});

const text = (() => {
  let items;

  function init(_form, _items) {
    items = _items;
    _form.addEventListener('submit', formHandler);

    const checkboxes = items.getElementsByClassName('item__checkbox');
    for (let i = 0; i < checkboxes.length; i++) {
      checkboxes[i].addEventListener('click', finish);
    }

    const texts = items.getElementsByClassName('item__text');
    for (let i = 0; i < texts.length; i++) {
      texts[i].addEventListener('click', edit);
    }

    const itemButtons = items.getElementsByClassName('item__button');
    for (let i = 0; i < itemButtons.length; i++) {
      itemButtons[i].addEventListener('click', deleteItem);
    }
    // TODO láta hluti í _items virka
  }

  function formHandler(e) {
    e.preventDefault()
    
    let input = e.target.getElementsByClassName('form__input')[0].value;
    
    if(input.replace(/\s/g, '').length) {
      add(input);
      e.target.getElementsByClassName('form__input')[0].value = '';
    }
  }

  // event handler fyrir það að klára færslu
  function finish(e) {
    const item = e.target.parentElement;

    if (item.className.indexOf('item--done') >= 0)
    {
      item.classList.remove('item--done'); 
    }
    else
    {
      item.classList.add('item--done');
    }
  }

  // event handler fyrir það að breyta færslu
  function edit(e) {
    let text = e.target;
    const item = text.parentElement;

    const inputElement = document.createElement('INPUT');
    inputElement.classList.add('item__edit');
    inputElement.value = text.textContent;
    inputElement.addEventListener('change', commit);

    item.replaceChild(inputElement, text);

    let checkbox = null
    for (let i = 0; i < item.children.length; i++)
    {
      if (item.children[i].className === 'item__checkbox') 
      {
        checkbox = item.children[i];
        break;
      }
    }

    if (!checkbox.checked)
    {
      item.classList.remove('item--done');
    }
  }

  // event handler fyrir það að klára að breyta færslu
  function commit(e) {
    let input = e.target;
    const item = input.parentElement;
    const spanElement = document.createElement('SPAN');
    spanElement.classList.add('item__text');
    spanElement.textContent = input.value;
    spanElement.addEventListener('click', edit);
    item.replaceChild(spanElement, input);
  }

  // fall sem sér um að bæta við nýju item
  function add(value) {
    const item = el('LI', 'item', null);
    const checkbox = el('INPUT', 'item__checkbox', finish);
    checkbox.type = 'checkbox';
    const span = el('SPAN', 'item__text', edit);
    span.innerHTML = value;
    const button = el('BUTTON', 'item__button', deleteItem);
    button.innerHTML = 'Eyða';
    item.appendChild(checkbox);
    item.appendChild(span);
    item.appendChild(button);
    document.getElementsByClassName('items')[0].appendChild(item);
  }

  // event handler til að eyða færslu
  function deleteItem(e) {
    const item = e.target.parentElement;
    item.parentElement.removeChild(item);
  }

  // hjálparfall til að útbúa element
  function el(type, className, clickHandler) {
    const newElement = document.createElement(type);
    newElement.classList.add(className);
    newElement.addEventListener('click', clickHandler);
    return newElement;
  }

  return {
    init: init
  }
})();
