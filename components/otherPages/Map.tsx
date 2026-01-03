import React from "react";

export default function Map() {
  return (
    <section className="section-map ">
      <div className="wg-map">
        <div className="box-map">
          <div id="map" className="map">
            <iframe
              src="https://www.google.com/maps?q=29.362696,47.962198&hl=en&z=16&output=embed&cid=17293679640408904591"
              width="100%"
              style={{ width: "100%", height: "100%" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
