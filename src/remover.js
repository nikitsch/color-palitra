function deleteColumn(event) {
  let target = event.target.closest(".column")
  target.remove()
  updateColumnsState()

  if (!columns.length) {
    infoSpace.remove()
    document.body.append(createBasement());
  }
}