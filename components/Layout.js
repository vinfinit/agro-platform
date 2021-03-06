import Header from './Header'
import styles from '../styles/Layout.module.scss'

const Layout = props => (
  <div>
    <Header 
      clusterList={props.clusterList}
      setCluster={props.setCluster}
    />
    <section className={styles.container}>
      {props.children}
    </section>
  </div>
);

export default Layout