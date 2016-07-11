# React Flex Accordion

### Demo available here: http://emilebres.github.io/react-flex-accordion/

![react-flex-accordion-demo](https://cloud.githubusercontent.com/assets/6179178/16731147/df66501e-4776-11e6-80a3-02b5738621e6.gif)
## Getting started

Install `react-flex-accordion` using npm.

```shell
npm install react-flex-accordion --save
```

ES6, CommonJS, and UMD builds are available with each distribution.
For example:

```js
import FlexAccordion from 'react-flex-accordion'
```

Alternately you can load a global-friendly UMD build:

```html
<script src="path-to-react-flex-accordion/dist/umd/react-flex-accordion.js"></script>
```

## Simple Example
FlexAccordion is a controlled component. You pass _react-flex-accordion_ headers and panels as children. You pass the opened panels and an onChange function as props. Here's a simple example:

```js
import React, { Component } from 'react'
import FlexAccordion from 'react-flex-accordion'

export default class FlexAccordionExample extends Component {

  constructor () {
    super()
    this.opened = {0: true}
    this.onChange = (id) => {
      this.opened = ({...this.opened, [id]: !this.opened[id]})
      this.forceUpdate()
    }
  }

  render () {
    return (
      <Accordion opened={this.opened} onChange={this.onChange} >
        <AccordionHeader id={0}>
          Header0
        </AccordionHeader>
        <AccordionPanel id={0}>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </AccordionPanel>
        <AccordionHeader id={1}>
          Header1
        </AccordionHeader>
        <AccordionPanel id={1}>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </AccordionPanel>
      </Accordion>
    )
  }
}
```

By default, FlexAccordion will span the whole height of its container but you can overwrite this behavior with inline style.

## Flex Accordion Props

| Property | Type | Description |
|:---|:---|:---|
| children | `AccordionHeader` or `AccordionPanel` | Children are checked to be of the correct type. |
| opened | `PropTypes.object` | Object defining which panels are open at startup. Keys are the panel ids and values are booleans. Defaults to {}.|
| onChange | `PropTypes.func` | Callback called when a header is clicked; takes the clicked header id as argument. Defaults to () => null. |
| style | `PropTypes.object` | Overwrite the accordion default style. It will merge with the default style: {display: 'flex', position: 'fixed', left: 0, top: 0, bottom: 0}|


The children can take props as well.

For the Accordion headers:

| Property | Type | Description |
|:---|:---|:---|
| id | `PropTypes.number` or `PropTypes.string` | Header id; must match with a panel id (checked at initialization).|
| children | `React.Element` | What is displayed in the header. Only tested with strings. |
| disabled | `PropTypes.boolean` | Disable the header. |
| style | `PropTypes.object` | Overwrite the header default style. It will merge with the default style: {width: '2em', cursor: 'pointer'}|
| disabledStyle | `PropTypes.object` | Style for disabled header.|

For the Accordion panels:

| Property | Type | Description |
|:---|:---|:---|
| id | `PropTypes.number` or `PropTypes.string` | Header id; must match with a header id (checked at initialization).|
| children | `React.Element` | What is displayed in the panel. Only tested with strings. |
| onActive | `PropTypes.func` | Callback when the header is displayed. |
| style | `PropTypes.object` | Overwrite the header default style. It will merge with the default style: {width: '2em', cursor: 'pointer'}|
