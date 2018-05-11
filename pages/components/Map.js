import GoogleMaps from 'google-map-react'
import styled from 'styled-components'
import config from 'next/config'

const { GOOGLE_MAPS_API_KEY} = config().publicRuntimeConfig

const Marker = styled.div`
  background: green;
  border-radius: 50%;
  width: 10px;
  height: 10px;
`

const Map = ({ peers }) => {
  const defaultCenter = {
    lat: peers[0].latitude,
    lng: peers[0].longitude
  }

  return (
    <div style={{ height: '600px', width: '900px' }}>
      <GoogleMaps
        bootstrapURLKeys={{ key: GOOGLE_MAPS_API_KEY }}
        defaultCenter={defaultCenter}
        zoom={1}
      >
        { peers.map(({ latitude, longitude, city }, index) => (
          <Marker
            key={ index }
            lat={ latitude }
            lng={ longitude }
           />))
        }
      </GoogleMaps>
    </div>
  )
}

export default Map