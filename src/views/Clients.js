import React, { useState } from "react";

const Clients = () => {
  return (
    <div style={{ background: "#777777", height: "calc(100vh - 60px)" }}>
      <p onClick={toggle}>Clients</p>
    </div>
  );
};

export default Clients;
