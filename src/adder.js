function getColumn() {
  const keyLock = document.createElement("i");
  keyLock.classList.add("fa-solid", "fa-lock-open");
  keyLock.dataset.type = "lock";
  
  const buttonLock = document.createElement("button");
  buttonLock.dataset.type = "lock";
  
  const trash = document.createElement("i");
  trash.classList.add("fa-solid", "fa-trash-can");
  trash.dataset.type = "trash";

  const buttonTrash = document.createElement("button");
  buttonTrash.dataset.type = "trash";

  const createdBtn = document.createElement("div");
  createdBtn.classList.add("use_btn");

  const titleColor = document.createElement("h1");
  titleColor.dataset.type = "copy";

  const createdColumn = document.createElement("div");
  createdColumn.classList.add("column");

  buttonLock.append(keyLock);
  buttonTrash.append(trash);
  createdBtn.append(buttonLock, buttonTrash);
  createdColumn.append(titleColor, createdBtn);

  return createdColumn;
};