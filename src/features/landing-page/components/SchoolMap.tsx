import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";

// Fix Leaflet marker icon paths
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: new URL("leaflet/dist/images/marker-icon-2x.png", import.meta.url).toString(),
  iconUrl: new URL("leaflet/dist/images/marker-icon.png", import.meta.url).toString(),
  shadowUrl: new URL("leaflet/dist/images/marker-shadow.png", import.meta.url).toString(),
});

function SchoolMap() {
  const [isMounted, setIsMounted] = useState(false);
  const position: [number, number] = [3.5921669378452434, 98.61272055092434]; 

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <div className="mt-20 h-[50vh]">
      {isMounted && (
        <MapContainer
          center={position}
          zoom={16}
          scrollWheelZoom={false}
          className="h-full w-full"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={position}>
            <Popup>
              <p onClick={() => window.open("https://maps.app.goo.gl/VNBdtuoHCbn8YyBt9", "_blank")} className="underline text-blue-400 cursor-pointer">Yayasan Perguruan Letjen Haryono M.T.</p>
            </Popup>
          </Marker>
        </MapContainer>
      )}
    </div>
  );
}

export default SchoolMap;
