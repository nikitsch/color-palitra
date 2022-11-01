let info_space = document.querySelector('.info');
let amount_menu = document.querySelector('.amount_menu');
let columns; updateColumnsState()

function updateColumnsState() {
  columns = document.querySelectorAll('.column');
}

document.addEventListener("DOMContentLoaded", () => {
  const hashes = getColorsFromHash();
  const collaborates = hashes.map((_, index) => {
    const collaboratedColumn = getColumn();
    setRandomColor(collaboratedColumn, index, hashes, true);
    return collaboratedColumn;
  }).slice(1)
  document.body.append(...collaborates);
  updateColumnsState();
});

document.addEventListener('keydown', (event) => {
  event.preventDefault()
  if (event.code == 'Space') {
    updateColumnsState()
    setRandomColors()
    info_space.remove()
  }
})

document.addEventListener('click', (event) => {
  const type = event.target.dataset.type;
  if (type === 'lock') {
    let node = event.target.tagName.toLowerCase() == 'i'
      ? event.target
      : event.target.children[0];
    node.classList.toggle('fa-lock-open');
    node.classList.toggle('fa-lock');
  } else if (type === 'copy') {
    copyTextToClick(event.target.textContent)
  } else if (type === 'add') {

    const newColumn = getColumn();
    document.body.append(newColumn);

    updateColumnsState()

    setRandomColor(newColumn, columns.length, getColorsFromHash(), false)

    amount_menu.style.backgroundColor = newColumn.style.backgroundColor

    function backgroundColor() {
      amount_menu.style.backgroundColor = "rgb(187, 187, 187)"
    }

    setTimeout(backgroundColor, 80)

  } else if (type === 'trash') {
    deleteColumn(event)
  }
})

function randomColor() {
  const HEX = '0123456789ABCDEF';
  let color = '';
  for (i = 0; i < 6; i++) {
    color += HEX[Math.floor(Math.random() * HEX.length)]
  };
  return '#' + color;
}

function copyTextToClick(text) {
  return navigator.clipboard.writeText(text)
}

function setRandomColor(el, index, colors, isInitial) {

  let isLocked = el.querySelector('i').classList.contains('fa-lock');
  let text = el.querySelector('h1');
  let svgLock = el.querySelector('.fa-lock-open');
  let svgTrash = el.querySelector('.fa-trash-can');

  if (isLocked) {
    colors.push(text.textContent)
    return
  };

  let color = isInitial
    ? colors[index]
      ? colors[index]
      : randomColor()
    : randomColor(); //chroma.random();

  if (!isInitial) {
    colors.push(color)
  }

  text.textContent = color;
  el.style.background = color;
  setTextColor(text, color);
  setTextColor(svgLock, color);
  setTextColor(svgTrash, color);
}

function setRandomColors(isInitial) {
  let colors = isInitial ? getColorsFromHash() : [];

  columns.forEach((el, index) => {
    setRandomColor(el, index, colors, isInitial)

  });
  updateColorsHash(colors);
}

function setTextColor(viewEl, color) {
  let luminance = chroma(color).luminance();
  viewEl.style.color = luminance > 0.5 ? 'black' : 'white';
}

function updateColorsHash(colors = []) {
  document.location.hash = colors.map(el => {
    return el.substring(1)
  })
    .join('-')
}

function getColorsFromHash() {
  if (document.location.hash.length > 1) {
    return document.location.hash.substring(1).split('-').map(el => '#' + el)
  }
  return []
}

setRandomColors(true)