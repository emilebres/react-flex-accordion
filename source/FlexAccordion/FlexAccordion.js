import React, {PropTypes, Children, cloneElement} from 'react'
import {elementType, validateAccordionChildren} from './helpers'

const containerStyle = {
  display: 'flex',
  position: 'fixed',
  left: 0,
  top: 0,
  bottom: 0
}

export const Accordion = ({opened = {}, onChange = () => null, children, style}) => {
  const accordionStyle = {...containerStyle, ...style}
  const array = Children.toArray(children)
  const filteredChildren = array
    .map(child => {
      switch (elementType(child)) {
        case AccordionHeader.name:
          return cloneElement(child, {onChange})
        case AccordionPanel.name:
          if (opened[child.props.id]) {
            return child
          } else {
            return null
          }
        default:
          return child
      }
    })
  return (
    <div style={accordionStyle} className='accordion'>
      {filteredChildren}
    </div>
  )
}

Accordion.propTypes = {
  opened: PropTypes.objectOf(PropTypes.bool),
  onChange: PropTypes.func,
  children: (props, propName, componentName) => {
    return validateAccordionChildren(props[propName], componentName)
  }
}

const headerStyle = {
  width: '2em',
  cursor: 'pointer'
}

export const AccordionHeader = ({children, id, onChange, disabled, style}) => (
  <div
    className='header-container'
    onClick={() => disabled ? null : onChange(id)}
    style={{...headerStyle, ...style}}
  >
    <div
      className='header'
      style={{
        display: 'inline-block',
        transform: 'translate(2em) rotate(90deg)',
        transformOrigin: '0 0 0',
        padding: '0.5em'
      }}
    >
      {children}
    </div>
  </div>
)
AccordionHeader.propTypes = {
  id: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string
  ]).isRequired,
  disabled: PropTypes.bool
}

export const AccordionPanel = ({children, id, onActive = () => null, style}) => {
  onActive(id)
  return (
    <div style={style} className='panel'>
      {children}
    </div>
  )
}
AccordionPanel.propTypes = {
  id: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string
  ]).isRequired,
  onActive: PropTypes.func
}
