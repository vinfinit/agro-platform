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
    return (
      <aside className={styles.controlPanel}>
        {
          this.props.nodes.map((node, key) => (
            <TreeNode 
              key={key} 
              name={node.name}
              fields={node.fields}
            ></TreeNode>
          ))
        }
      </aside>
    )
  }
}

export default ControlPanel