import { useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
// posición del ícono del marcador
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet/dist/images/marker-shadow.png",
});
const InteractiveMap = () => {
  const [markers, setMarkers] = useState([]);
  const MapEvents = () => {
    useMapEvents({
      click(e) {
        const newMarker = { lat: e.latlng.lat, lng: e.latlng.lng };
        // Al hacer clic en el mapa, obtiene las coordenadas (latitud y longitud) del lugar donde se hizo clic.
        setMarkers((prevMarkers) => [...prevMarkers, newMarker]);
      },
    });
    return null;
  };
  return (
    // mediante la longitud del la ubicacion qu se desea se encuenta la ubicacion exacta
    <MapContainer
      center={[9.9758, -84.8351]}
      zoom={13}
      style={{ height: "200px", width: "30%", minHeight: "60px" }} // ACA EDITO LA POSICION Y TAMAÑO DEL MAPA
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      <MapEvents />
      {markers.map((position, idx) => (
        <Marker key={idx} position={position}>
          {/* popup es el mensaje que se muestra al pasar el cursor por encima de el icono  */}
          <Popup>
            Has hecho clic aquí!
            <br />
            {`Lat: ${position.lat}, Lng: ${position.lng}`}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};
export default InteractiveMap;
