import React from 'react'

import {FlexAccordionExample} from '../FlexAccordion'
import styles from './App.css'

const App = () => (
  <div>
    <header className={styles.header}>
      <h1 className={styles.container}>React Flex Accordion</h1>
      <div className={styles.container}>
        Flex Accordion component in React
      </div>
      <div className={styles.container}>
        Docs and code on <a className={styles.headerLink} href='https://github.com/emilebres/react-flex-accordion/'>GitHub</a>.
      </div>
    </header>
    <section className={styles.container}>
      <FlexAccordionExample />
    </section>
  </div>
)

export default App
