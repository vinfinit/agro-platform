import { Component } from 'react';

import styles from '../styles/main.scss'

const TreeNode = (props) => (
  <div>
    <a>{props.name}</a>
    {
      props.fields.map((field, key) => (
        <div key={key}>Field {key}</div>
      ))
    }
  </div>
);

class ControlPanel extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const cluster = this.props.cluster;

    return (
      <aside className={styles.controlPanel}>
        {
          <TreeNode 
            name={cluster.name}
            fields={cluster.fields}
          />
        }
      </aside>
    )
  }
}

export default ControlPanel