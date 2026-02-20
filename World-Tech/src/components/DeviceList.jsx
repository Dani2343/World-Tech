import React from "react";
import { DeviceCard } from "./DeviceCard.jsx";

export function DeviceList({ devices, onSelect }) {
  return (
    <div className="d-flex flex-wrap justify-content-center">
      {devices.map((d) => (
        <DeviceCard key={d.id} device={d} onSelect={onSelect} />
      ))}
    </div>
  );
}