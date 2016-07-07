import React, {PropTypes} from 'react'

export const Accordion = ({opened, onChange, children}) => (
  <div>
    {children}
  </div>
)
Accordion.propTypes = {
  opened: PropTypes.objectOf(PropTypes.bool),
  onChange: PropTypes.func,
  children: PropTypes.node
}

export const AccordionHeader = ({children, id}) => (
  {children}
)
AccordionHeader.propTypes = { id: PropTypes.number.isRequired }

export const AccordionPanel = ({children}) => (
  {children}
)
