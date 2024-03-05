import './base-modules/base-text';
import './base-modules/company-logo';
import { InItComparisonTable } from './base-modules/comparison-table';
import './base-modules/four-image-text';
import './base-modules/four-image-text-quadrant';
import './base-modules/header-image-text';
import './base-modules/image-text-overlay';
import './base-modules/single-side-image';
import './base-modules/product-description';
import './base-modules/tech-specs';
import './base-modules/three-image-text';
import './base-modules/text';
import './base-modules/single-image-highlights';
import './base-modules/single-image-specs-detail';
import './base-modules/image-sidebar';
import { initMultipleModule } from './base-modules/multiple-image-text';
import './main.less';

window.addEventListener('error', (err) => {
  console.log(err);
});
let invokeFlag = false;
let renderContainer = null;

document.addEventListener('DOMContentLoaded', bootStrap);
window.addEventListener('resize', () => {
  if (renderContainer) {
    const isMobile = renderContainer.clientWidth < 768;
    renderContainer.classList.remove(isMobile ? 'pc' : 'mobile');
    renderContainer.classList.add(isMobile ? 'mobile' : 'pc');
  }
});

bootStrap();

function bootStrap() {
  if (invokeFlag) {
    return;
  }
  invokeFlag = true;
  renderContainer = getRenderContainer();
  console.log(renderContainer);
  if (renderContainer) {
    const isMobile = renderContainer.clientWidth < 768;
    renderContainer.classList.remove(isMobile ? 'pc' : 'mobile');
    renderContainer.classList.add(isMobile ? 'mobile' : 'pc');
    initMultipleModule(renderContainer);
    InItComparisonTable(renderContainer);
  }
}

function getRenderContainer() {
  let container = document.querySelector('#mkt-aplus');
  if (!container) {
    // TODO: web-component name 需要确认
    const shadowRoot = document.querySelector('bean-rich-text')?.shadowRoot;
    if (shadowRoot) {
      container = shadowRoot.querySelector('#mkt-aplus');
    }
  }
  return container;
}
