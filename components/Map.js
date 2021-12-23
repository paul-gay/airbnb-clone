import ReactMapGL, {Marker, Popup} from 'react-map-gl';
import { useState } from 'react';
import getCenter from 'geolib/es/getCenter'

const Map = ({ searchResults }) => {
    const [selectedLocation, setSelectedLocation] = useState({})

    // const [viewport, setViewport] = useState({
    //     width: '100%',
    //     height: '100%',
    //     latitude: 37.7577,
    //     longitude: -122.4376,
    //     zoom: 12
    // });

    
    /*
    * transform searchResults object into the lat/long object that geolib needs per documentation
    * { latitude: 52.516272, longitude: 13.377722 }
    * use '{}' instead of '()' so that the map function returns an object 
    * EVERY time it maps through a result -- known as a 'direct' return
    */
    const coordinates = searchResults.map((result) => ({
        longitude: result.long,
        latitude: result.lat,
    }))
    // center based on lat and long of all results
    const center = getCenter(coordinates)

    const [viewport, setViewport] = useState({
        width: '100%',
        height: '100%',
        latitude: center.latitude,
        longitude: center.longitude,
        zoom: 11
    });

    // console.log(searchResults, coordinates)

    return (
        <ReactMapGL
            {...viewport}
            mapStyle='mapbox://styles/hapadesigner/ckx7jo29p2ult15qwm22ccsuf'
            mapboxApiAccessToken={process.env.mapbox_public_key}
            onViewportChange={(nextViewport) => setViewport(nextViewport)}
        >
            
            {searchResults.map((result) => (
                <div key={result.lat}>
                    <Marker
                        longitude={result.long}
                        latitude={result.lat}
                        offsetLeft={-20}
                        offsetTop={-10}
                    >
                        <p 
                            // set selectedLocation to the result
                            onClick={() => setSelectedLocation(result)}
                            className='cursor-pointer text-2xl animate-bounce'
                            aria-label='push-pin'
                        >
                            📌
                        </p>
                    </Marker>

                    {/* show popup when user clicks on marker based on selectedLocation -- conditional render */}
                    
                    {/* if selectedLocation.long is same as result.long -- then render popup */}
                    {selectedLocation.long === result.long ? (
                        <Popup
                            closeOnClick={true}
                            onClose={() => setSelectedLocation({})}
                            latitude={result.lat}
                            longitude={result.long}
                        >
                            {result.title}
                        </Popup>
                    ): (
                        false
                    )}
                    

                </div>
            ))}

           
            
        </ReactMapGL>
    )
}

export default Map
