import './style.less';

/**
 * @param {Element} renderContainer 当前渲染的容器
 */
export function initMultipleModule(renderContainer) {
  if (renderContainer.classList.contains('mobile')) {
    return;
  }
  renderContainer.querySelectorAll('.mkt-standard-multiple-image-text').forEach((module) => {
    const smallItemList = module.querySelectorAll('.small-image>div');
    const bigItemList = module.querySelectorAll('.big-container .big-item');

    let bigItemDom = bigItemList.item(0);
    let smallItemDom = smallItemList.item(0);
    smallItemList.forEach((dom, index) => {
      dom.addEventListener('click', () => {
        const bigDom = bigItemList.item(index);

        bigItemDom.classList.remove('active');
        smallItemDom.classList.remove('active');

        dom.classList.add('active');
        bigDom.classList.add('active');

        smallItemDom = dom;
        bigItemDom = bigDom;
      });
    });
  });
}
