import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";

import L from "leaflet";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

delete (L.Icon.Default.prototype as any)._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

interface Props {
  latitude: number;
  longitude: number;
  location: string;
  category: string;
  severity: string;
  priority: number;
}

export default function IncidentMap({
  latitude,
  longitude,
  location,
  category,
  severity,
  priority,
}: Props) {
  return (
    <div className="mt-12">

      <h3 className="text-4xl font-bold mb-2">
        Incident Location
      </h3>

      <p className="text-zinc-400 mb-6">
        AI detected this location from the citizen report.
      </p>

      <div className="rounded-3xl overflow-hidden border border-zinc-800">

        <MapContainer
          center={[latitude, longitude]}
          zoom={16}
          style={{
            height: "420px",
            width: "100%",
          }}
        >

          <TileLayer
            attribution='&copy; OpenStreetMap'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          <Marker position={[latitude, longitude]}>

            <Popup>

              <div className="space-y-2 min-w-55">

                <h3 className="font-bold text-lg">
                  📍 {location}
                </h3>

                <hr />

                <p>
                  <strong>Category:</strong>{" "}
                  {category}
                </p>

                <p>
                  <strong>Severity:</strong>{" "}
                  {severity}
                </p>

                <p>
                  <strong>Priority:</strong>{" "}
                  {priority}/100
                </p>

              </div>

            </Popup>

          </Marker>

        </MapContainer>

      </div>

    </div>
  );
}