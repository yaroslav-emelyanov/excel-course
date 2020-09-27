import {$} from '@core/dom';

export function resizeHandler(root, event) {
  const $target = $(event.target);
  const $parent = $target.closest('[data-type="resizable"]');
  const coords = $parent.getCoords();
  const type = $target.data.resize;
  const sideProp = type === 'col' ? 'bottom': 'right';

  let value;

  $target.css({opacity: 1, [sideProp]: '-5000px'});

  document.onmousemove = (e) => {
    if (type === 'col') {
      const deltaX = e.pageX - coords.right;
      value = coords.width + deltaX;
      $target.css({right: -deltaX + 'px'});
    } else {
      const deltaY = e.pageY - coords.bottom;
      value = coords.height + deltaY;
      $parent.css({bottom: -deltaY + 'px'});
    }
  };

  document.onmouseup = () => {
    document.onmousemove = null;
    document.onmouseup = null;

    if (type === 'col') {
      const col = $parent.data.col;
      const cols = root.findAll(`[data-col="${col}"]`);
      $parent.css({width: value + 'px'});
      cols.forEach(el => el.style.width = value + 'px');
    } else {
      $parent.css({height: value + 'px'});
    }

    $target.css({opacity: 0, bottom: 0, right: 0});
  };
}
