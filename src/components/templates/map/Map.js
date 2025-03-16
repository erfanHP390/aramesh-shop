"use client";
import dynamic from "next/dynamic";
import "leaflet/dist/leaflet.css";
import React from 'react';
import styles from "./Map.module.css";

// بارگذاری پویای کامپوننت‌های Leaflet
const MapContainer = dynamic(
  () => import("react-leaflet").then((L) => L.MapContainer),
  { ssr: false }
);
const TileLayer = dynamic(
  () => import("react-leaflet").then((L) => L.TileLayer),
  { ssr: false }
);
const Marker = dynamic(
  () => import("react-leaflet").then((L) => L.Marker),
  { ssr: false }
);
const Popup = dynamic(
  () => import("react-leaflet").then((L) => L.Popup),
  { ssr: false }
);

export default function Map({ position, center, children }) {
  return (
    <>
      <MapContainer
        className={styles.map}
        center={center}
        zoom={14}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position}>
          <Popup>Set Coffee</Popup>
        </Marker>
      </MapContainer>
      <div className={styles.details}>{children}</div>
    </>
  );
}