import React, {PropTypes, Children} from 'react'

import {intersectionArrays, arraysEqual} from '../utils'

export const Accordion = ({opened = {}, onChange, children}) => {
  const array = Children.toArray(children)
  const headers = array.filter(child => elementType(child) === AccordionHeader.name)
  const openedPanels = array
    .filter(child => elementType(child) === AccordionPanel.name)
    .filter(panel => opened[panel.props.id])
  return (
    <div>
      {headers}
      {openedPanels}
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
  const ids = acceptedTypes.reduce((ids, type) => ({...ids, [type]: new Set()}), {})
  Children.forEach(children, child => {
    if (error) return
    const type = elementType(child)
    const id = child.props.id
    if (['string', 'number'].indexOf(typeof id)) {
      if (ids[type].has(id)) {
        error = new Error(
          `Component ${accordionName} has duplicate ${type} children with the same id (${id}). Ids must be unique.`
        )
      } else {
        ids[type].add(id)
      }
    }
  })
  const idsByTypes = Object.keys(ids).map(type => ids[type].entries())
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

export const AccordionHeader = ({children, id}) => (
  <div>
    {children}
  </div>
)
AccordionHeader.propTypes = { id: PropTypes.oneOfType([
  PropTypes.number,
  PropTypes.string
]).isRequired }

export const AccordionPanel = ({children}) => (
  <div>
    {children}
  </div>
)
AccordionHeader.propTypes = { id: PropTypes.oneOfType([
  PropTypes.number,
  PropTypes.string
]).isRequired }
