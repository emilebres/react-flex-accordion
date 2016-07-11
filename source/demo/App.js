import React from 'react'

import {FlexAccordionExample} from '../FlexAccordion/FlexAccordion.example'

const styles = {
  header: {
    backgroundColor: '#2196f3',
    color: 'rgba(255,255,255,0.85)',
    margin: 0,
    padding: '1rem 0'
  },

  container: {
    width: '800px',
    maxWidth: '100%',
    margin: '.5rem auto 0',
    padding: '0 1rem',
    textAlign: 'right'
  },

  headerLink: {
    color: '#fff'
  }
}

const App = () => (
  <div>
    <header style={styles.header}>
      <h1 style={{...styles.container, color: 'white'}}>React Flex Accordion</h1>
      <div style={styles.container}>
        Flex Accordion component in React
      </div>
      <div style={styles.container}>
        Docs and code on <a style={styles.headerLink} href='https://github.com/emilebres/react-flex-accordion/'>GitHub</a>.
      </div>
    </header>
    <FlexAccordionExample />
  </div>
)

export default App
