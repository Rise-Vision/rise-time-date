/* global moment */
/* eslint-disable no-console */

import { html } from "@polymer/polymer";
import { timeOut } from "@polymer/polymer/lib/utils/async.js";
import { RiseElement } from "rise-common-component/src/rise-element.js";
import { version } from "./rise-time-date-version.js";
import "@polymer/iron-jsonp-library/iron-jsonp-library.js";

export default class RiseTimeDate extends RiseElement {

  static get template() {
    return html`[[output]]`;
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
      },
      /**
       * The formatted and rendered value for time and/or date.
       */
      output: {
        type: String,
        readOnly: true,
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

  static get TIME_UNITS() {
    return ["hour", "minute", "second"];
  }

  constructor() {
    super();

    this._setVersion( version );
    this._initialStart = true;
    this._processTimer = null;
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

  _get12HourValue( now ) {
    return parseInt( now.format("h"), 10 );
  }

  _getTimeFormatted( now ) {
    return now.format( RiseTimeDate.TIME_FORMATS.get( this.time ) );
  }

  _getDateFormatted( now ) {
    return now.format( this.date );
  }

  _getTimeData( now ) {
    const data =  {
      formatted: this._getTimeFormatted( now ),
      units: RiseTimeDate.TIME_UNITS.reduce( (units, unit) => {
        units[ unit ] = unit === "hour" && this.time === "Hours12" ? this._get12HourValue( now ) : now[unit]();
        return units;
      }, {})
    };

    if ( this.time === "Hours12" ) {
      data.units.meridiem = data.formatted.slice(-2);
    }

    return data;
  }

  _render( now ) {
    switch ( this.type ) {
      case RiseTimeDate.TYPE_TIME:
        return this._setOutput( this._getTimeFormatted( now ) );
      case RiseTimeDate.TYPE_DATE:
        return this._setOutput( this._getDateFormatted( now ) );
      case RiseTimeDate.TYPE_TIMEDATE:
        return this._setOutput( `${ this._getTimeFormatted( now )} ${ this._getDateFormatted( now ) }` );
    }
  }

  _sendTimeDateEvent( eventName, detail ) {
    super._sendEvent( eventName, detail );

    switch ( eventName ) {
      case RiseTimeDate.EVENT_DATA_ERROR:
        super._setUptimeError( true );
        break;
      case RiseTimeDate.EVENT_DATA_UPDATE:
        super._setUptimeError( false );
        break;
      default:
    }
  }

  _runTimer() {
    timeOut.cancel( this._processTimer );
    this._processTimer = timeOut.run(() => this._processTimeDate(), 1000 );
  }

  _processTimeDate() {
    const now = this.timezone ? moment().tz( this.timezone ) : moment();
    const data = {
      type: this.type,
      date: this.type === "date" || this.type === "timedate" ? this._getDateFormatted( now ) : null,
      time: this.type === "time" || this.type === "timedate" ? this._getTimeData( now ) : null,
      user: {
        dateFormat: this.type === "date" || this.type === "timedate" ? this.date : null,
        timeFormat: this.type === "time" || this.type === "timedate" ? this.time : null,
        timezone: this.timezone || null
      }
    };

    this._render( now );
    this._sendTimeDateEvent( RiseTimeDate.EVENT_DATA_UPDATE, data );
    this._runTimer();
  }

  _start() {
    if ( !this._isValidType( this.type ) ) {
      super.log( "error", "Invalid type", { type: this.type } );
      this._sendTimeDateEvent( RiseTimeDate.EVENT_DATA_ERROR, {
        message: "Invalid type, valid values are timedate, time and date",
        type: this.type
      } );

      return;
    }

    if ( !this._hasValidFormat() ) {
      super.log( "error", "Invalid format", { type: this.type, date: this.date, time: this.time } );
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
    timeOut.cancel( this._processTimer );
    this._processTimer = null;
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
