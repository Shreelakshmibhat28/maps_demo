import React from "react";
import { Polyline, Polygon, Circle } from "react-native-maps";
import { Region } from "react-native-maps";

interface ShapesProps {
  region?: Region; // Explicitly define the type
}

const Shapes: React.FC<ShapesProps> = ({ region }) => {
  if (!region) return null;

  return (
    <>
     
      <Polyline
        coordinates={[
          { latitude: 12.9716, longitude: 77.5946 }, // Bangalore
          { latitude: 13.0827, longitude: 80.2707 }, // Chennai
          { latitude: 17.3850, longitude: 78.4867 }, // Hyderabad
        ]}
        strokeColor="blue"
        strokeWidth={4}
      />

<Polyline
  coordinates={[
    { latitude: 18.5204, longitude:73.8567 }, // Pune
    { latitude: 15.2993, longitude: 74.1240 }, // Goa
    { latitude: 16.7050, longitude: 74.2433 }, // Hyderabad
  ]}
  strokeColor="blue"
  strokeWidth={4}
/>

      
      <Polygon
        coordinates={[
          { latitude: 12.9716, longitude: 77.5946 },
          { latitude: 13.0827, longitude: 80.2707 },
          { latitude: 17.3850, longitude: 78.4867 },
        ]}
        fillColor="rgba(255,0,0,0.5)"
        strokeColor="red"
        strokeWidth={2}
      />

<Polygon
        coordinates={[
          { latitude: 32.1024, longitude: 77.5619 },//Himachal pradesh
          { latitude: 31.1471, longitude: 75.3412 },//punjab
          { latitude: 30.0668, longitude: 79.0193 },//Uttarakhand
          { latitude: 29.0588, longitude: 76.0856 },//Haryana
          { latitude: 28.6139, longitude: 77.2088 },//new delhi
        ]}
        fillColor="rgba(255,0,0,0.5)"
        strokeColor="red"
        strokeWidth={2}
      />

      
      <Circle
        center={{ latitude: region.latitude, longitude: region.longitude }}
        radius={50000} // 50 km
        strokeWidth={2}
        strokeColor="green"
        fillColor="rgba(0,255,0,0.3)"
      />
    </>
  );
};

export default Shapes;
