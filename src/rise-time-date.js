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
       * Valid formats are Hours12 and Hours24
       */
      time: {
        type: String,
        value: "Hours12"
      },
      /**
       * The specific timezone to use for formatting date and/or time. For example "US/Eastern"
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

  static get TYPE_TIMEDATE() {
    return "timedate";
  }

  static get TYPE_TIME() {
    return "time";
  }

  static get TYPE_DATE() {
    return "date";
  }

  static get TIME_FORMATS() {
    return new Map([["Hours12", "h:mm A"], ["Hours24", "HH:mm"]] );
  }

  static get DATE_FORMATS() {
    return [ "MMMM DD, YYYY", "MMM DD YYYY", "MM/DD/YYYY", "DD/MM/YYYY" ];
  }

  static get EVENT_DATA_ERROR() {
    return "data-error";
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

  _isValidType( type ) {
    return type === RiseTimeDate.TYPE_TIMEDATE || type === RiseTimeDate.TYPE_TIME || type === RiseTimeDate.TYPE_DATE;
  }

  _isValidDateFormat( date ) {
    return RiseTimeDate.DATE_FORMATS.includes( date );
  }

  _isValidTimeFormat( time ) {
    return Array.from(RiseTimeDate.TIME_FORMATS.keys()).includes( time );
  }

  _hasValidFormat() {
    if ( !this.date && !this.time ) {
      return false;
    }

    switch ( this.type ) {
      case RiseTimeDate.TYPE_TIME:
        return this._isValidTimeFormat( this.time );
      case RiseTimeDate.TYPE_DATE:
        return this._isValidDateFormat( this.date );
      case RiseTimeDate.TYPE_TIMEDATE:
        return this._isValidDateFormat( this.date ) && this._isValidTimeFormat( this.time );
    }
  }

  _sendTimeDateEvent( eventName, detail ) {
    super._sendEvent( eventName, detail );

    // TODO: handle setting uptime
  }

  _processTimeDate() {
    // TODO: coming soon
  }

  _start() {
    if ( !this._isValidType( this.type ) ) {
      this._sendTimeDateEvent( RiseTimeDate.EVENT_DATA_ERROR, {
        message: "Invalid type, valid values are timedate, time and date",
        type: this.type
      } );

      return;
    }

    if ( !this._hasValidFormat() ) {
      this._sendTimeDateEvent( RiseTimeDate.EVENT_DATA_ERROR, {
        message: `Invalid format. Valid date formats are: ${ RiseTimeDate.DATE_FORMATS.join(" | ") }. Valid time formats are: ${ Array.from(RiseTimeDate.TIME_FORMATS.keys()).join(" | ") }`,
        date: this.date,
        time: this.time
      } );

      return;
    }

    this._processTimeDate();
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
