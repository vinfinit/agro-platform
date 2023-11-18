import Router from 'next/router'
import { useEffect, useState } from 'react'
import { MenuItem, Select, Button } from '@mui/material'
import { Nav, Navbar } from 'react-bootstrap'
import { BoxArrowRight } from 'react-bootstrap-icons'
import styles from '../styles/Header.module.scss'

import { API_URL } from '../utils/constants'
import { useEvents } from '../utils/useEvents'

const CLUSTER_LOCAL_STORAGE_KEY = 'agro-platform-selected-cluster'

const Header = (props) => {
  const { clusterList, setCluster } = props

  const eventsEmitter = useEvents()
  const [clusters, _] = useState(clusterList.map(cluster => ({
    value: cluster._id,
    label: cluster.name,
  })))
  const [selectedCluster, setSelectedCluster] = useState('')

  const logout = async (e) => {
    e.preventDefault();
    await fetch(`${API_URL}/api/auth/logout`);
    Router.push('/login');
  }

  const changeCluster = (clusterValue) => {
    const cluster = clusterList.find(cluster => cluster._id === clusterValue)
    if (cluster) {
      setCluster(cluster)
      setSelectedCluster(clusterValue)
      localStorage.setItem(CLUSTER_LOCAL_STORAGE_KEY, clusterValue)
      setCluster(cluster)
    }
  }

  const handleClusterChange = (event) => {
    const selectedCluster = event.target.value
    changeCluster(selectedCluster)
  }

  const onSave = () => {
    eventsEmitter.emit('SAVE')
  }

  useEffect(() => {
    const storedCluster = localStorage.getItem(CLUSTER_LOCAL_STORAGE_KEY)
    console.log('storedCluster', storedCluster, clusters)
    if (storedCluster && clusters.find(({ value, _ }) => storedCluster === value)) {
      changeCluster(storedCluster)
    } else {
      changeCluster(clusters[0].value)
    }
  }, [clusters, changeCluster])

  return (
    <header className={styles.header}>
      <Select 
        className={styles.clusterSelect}
        value={selectedCluster}
        onChange={handleClusterChange}
      >
        {
          clusters.map(({value, label}) => (
            <MenuItem
              key={value}
              value={value}
            >
              {label}
            </MenuItem>
          ))
        }
      </Select>
      <Button onClick={onSave}>
        Save
      </Button>
      <Navbar bg="light" expand="md">
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="#logout" onClick={logout}>
              <BoxArrowRight size={24} />
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </header>
  )
}

export default Header