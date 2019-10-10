import { Component } from 'react'
import Select from 'react-select'
import styles from '../styles/main.scss'

class Header extends Component {
  constructor(props) {
    super(props);
    const options = props.clusterList.map(cluster => ({
      value: cluster._id,
      label: cluster.name,
    }));

    this.state = {
      selectedCluster: options[0],
      options,
    }
  }

  handleClusterChange = (selectedCluster) => {
    this.setState({ selectedCluster });
    this.props.clusterList.find(cluster => {
      if (cluster._id === selectedCluster.value) {
        this.props.setCluster(cluster);
        return true
      }
    })
  }

  render() {
    return (
      <header className={styles.header}>
        <Select 
          className={styles.clusterSelect}
          value={this.state.selectedCluster}
          onChange={this.handleClusterChange}
          options={this.state.options} 
        />
      </header>
    )
  }
}

export default Header