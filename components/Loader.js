import { Spinner } from 'react-bootstrap'

import styles from '../styles/Loader.module.scss'

const Loader = () => (
  <section className={styles.spinnerContainer}>
    <Spinner 
      className={styles.spinnerItem}
      animation="border" 
    />
  </section>
);

export default Loader