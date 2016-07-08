import {setupDom} from '../utils/jsdomSetup'
setupDom()

import test from 'tape'
import React from 'react'
import {shallow, mount} from 'enzyme'

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

test('accordion children must have matched ids', t => {
  const error = (accordion, message) => {
    t.true(validateAccordionChildren(accordion.props.children, 'Accordion') instanceof Error, message)
  }
  error(
    <Accordion>
      <AccordionHeader id={0}>
        Header0
      </AccordionHeader>
      <AccordionHeader id={0}>
        Header0
      </AccordionHeader>
    </Accordion>,
    'two headers cannot have the same id')
  error(
    <Accordion>
      <AccordionPanel id={0}>
        Panel0
      </AccordionPanel>
      <AccordionPanel id={0}>
        Panel0
      </AccordionPanel>
    </Accordion>,
    'two panels cannot have the same id')
  error(
    <Accordion>
      <AccordionHeader id={0}>
        Header0
      </AccordionHeader>
    </Accordion>,
    'header must have panel with same id')
  error(
    <Accordion>
      <AccordionHeader id={0}>
        Header0
      </AccordionHeader>
      <AccordionPanel id={1}>
        Panel0
      </AccordionPanel>
    </Accordion>,
    'panel must have header with same ids')
  error(
    <Accordion>
      <AccordionHeader id={0}>
        Header0
      </AccordionHeader>
      <AccordionPanel id={1}>
        Panel0
      </AccordionPanel>
    </Accordion>,
    'header and panel must have matched ids')
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

test('accordion with two opened items', t => {
  const wrapper = shallow(
    <Accordion opened={{0: true, 1: true}}>
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
  t.equal(wrapper.find(AccordionHeader).length, 2, 'headers are present')
  t.equal(wrapper.find(AccordionPanel).length, 2, 'panels are present')
  t.end()
})

test('accordion with one opened item and one closed item', t => {
  const wrapper = shallow(
    <Accordion opened={{0: true}}>
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
  t.equal(wrapper.find(AccordionHeader).length, 2, 'headers are present')
  t.equal(wrapper.find(AccordionPanel).length, 1, 'one panel is present')
  t.end()
})

test('accordion with numbers and strings as id', t => {
  const wrapper = shallow(
    <Accordion opened={{foo: true}}>
      <AccordionHeader id={0}>
        Header0
      </AccordionHeader>
      <AccordionPanel id={0}>
        Panel0
      </AccordionPanel>
      <AccordionHeader id={'foo'}>
        Header foo
      </AccordionHeader>
      <AccordionPanel id={'foo'}>
        Panel foo
      </AccordionPanel>
    </Accordion>
  )
  t.equal(wrapper.find(AccordionHeader).length, 2, 'headers are present')
  t.equal(wrapper.find(AccordionPanel).length, 1, 'closed panel is not present')
  t.end()
})

test('click on a header calls onChange prop', t => {
  let i = 0
  const wrapper = mount(
    <Accordion opened={{0: true}} onChange={() => { i++ }}>
      <AccordionHeader id={0}>
        Header0
      </AccordionHeader>
      <AccordionPanel id={0}>
        Panel0
      </AccordionPanel>
    </Accordion>
  )
  wrapper.find(AccordionHeader).simulate('click')
  t.equal(i, 1, 'onChange has been called once')
  t.end()
})

test('click a disabled header does not call onChange prop', t => {
  let i = 0
  const wrapper = mount(
    <Accordion opened={{0: true}} onChange={() => { i++ }}>
      <AccordionHeader id={0} disabled>
        Header0
      </AccordionHeader>
      <AccordionPanel id={0}>
        Panel0
      </AccordionPanel>
    </Accordion>
  )
  wrapper.find(AccordionHeader).simulate('click')
  t.equal(i, 0, 'onChange has not been called')
  t.end()
})
