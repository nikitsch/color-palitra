function deleteColumn(event) {
  event.target.closest(".column")?.remove()
  updateColumnsState()

  if (!columns.length) {
    infoSpace.remove()
    document.body.append(createBasement());
  }
}