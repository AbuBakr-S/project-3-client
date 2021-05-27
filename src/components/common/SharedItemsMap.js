import React, { useEffect, useState } from 'react'
import ReactMapGl, { Marker } from 'react-map-gl'

import { getSharedInventoryItems } from '../../lib/api'
const mapBoxAccessToken = process.env.REACT_APP_MAPBOX_ACESS_TOKEN

const ICON = `M20.2,15.7L20.2,15.7c1.1-1.6,1.8-3.6,1.8-5.7c0-5.6-4.5-10-10-10S2,4.5,2,10c0,2,0.6,3.9,1.6,5.4c0,0.1,0.1,0.2,0.2,0.3
c0,0,0.1,0.1,0.1,0.2c0.2,0.3,0.4,0.6,0.7,0.9c2.6,3.1,7.4,7.6,7.4,7.6s4.8-4.5,7.4-7.5c0.2-0.3,0.5-0.6,0.7-0.9
C20.1,15.8,20.2,15.8,20.2,15.7z`

const SIZE = 20

function SharedItemsMap() {

  const [viewport, setViewport] = useState({
    // ! set to UK focus
    latitude: 1,
    longitude: 1,
    altitude: 0,
    zoom: 0,
    bearing: 0,
    pitch: 0,
  })

  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await getSharedInventoryItems()
        console.log(data)
      } catch (error) {
        console.log(error)
      }
    }
    getData()
  }, [])

  return (
    <div className="map-container">
      <ReactMapGl
        mapboxApiAccessToken={mapBoxAccessToken}
        mapStyle="mapbox://styles/mapbox/streets-v11"
        width="100%"
        height="100%"
        onViewportChange={(viewport => setViewport(viewport))}
        {...viewport}
      >
        <Marker latitude={37.78} longitude={-122.41} offsetLeft={0} offsetTop={0}>
          <svg
            height={SIZE}
            viewBox="0 0 24 24"
            style={{
              cursor: 'pointer',
              fill: '#d00',
              stroke: 'none',
              transform: `translate(${-SIZE / 2}px,${-SIZE}px)`,
            }}
          >
            <path d={ICON} />
          </svg>
        </Marker>
      </ReactMapGl>
    </div>
  )
}

export default SharedItemsMap
