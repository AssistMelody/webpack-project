import './style.less';

/**
 * @param {Element} renderContainer 当前渲染的容器
 */
export function InItComparisonTable(renderContainer) {
  renderContainer.querySelectorAll('.mkt-standard-comparison-table table').forEach((item) => {
    item.classList.add('comparison-table');
  });
}
