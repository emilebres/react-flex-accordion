import React from 'react'

import {Accordion, AccordionHeader, AccordionPanel} from '../FlexAccordion'

export default () => (
  <Accordion opened={{0: true}}>
    <AccordionHeader id={0}>Header0</AccordionHeader>
    <AccordionPanel id={0}>Panel0</AccordionPanel>
  </Accordion>
)
