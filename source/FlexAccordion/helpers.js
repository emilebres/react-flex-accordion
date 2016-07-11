import {Children} from 'react'

import {AccordionHeader, AccordionPanel} from './FlexAccordion'

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
export const elementType = (component) => {
  if (!component.type) return typeof component
  return component.type.name || component.type
}

function intersectionArrays () {
  let n, len
  let ret = []
  let obj = {}
  const nOthers = arguments.length - 1
  let nShortest = arguments[0].length
  let shortest = 0
  for (let i = 0; i <= nOthers; i++) {
    n = arguments[i].length
    if (n < nShortest) {
      shortest = i
      nShortest = n
    }
  }
  for (let i = 0; i <= nOthers; i++) {
    n = (i === shortest) ? 0 : (i || shortest) // Read the shortest array first. Read the first array instead of the shortest
    len = arguments[n].length
    for (let j = 0; j < len; j++) {
      let elem = arguments[n][j]
      if (obj[elem] === i - 1) {
        if (i === nOthers) {
          ret.push(elem)
          obj[elem] = 0
        } else {
          obj[elem] = i
        }
      } else if (i === 0) {
        obj[elem] = 0
      }
    }
  }
  return ret
}

function arraysEqual (a, b) {
  if (a === b) return true
  if (a == null || b == null) return false
  if (a.length !== b.length) return false

  // If you don't care about the order of the elements inside
  // the array, you should sort both arrays here.

  for (let i = 0; i < a.length; ++i) {
    if (a[i] !== b[i]) return false
  }
  return true
}
