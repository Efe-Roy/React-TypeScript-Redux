import React from "react";
import { MarkerF, MarkerProps, InfoWindow } from "@react-google-maps/api";

interface CustomMarkerProps {
  position: MarkerProps["position"];
  clusterer: MarkerProps["clusterer"];
  infoContent: string;
}

export default function CustomMarker(props: CustomMarkerProps) {
  const { position, clusterer, infoContent } = props;
  const [isOpen, setIsOpen] = React.useState(false)

  const toggleInfoWindow = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <MarkerF position={position} clusterer={clusterer} onClick={toggleInfoWindow}/>
      {isOpen && (
        <InfoWindow position={position} onCloseClick={toggleInfoWindow}>
          <div>{infoContent}</div>
        </InfoWindow>
      )}
    </>
  );
}
