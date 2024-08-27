import { LitElement, html, css, CSSResultGroup } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('my-element')
export class MyElement extends LitElement {
  @property({ type: Number }) count = 0;
  protected render() {
    return html`
      <p><button @click="${this._increment}">Click Me!</button></p>
      <p>Click count: ${this.count}</p>
    `;
  }
  private _increment(e: Event) {
    this.count++;
  }
  static styles?: CSSResultGroup | undefined = css`
    :host {
      display: grid;
      justify-content: center;
    }
    p {
      color: red;
    }
  `;
}
