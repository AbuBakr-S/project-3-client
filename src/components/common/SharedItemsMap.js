import React, { useEffect, useState } from 'react'
import ReactMapGl, { Marker, Popup } from 'react-map-gl'

import { getSharedInventoryItems } from '../../lib/api'
import ItemInfo from './map/ItemInfo'
import Pins from './map/Pins'
const mapBoxAccessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN

function SharedItemsMap() {
  const [viewport, setViewport] = useState({
    latitude: 5,
    longitude: 5,
    altitude: 5,
    zoom: 1,
    bearing: 0,
    pitch: 0,
  })
  const [sharedItems, setSharedItems] = useState()
  const [popupInfo, setPopupInfo] = useState(null)

  const ICON = `M20.2,15.7L20.2,15.7c1.1-1.6,1.8-3.6,1.8-5.7c0-5.6-4.5-10-10-10S2,4.5,2,10c0,2,0.6,3.9,1.6,5.4c0,0.1,0.1,0.2,0.2,0.3
  c0,0,0.1,0.1,0.1,0.2c0.2,0.3,0.4,0.6,0.7,0.9c2.6,3.1,7.4,7.6,7.4,7.6s4.8-4.5,7.4-7.5c0.2-0.3,0.5-0.6,0.7-0.9
  C20.1,15.8,20.2,15.8,20.2,15.7z`

  const SIZE = 20

  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await getSharedInventoryItems()
        console.log(data)
        setSharedItems(data)
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
        className="is-fullheight-with-navbar"
      >

        {sharedItems && <Pins sharedItemsProp={sharedItems} onClick={setPopupInfo} />}

        {popupInfo && (
          <Popup
            tipSize={5}
            anchor="top"
            longitude={Number(popupInfo[0].user.coordinates[1])}
            latitude={Number(popupInfo[0].user.coordinates[0])}
            closeOnClick={false}
            onClose={setPopupInfo}
          >
            <ItemInfo key={`${popupInfo[0].user.username}`} items={popupInfo}/>
          </Popup>
        )}

        <Marker key="firstmarker" longitude={-122.45} latitude={37.78}>
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