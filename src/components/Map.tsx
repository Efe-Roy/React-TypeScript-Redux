import React from "react";
import {
  GoogleMap,
  GoogleMapProps,
  useLoadScript
} from "@react-google-maps/api";

const defaultCenter = { lat: 28.612734, lng: 77.231178 };

const options = {
  disableDefaultUI: true,
  scaleControl: true,
  mapTypeId: "roadmap",
  labels: true
};

export type MapType = Parameters<NonNullable<GoogleMapProps["onLoad"]>>[0];

type MapProps = React.PropsWithChildren<{
  setMap: (map: MapType) => void | Promise<void>;
}>;

export default function Map(props: MapProps) {
  const { setMap, children } = props;
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyBsk8fe2yngY-Nz5su1YrOLUneiYcYXSms" // ,
    // ...otherOptions
  });

  const renderMap = () => {
    // wrapping to a function is useful in case you want to access `window.google`
    // to eg. setup options or create latLng object, it won't be available otherwise
    // feel free to render directly if you don't need that

    // const onLoad = React.useCallback(function onLoad(mapInstance) {
    //   // do something with map Instance
    //   setMapRef(mapInstance);
    // });

    const loadHandler = (map: MapType) => {
      setMap(map);
    };

    return (
      <GoogleMap
        id="circle-example"
        mapContainerStyle={{
          height: "550px",
          width: "1200px"
        }}
        zoom={7}
        center={defaultCenter}
        options={options}
        onLoad={loadHandler}
      >
        {children}
      </GoogleMap>
    );
  };

  if (loadError) {
    return <div>Map cannot be loaded right now, sorry.</div>;
  }

  return isLoaded ? renderMap() : <div>Loading...</div>;
}
