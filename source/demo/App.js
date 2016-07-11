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
      <Accordion opened={this.opened} onChange={this.onChange}>
        <AccordionHeader id={0}>
          Header0
        </AccordionHeader>
        <AccordionPanel id={0}>
          Panel0
        </AccordionPanel>
        <AccordionHeader id={1}>
          Header1
        </AccordionHeader>
        <AccordionPanel id={1}>
          Panel1
        </AccordionPanel>
      </Accordion>
    )
  }
}
