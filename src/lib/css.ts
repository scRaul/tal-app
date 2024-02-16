
type direction = 'left'|'right'|'top'|'bottom';

export function getSlideTransform(
    dir: direction, isClosed: boolean, interacted: boolean) {
  if (dir === 'left') {
    if (!interacted) return isClosed ? 'start-left' : '';
    return isClosed ? 'animate-ToLeft' : 'animate-FromLeft';
  }
  if (dir === 'right') {
    if (!interacted) return isClosed ? 'start-right' : '';
    return isClosed ? 'animate-ToRight' : 'animate-FromRight';
  }
  if (dir === 'top') {
    if (!interacted) return isClosed ? 'start-top' : '';
    return isClosed ? 'animate-ToTop' : 'animate-FromTop';
  }
  if (dir === 'bottom') {
    if (!interacted) return isClosed ? 'start-bottom' : '';
    return isClosed ? 'animate-ToBottom' : 'animate-FromBottom';
  }

  return '';
}
