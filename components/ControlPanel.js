import { Component } from 'react';
import { Treebeard } from 'react-treebeard'

import styles from '../styles/main.scss'
import theme from '../styles/controlPaneTheme'

class ControlPanel extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: props.data
    }
  }

  onToggle = (node, toggled) => {
    const { cursor, data } = this.state;
    if (cursor) {
      this.setState(() => ({ cursor, active: false }));
    }
    if (node.children) {
      node.active = toggled;
      node.toggled = toggled;
    }
    this.setState(() => ({ cursor: node, data }));
  }

  render() {
    return (
      <aside className={styles.controlPanel}>
        {
          this.state.data.map((item, index) => (
            <Treebeard 
              key={index} 
              data={item} 
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