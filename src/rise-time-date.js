import { html } from "@polymer/polymer";
import { RiseElement } from "rise-common-component/src/rise-element.js";
import { version } from "./rise-time-date-version.js";

export default class RiseTimeDate extends RiseElement {

  static get template() {
    // TODO: this is temporary for skeleton
    return html`<h1>RISE TIME & DATE</h1>`;
  }

  static get properties() {
    return {};
  }

  constructor() {
    super();

    this._setVersion( version );
  }

}

customElements.define("rise-time-date", RiseTimeDate);
