// src/components/DeviceList.jsx

import React from "react";
import { DeviceCard } from "./DeviceCard.jsx";

export function DeviceList({ devices, select }) {
  return (
    <div className="d-flex flex-wrap justify-content-center">
      {devices.map((d) => (
        <DeviceCard
          key={d.id}
          device={d}
          select={select}   // ← ESTA ES LA CLAVE
        />
      ))}
    </div>
  );
}