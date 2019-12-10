/* eslint-disable no-console */

import { html } from "@polymer/polymer";
import { RiseElement } from "rise-common-component/src/rise-element.js";
import { version } from "./rise-time-date-version.js";

export default class RiseTimeDate extends RiseElement {

  static get template() {
    // TODO: this is temporary for skeleton
    return html`<h1>RISE TIME & DATE</h1>`;
  }

  static get properties() {
    return {
      /**
       * Defines what formatting this instance should surface as editable to a user in Template Editor.
       * Valid values are "timedate", "time" and "date".
       */
      type: {
        type: String,
        value: "timedate"
      },
      /**
       * The date format to apply to the current date.
       * Valid formats are MMMM DD, YYYY , MMM DD YYYY, MM/DD/YYYY, and DD/MM/YYYY.
       */
      date: {
        type: String,
        value: "MMMM DD, YYYY"
      },
      /**
       * The time format to apply to the current time.
       * Valid formats are h:mm A and HH:mm
       */
      time: {
        type: String,
        value: "h:mm A"
      },
      /**
       *
       */
      timezone: {
        type: String,
        value: ""
      }
    };
  }

  // Each item of observers array is a method name followed by
  // a comma-separated list of one or more dependencies.
  static get observers() {
    return [
      "_reset(date, time, timezone)"
    ];
  }

  constructor() {
    super();

    this._setVersion( version );
    this._initialStart = true;
  }

  ready() {
    super.ready();

    this.addEventListener( "rise-presentation-play", () => this._reset());
    this.addEventListener( "rise-presentation-stop", () => this._stop());
  }

  _reset() {
    if ( !this._initialStart ) {
      this._stop();
      this._start();
    }
  }

  _start() {
    // TODO: coming soon ..
  }

  _stop() {
    // TODO: coming soon
  }

  _handleStart() {
    super._handleStart();

    if (this._initialStart) {
      this._initialStart = false;

      this._start();
    }
  }

}

customElements.define("rise-time-date", RiseTimeDate);
