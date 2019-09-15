import { Component } from 'react';
import { Treebeard } from 'react-treebeard'

import styles from '../styles/main.scss'
import theme from '../styles/controlPaneTheme'

class ControlPanel extends Component {
  constructor(props) {
    super(props);

    this.state = {
      clusters: props.clusters
    }
  }

  static getDerivedStateFromProps(props, cur_state) {
    if (cur_state.clusters !== props.clusters) {
      return {
        clusters: props.clusters
      }
    }
    return null
  }

  onToggle = (node, toggled) => {
    console.log(node)
    const { cursor, items } = this.state;
    if (cursor) {
      this.setState(() => ({ cursor, active: false }));
    }
    if (node.children) {
      node.active = toggled;
      node.toggled = toggled;
    }
    this.setState(() => ({ cursor: node, items }));
  }

  render() {
    return (
      <aside className={styles.controlPanel}>
        {
          this.state.clusters.map((cluster, c_index) => (
            <Treebeard 
              key={c_index} 
              data={cluster} 
              onToggle={this.onToggle}
              style={theme}
            />
          ))
        }
      </aside>
    )
  }
}

export default ControlPanel