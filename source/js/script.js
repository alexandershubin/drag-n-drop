'use strict';
const initSlider = () => {
  const button = document.querySelector('.main__button');
  const mainViewport = document.querySelector('.main');
  const overlay = document.querySelector('.overlay');

  const onMouseDown = (evt) => {
    // координаты курсора мыши на момент начала события
    const startCoords = {
      x: evt.clientX ? evt.clientX : evt.touches[0].clientX ,
      y: evt.clientY ? evt.clientY : evt.touches[0].clientY
    };

    let dragged = false;

    const onMouseMove = function (moveEvt) {
      dragged = true;
      // высота и ширина окна
      const viewportWidth = mainViewport.offsetWidth;
      const viewportHeight = mainViewport.offsetHeight;

      // смещение курсора относительно координат начала события
      const shift = {
        x: startCoords.x - (moveEvt.clientX ? moveEvt.clientX : moveEvt.touches[0].clientX),
        y: startCoords.y - (moveEvt.clientY ? moveEvt.clientY : moveEvt.touches[0].clientY)
      };

      // координаты передвижения
      startCoords.x = moveEvt.clientX ? moveEvt.clientX : moveEvt.touches[0].clientX;
      startCoords.y = moveEvt.clientY ? moveEvt.clientY : moveEvt.touches[0].clientY;

      const topCoordinate = fixOverflow(button.offsetTop - shift.y, button.offsetHeight, viewportHeight);
      const leftCoordinate = fixOverflow(button.offsetLeft - shift.x, button.offsetWidth, viewportWidth);

      button.style.top = `${topCoordinate}px`;
      button.style.left = `${leftCoordinate}px`;
    };

    const onMouseUp = function (upEvt) {

      document.removeEventListener('touchmove', onMouseMove);
      document.removeEventListener('touchend', onMouseUp);

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);

      if (dragged) {
        const onClickPreventDefault = function (evt) {
          button.removeEventListener('click', onClickPreventDefault)
        };
        button.addEventListener('click', onClickPreventDefault);
      }

    };

    /**
     * Рассчитать координату в рамках лимита
     *
     * @param {string|number} coordinate - координата курсора
     * @param {string|number} size - размер элемента
     * @param {string|number} limit - максимальный лимит перемещения
     * @returns {number}
     */
    const fixOverflow = (coordinate, size, limit) => {
      const isBigger = coordinate > (limit - size / 2);
      const isLower = coordinate < size / 2;

      if (isLower) {
        overlay.classList.remove('hidden');
        return size / 2;
      }

      if (isBigger) {
        return limit - size / 2;
      }

      return coordinate;
    };

    document.addEventListener('touchmove', onMouseMove);
    document.addEventListener('touchend', onMouseUp);

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };
  button.addEventListener('touchstart', onMouseDown);
  button.addEventListener('mousedown', onMouseDown);

};
initSlider();

