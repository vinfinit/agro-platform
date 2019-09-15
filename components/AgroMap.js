import { Fragment, Component } from 'react'
import { GoogleMap } from '@react-google-maps/api'

import ControlPanel from './ControlPanel'
import FlaxCluster from './FlaxCluster'

class AgroMap extends Component {
  constructor(props) {
    super(props);

    this.state = {
      clusters: props.items
    }
  }

  itemOnClick = (n_cluster) => (index) => {
    console.log('onclick', n_cluster, index)
    console.log(this.state)
    this.setState(prevState => {
      const changedCluster = prevState.clusters[n_cluster].children.map((item, j) => {
        if(index === j) {
          return Object.assign({}, item, {active: !item.active})
        }
        return item
      });
      return {
        clusters: prevState.clusters.map((cluster, j_cluster) => {
          if(n_cluster === j_cluster) {
            return Object.assign({}, cluster, {children: changedCluster})
          }
          return cluster
        })
      } 
    })
  }

  render() {
    return (
      <Fragment>
        <GoogleMap
          id="agro-platform-map"
          mapContainerStyle={{
            height: "100%",
            width: "80%"
          }}
          zoom={6}
          center={{
            lat: 53.768,
            lng: 27.592
          }}
        >
          {
            this.state.clusters.map((item, c_index) => (
              <FlaxCluster 
                key={c_index} 
                items={item.children} 
                itemOnClick={this.itemOnClick(c_index)} 
              />
            ))
          }
        </GoogleMap>
        <ControlPanel 
          clusters={this.state.clusters}
          itemOnClick={this.itemOnClick} 
        />
      </Fragment>
    )
  }
}

export default AgroMap