let columns = document.querySelectorAll('.column');

document.addEventListener("DOMContentLoaded", () => {
  const hashes = getColorsFromHash();
  const collaborates = hashes.map((_, index) => {
    const collaboratedColumn = getColumn();
    setRandomColor(collaboratedColumn, index, hashes, true);
    return collaboratedColumn;
  }).slice(1)
  document.body.append(...collaborates);



});

document.addEventListener('keydown', (event) => {
  event.preventDefault()
  if (event.code == 'Space') {
    columns = document.querySelectorAll('.column');
    setRandomColors()
  }
})

document.addEventListener('click', (event) => {
  const type = event.target.dataset.type;
  if (type == 'lock') {
    let node = event.target.tagName.toLowerCase() == 'i'
      ? event.target
      : event.target.children[0];
    node.classList.toggle('fa-lock-open');
    node.classList.toggle('fa-lock');
  } else if (type === 'copy') {
    copyTextToClick(event.target.textContent)
  } else if (type === 'menu') {

    const newColumn = getColumn();
    document.body.append(newColumn);

    columns = document.querySelectorAll('.column');

    setRandomColor(newColumn, columns.length, getColorsFromHash(), false)

    console.log('CLICKKKK')
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
  let svg = el.querySelector('button');

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
  setTextColor(svg, color);

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

//--------------------
function getColumn() {
  const keyLock = document.createElement("i");
  keyLock.classList.add("fa-solid", "fa-lock-open");
  keyLock.dataset.type = "lock";

  const buttonLock = document.createElement("button");
  buttonLock.dataset.type = "lock";

  const titleColor = document.createElement("h1");
  titleColor.dataset.type = "copy";

  const createdColumn = document.createElement("div");
  createdColumn.classList.add("column");

  buttonLock.append(keyLock);
  createdColumn.append(titleColor, buttonLock);

  return createdColumn;
};