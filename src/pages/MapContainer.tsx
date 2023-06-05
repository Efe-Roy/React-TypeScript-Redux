import React, { useState } from "react";
import { MarkerClusterer } from "@react-google-maps/api";
import Map, { MapType } from "../components/Map";
import CustomMarker from "../components/CustomMarker";

const locations1 = [
  { lat: -31.56391, lng: 147.154312 },
  { lat: -33.718234, lng: 150.363181 },
  { lat: -33.727111, lng: 150.371124 },
  { lat: -33.848588, lng: 151.209834 },
  { lat: -33.851702, lng: 151.216968 },
  { lat: -34.671264, lng: 150.863657 },
  { lat: -35.304724, lng: 148.662905 },
  { lat: -36.817685, lng: 175.699196 },
  { lat: -36.828611, lng: 175.790222 },
  { lat: -37.75, lng: 145.116667 },
  { lat: -37.759859, lng: 145.128708 },
  { lat: -37.765015, lng: 145.133858 },
  { lat: -37.770104, lng: 145.143299 },
  { lat: -37.7737, lng: 145.145187 }
];

export default function MapContainer() {
  const [map, setMap] = useState<MapType | null>(null);
  const [searchLng, setSearchLng] = useState("");
  const [searchLat, setSearchLat] = useState("");

  const filteredLocations = locations1.filter((loc) => {
    const { lat, lng } = loc;
    if (searchLng && parseFloat(searchLng) !== lng) {
      return false;
    }
    if (searchLat && parseFloat(searchLat) !== lat) {
      return false;
    }
    return true;
  });
  

  React.useEffect(() => {
    function mapFitBounds() {
      // console.log("mapFitBounds:map> ", map);
      if (!map) return;

      const bounds = new google.maps.LatLngBounds();
      locations1.map((loc) =>
        bounds.extend(new google.maps.LatLng(loc.lat, loc.lng))
      );

      map.fitBounds(bounds);
    }

    if (map) {
      // map.panTo(...)
      mapFitBounds();
    }
  }, [map]);

  return (
    <div className="container">
      <input
        type="text"
        placeholder="Longitude"
        value={searchLng}
        onChange={(e) => setSearchLng(e.target.value)}
      />

      <input
        type="text"
        placeholder="Latitude"
        value={searchLat}
        onChange={(e) => setSearchLat(e.target.value)}
      />

      <Map setMap={setMap}>
        <MarkerClusterer>
          {(clusterer) => (
            <>
              {filteredLocations.map((loc) => (
                <CustomMarker
                  key={loc.lat}
                  position={loc}
                  clusterer={clusterer}
                  infoContent= "Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae quos repudiandae minima doloribus nemo quibusdam vel sunt alias beatae! Veniam voluptatibus consequatur, excepturi et officiis dolorum laudantium blanditiis placeat provident?"
                />
              ))}
            </>
          )}
        </MarkerClusterer>
      </Map>
    </div>
  );
}
