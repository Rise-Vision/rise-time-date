# Rise Time & Date [![CircleCI](https://circleci.com/gh/Rise-Vision/rise-time-date/tree/master.svg?style=svg)](https://circleci.com/gh/Rise-Vision/rise-time-date/tree/master) [![Coverage Status](https://coveralls.io/repos/github/Rise-Vision/rise-time-date/badge.svg?branch=master)](https://coveralls.io/github/Rise-Vision/rise-time-date?branch=master)

## Introduction

`rise-time-date` is a Polymer 3 Web Component that formats and renders the current time and/or date while additionally providing this date in an event.

## Usage

The below illustrates simple usage of the component.

#### Example

```
  <rise-time-date
      id="rise-time-date-01" label="Time and Date"
      type="timedate" date="DD/MM/YYYY" time="Hours24" timezone="US/Eastern">
  </rise-time-date>
```

Although this is a visual component, an event listener can also be registered to process the data it provides. You can check the available events in the [events section](#events)

### Attributes

This component receives the following list of attributes:

- **id**: (string): Unique HTMLElement id.
- **label**: (string): Assigns the label to use for the instance of the component in Template Editor.
- **type**: (string / required): Indicates the type of the component. Valid values are `timedate`, `time` and `date`.
- **date**: (string / optional): The specific format to use for displaying the current date. Valid formats are `MMMM DD, YYYY`, `MMM DD YYYY`, `MM/DD/YYYY`, and `DD/MM/YYYY`. Defaults to `MMMM DD, YYYY`.
- **time**: (string / optional): The time format in terms of hours to use for displaying the current time. Valid formats are `Hours12` and `Hours24`. Defaults to `Hours12`.
- **timezone**: (string / optional): The specific timezone to use for formatting date and/or time (for example, `US/Eastern`). Valid values will be determined by checking the existence of the value in Moment's Timezone list of timezone names (an unofficial list can be found [here](https://gist.github.com/diogocapela/12c6617fc87607d11fd62d2a4f42b02a)). Defaults to the local machine's timezone.
 - **non-editable**: ( empty / optional ): If present, it indicates this component is not available for customization in the Template Editor.

This component does not support PUD; it will need to be handled by Designers on a per Template basis.

### Events

The component will send the following events:

- **configured**: The component has initialized what it requires to and is ready to handle a _start_ event.
- **data-update**: An event providing an object as described [here](#provided-data).
- **data-error**: An event indicating there have been invalid attribute values (i.e. time format) provided. An error object is provided in `event.details`. This event will be sent once only.

The component listens for the following events:

- **start**: This event will cause the component to do internal configuration and then render the formatted date and/or time every second, as well as sending the **data-update** event. It can be dispatched to the component when the configured event has been fired.

### Provided data

The **data-update** event provides an object with a `details` property, containing:

- `type`: The selected component type
- `date`: A formatted value of the current date
- `time`
  - `formatted`: A formatted value of the current time
  - `units`: The individual units making up the time adhering to user selected 12 or 24 hour format and timezone format applied, if chosen:
    - `hour`
    - `minutes`
    - `seconds`
- `user`: The user selected values
  - `dateFormat`
  - `timeFormat`
  - `timezone`

### Logging

The component logs the following events to BQ:

- **start received**: The component receives the start event and commences execution.
- **Invalid type**: The component does now have a type matching `timedate`, `time` or `date`.
- **Invalid format**: The provided `date` or `time` do not match the valid formats.

### Offline play

The component supports offline play out of the box.

## Built With
- [Polymer 3](https://www.polymer-project.org/)
- [Polymer CLI](https://github.com/Polymer/tools/tree/master/packages/cli)
- [WebComponents Polyfill](https://www.webcomponents.org/polyfills/)
- [npm](https://www.npmjs.org)

## Development

### Local Development Build
Clone this repo and change into this project directory.

Execute the following commands in Terminal:

```
npm install
npm install -g polymer-cli@1.9.7
npm run build
```

**Note**: If EPERM errors occur then install polymer-cli using the `--unsafe-perm` flag ( `npm install -g polymer-cli --unsafe-perm` ) and/or using sudo.

### Testing
You can run the suite of tests either by command terminal or interactive via Chrome browser.

#### Command Terminal
Execute the following command in Terminal to run tests:

```
npm run test
```

In case `polymer-cli` was installed globally, the `wct-istanbul` package will also need to be installed globally:

```
npm install -g wct-istanbul
```

#### Local Server
Run the following command in Terminal: `polymer serve`.

Now in your browser, navigate to:

```
http://127.0.0.1:8081/components/rise-time-date/demo/src/rise-time-date.html
```

### Demo project

A demo project showing how to implement a simple time-date listener can be found in the `demo` folder.

Another option is using `example-time-date-component` as the scaffolding for a new template. This project can be found in https://github.com/Rise-Vision/html-template-library

## Submitting Issues
If you encounter problems or find defects we really want to hear about them. If you could take the time to add them as issues to this Repository it would be most appreciated. When reporting issues, please use the following format where applicable:

**Reproduction Steps**

1. did this
2. then that
3. followed by this (screenshots / video captures always help)

**Expected Results**

What you expected to happen.

**Actual Results**

What actually happened. (screenshots / video captures always help)

## Contributing
All contributions are greatly appreciated and welcome! If you would first like to sound out your contribution ideas, please post your thoughts to our [community](https://help.risevision.com/hc/en-us/community/topics), otherwise submit a pull request and we will do our best to incorporate it. Please be sure to submit test cases with your code changes where appropriate.

## Resources
If you have any questions or problems, please don't hesitate to join our lively and responsive [community](https://help.risevision.com/hc/en-us/community/topics).

If you are looking for help with Rise Vision, please see [Help Center](https://help.risevision.com/hc/en-us).

**Facilitator**

[Stuart Lees](https://github.com/stulees "Stuart Lees")
