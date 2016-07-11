import React, {PropTypes, Children, cloneElement} from 'react'

import {intersectionArrays, arraysEqual} from '../utils'

export const Accordion = ({opened = {}, onChange = () => null, children}) => {
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
    <div>
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

export const validateAccordionChildren = (children, accordionName) => {
  const acceptedTypes = [AccordionHeader.name, AccordionPanel.name]
  const fail = areAccordionItems(children, acceptedTypes, accordionName)
  if (fail) return fail
  return matchingAccordionItems(children, acceptedTypes, accordionName)
}

const areAccordionItems = (children, acceptedTypes, accordionName) => {
  let error
  Children.forEach(children, child => {
    if (error) return
    if (acceptedTypes.indexOf(elementType(child)) === -1) {
      error = new Error(
        `Component ${accordionName} only accepts children of types ${acceptedTypes.join(', ')}`
      )
    }
  })
  return error
}

const matchingAccordionItems = (children, acceptedTypes, accordionName) => {
  let error
  const ids = new Map(acceptedTypes.map(type => [type, new Set()]))
  Children.forEach(children, child => {
    if (error) return
    const type = elementType(child)
    const id = child.props.id
    if (['string', 'number'].indexOf(typeof id) !== -1) {
      if (ids.get(type).has(id)) {
        error = new Error(
          `Component ${accordionName} has duplicate ${type} children with the same id (${id}). Ids must be unique.`
        )
      } else {
        ids.get(type).add(id)
      }
    }
  })
  const idsByTypes = acceptedTypes.map(type => [...ids.get(type)])
  if (!arraysEqual(intersectionArrays(...idsByTypes), idsByTypes[0])) {
    error = new Error(
      `The ids of the children of component ${accordionName} are not matched. There must be a component with the same id for each of the following types: ${acceptedTypes.join(', ')}`
    )
  }
  return error
}

// Get the type of a React element
// Works with strings, React Components defined with React.createClass, as an ES6 class or as a functional component
const elementType = (component) => {
  if (!component.type) return typeof component
  return component.type.name || component.type
}

export const AccordionHeader = ({children, id, onChange, disabled}) => (
  <div onClick={() => disabled ? null : onChange(id)}>
    {children}
  </div>
)
AccordionHeader.propTypes = {
  id: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string
  ]).isRequired,
  disabled: PropTypes.bool
}

export const AccordionPanel = ({children, id, onActive = () => null}) => {
  onActive(id)
  return (
    <div>
      {children}
    </div>
  )
}
AccordionHeader.propTypes = {
  id: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string
  ]).isRequired,
  onActive: PropTypes.func
}
