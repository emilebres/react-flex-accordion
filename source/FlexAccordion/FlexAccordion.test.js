import test from 'tape'
import React from 'react'
import {shallow} from 'enzyme'

import {Accordion, AccordionHeader, AccordionPanel, validateAccordionChildren} from './FlexAccordion'

test('self closing accordion renders with no children', t => {
  const wrapper = shallow(<Accordion />)
  t.equal(wrapper.children().length, 0)
  t.end()
})

test('accordion children must be either headers or panels', t => {
  const error = (children, type) => {
    t.true(validateAccordionChildren(children, 'Accordion') instanceof Error, `detect an incorrect ${type}`)
  }
  error('foo', 'string')
  error(<div>bar</div>, 'div')
  const Foo = () => <span>bar</span>
  error(<Foo />, 'custom component')
  t.end()
})

test('accordion with one item', t => {
  const wrapper = shallow(
    <Accordion opened={{0: true}}>
      <AccordionHeader id={0}>
        Header0
      </AccordionHeader>
      <AccordionPanel id={0}>
        Panel0
      </AccordionPanel>
    </Accordion>
  )
  t.equal(wrapper.children().length, 2, 'has two children')
  t.equal(wrapper.find(AccordionHeader).length, 1, 'has one AccordionHeader')
  t.equal(wrapper.find(AccordionHeader).children().text(), 'Header0', 'header has correct content')
  t.equal(wrapper.find(AccordionPanel).length, 1, 'has one AccordionPanel')
  t.equal(wrapper.find(AccordionPanel).children().text(), 'Panel0', 'panel has correct content')
  t.end()
})

test('accordion with one opened item', t => {
  const wrapper = shallow(
    <Accordion opened={{0: true}}>
      <AccordionHeader id={0}>
        Header0
      </AccordionHeader>
      <AccordionPanel id={0}>
        Panel0
      </AccordionPanel>
    </Accordion>
  )
  t.equal(wrapper.find(AccordionPanel).length, 1, 'panel is present')
  t.end()
})

test('accordion with one closed item', t => {
  const wrapper = shallow(
    <Accordion opened={{0: false}}>
      <AccordionHeader id={0}>
        Header0
      </AccordionHeader>
      <AccordionPanel id={0}>
        Panel0
      </AccordionPanel>
    </Accordion>
  )
  t.equal(wrapper.find(AccordionPanel).length, 0, 'panel is not present')
  t.end()
})
