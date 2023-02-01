import React, { useState, useEffect, useRef } from "react";
import ReactMapGL, {
  GeolocateControl,
  NavigationControl,
  Marker,
  Popup,
} from "react-map-gl";
import { useDispatch, useSelector } from "react-redux";
import { fetchChefsBookingsAsync } from "../slices/chefsBookingsSlice";
import MapboxAccessToken, { MapBoxStyle } from "../../env";
import "mapbox-gl/dist/mapbox-gl.css";
import "./map.css";
import { MapSearchBar, SidebarList } from "../index";
import { setReduxViewport } from "../slices/viewportSlice";
import mapboxgl from '!mapbox-gl';

const Map = () => {
  // states for the selected markers and their popups
  const [selectedMarker, setSelectedMarker] = useState(null);

  const [bounds, setBounds] = useState(
    {
      latitude: [
        -42.1,
        -43.26,
      ],
      longitude: [
        72.01,
        72.5,
      ],
    }
  );
  console.log("BOUNDY BOUNDS", bounds)

  console.log("CURRENT BOUNDS -------------->>>");
  console.log("CURRENT BOUNDS -------------->>>", bounds);
  console.log("CURRENT BOUNDS -------------->>>");

  const reduxViewport = useSelector((state) => state.viewport);
  console.log("REDUX VIEWPORT", reduxViewport);

  const [viewport, setViewport] = useState(reduxViewport);

  // selecting all bookings that have been created
  const bookings = useSelector((state) => state.chefsBookings);
  const dispatch = useDispatch();

  // useEffect to run bookings
  useEffect(() => {
    dispatch(fetchChefsBookingsAsync());
  }, [dispatch, viewport, handleLoad]);


  const handleMoveMap = (e) => {
    console.log("MOVEY E", e.target.getBounds().getSouth());
    console.log("MOVEY E", e.target.getBounds().getNorth());

    setViewport({
      ...viewport,
      latitude: e.viewState.latitude,
      longitude: e.viewState.longitude,
      zoom: e.viewState.zoom,
    });
    console.log("GET BOUNDS ON MOVE--->", e.target.getBounds());
    setBounds({
      latitude: [
        e.target.getBounds().getSouth(),
        e.target.getBounds().getNorth(),
      ],
      longitude: [
        e.target.getBounds().getWest(),
        e.target.getBounds().getEast(),
      ],
    });
  };

  const handleLoad = (e) => {
    console.log("HANDLE LOAD ------------------>");
    console.log("HANDLE LOAD ------------------>", e.target);
    console.log("<------------------HANDLE LOAD");
    setBounds({
      latitude: [
        e.target.getBounds().getSouth(),
        e.target.getBounds().getNorth(),
      ],
      longitude: [
        e.target.getBounds().getWest(),
        e.target.getBounds().getEast(),
      ],
    });
  };

  return (
    // setting up the mapbox container
    <div className="map-page-container">
      <MapSearchBar viewport={viewport} setViewport={setViewport} />

      <div className="map-container">
        <SidebarList bounds={bounds} />

        <div className="map-map-container">
          {/* React Map Component to Access the Map */}
          <ReactMapGL
            {...viewport}
            mapStyle={MapBoxStyle}
            mapboxAccessToken={MapboxAccessToken}
            // this let's us be able to move the map
            onMove={handleMoveMap}
            onRender={handleLoad}
          >
            {/* navigation and geolocation control to get location, zoom, etc */}
            <NavigationControl />
            <GeolocateControl />


            {/* If there are bookings then we want to render the markers on the map */}
            {bookings &&
              bookings.map((booking) => (
                <Marker
                  key={booking.id}
                  longitude={booking.longitude}
                  latitude={booking.latitude}
                >
                  <button
                    className="map-marker-button"
                    onClick={(e) => {
                      e.preventDefault();
                      if (selectedMarker === booking) {
                        setSelectedMarker(null);
                      } else setSelectedMarker(booking);
                    }}
                  >
                    <img
                      className="map-pineapple-image"
                      src="/pineapple.png"
                      alt="pineapple marker"
                    />
                  </button>
                </Marker>
              ))}

            {/* These are actions to be able to handle the popups individually */}
            {selectedMarker ? (
              <Popup
                key={selectedMarker.id}
                longitude={selectedMarker.longitude}
                latitude={selectedMarker.latitude}
                closeButton={true}
                closeOnClick={false}
                onClose={() => setSelectedMarker(null)}
              >
                <div className="map-marker-popup">
                  <h3>{selectedMarker.title}</h3>
                  <p>{selectedMarker.menu}</p>
                  <p>
                    {selectedMarker.city}, {selectedMarker.state}
                  </p>
                </div>
              </Popup>
            ) : null}
          </ReactMapGL>
        </div>
      </div>
    </div>
  );
};

export default Map;
