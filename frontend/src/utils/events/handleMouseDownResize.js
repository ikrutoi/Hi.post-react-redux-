export const handleMouseDownResize = (
  e,
  setIsResizing,
  crop,
  scaleX,
  scaleY,
  aspectRatio,
  imgRef,
  setCrop
) => {
  e.stopPropagation()
  setIsResizing(true)
  const startX = e.clientX
  const startY = e.clientY
  const startWidth = crop.width
  const startHeight = crop.height

  const onMouseMove = (e) => {
    const deltaX = (e.clientX - startX) * scaleX
    const deltaY = (e.clientY - startY) * scaleY
    let newWidth = startWidth + deltaX
    let newHeight = startHeight + deltaY

    if (newWidth / newHeight !== aspectRatio) {
      newHeight = newWidth / aspectRatio
    }

    const img = imgRef.current
    if (crop.x + newWidth > img.width * scaleX) {
      newWidth = img.width * scaleX - crop.x
      newHeight = newWidth / aspectRatio
    }
    if (crop.y + newHeight > img.height * scaleY) {
      newHeight = img.height * scaleY - crop.y
      newWidth = newHeight * aspectRatio
    }

    setCrop((prevCrop) => ({
      ...prevCrop,
      width: newWidth,
      height: newHeight,
    }))
  }

  const onMouseUp = () => {
    setIsResizing(false)
    window.removeEventListener('mousemove', onMouseMove)
    window.removeEventListener('mouseup', onMouseUp)
  }

  window.addEventListener('mousemove', onMouseMove)
  window.addEventListener('mouseup', onMouseUp)
}
