import React, {Component} from 'react'

import {Accordion, AccordionHeader, AccordionPanel} from '../FlexAccordion'

export default class App extends Component {

  constructor () {
    super()
    this.opened = {0: true}
    this.onChange = (id) => {
      console.log(`${id} clicked`)
      console.log(this.opened)
      this.opened = ({...this.opened, [id]: !this.opened[id]})
      console.log(this.opened)
      this.forceUpdate()
    }
  }

  render () {
    return (
      <Accordion opened={this.opened} onChange={this.onChange} >
        <AccordionHeader id={0} style={{backgroundColor: 'aliceblue'}}>
          Header0
        </AccordionHeader>
        <AccordionPanel id={0} style={{width: '20em', backgroundColor: 'corsilk'}}>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </AccordionPanel>
        <AccordionHeader id={1} style={{backgroundColor: 'aliceblue'}}>
          Header1
        </AccordionHeader>
        <AccordionPanel id={1} style={{width: '20em', backgroundColor: 'corsilk'}}>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </AccordionPanel>
      </Accordion>
    )
  }
}
