import React from 'react'

import {Accordion, AccordionHeader, AccordionPanel} from '../FlexAccordion'

export default () => (
  <Accordion opened={{tt: true}} onChange={(id) => console.log(id)}>
    <AccordionHeader id='tt'>
      Header0
    </AccordionHeader>
    <AccordionPanel id='tt'>
      Panel0
    </AccordionPanel>
  </Accordion>
)
