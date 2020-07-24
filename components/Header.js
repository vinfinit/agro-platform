import Router from 'next/router'
import { Component } from 'react'
import Select from 'react-select'
import { Nav, Navbar } from 'react-bootstrap'
import { BoxArrowRight } from 'react-bootstrap-icons'
import styles from '../styles/Header.module.scss'

import { API_URL } from '../utils/constants'

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

  logout = async (e) => {
    e.preventDefault();
    await fetch(`${API_URL}/api/auth/logout`);
    Router.push('/login');
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
          instanceId="cluster-select"
          className={styles.clusterSelect}
          value={this.state.selectedCluster}
          onChange={this.handleClusterChange}
          options={this.state.options} 
        />
        <Navbar bg="light" expand="md">
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href="#logout" onClick={this.logout}>
                <BoxArrowRight size={24} />
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </header>
    )
  }
}

export default Header