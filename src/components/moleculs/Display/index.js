import React from "react";
import { bgDisplay, imgDisplay } from "../../../assets/images";

const Display = () => {
  return (
    <div>
      <div className="row">
        <div className="col-md-9 col-sm-12">
          <div className="card text-white">
            <img src={bgDisplay} className="card-img img-fluid" alt="..." />
            <div className="card-img-overlay p-5">
              <div className="row">
                <div className="col-md-7 col-sm-12">
                  <h1 className="card-title fw-bold fs-1">WAYSBUCKS</h1>
                  <p className="card-text mt-3 fs-5">
                    Things are changing, but we're still here for you
                  </p>
                  <p className="card-text mt-3 fs-6">
                    We have temporarily closed our in-store cafes, but select
                    grocery and drive-thru locations remaining open. Waysbucks
                    Drivers is also available Let's Order...
                  </p>
                  <p className="card-text mt-4 fs-6">Let's Order...</p>
                </div>
              </div>
            </div>
            <div className="position-absolute top-50 start-100 translate-middle">
              <img src={imgDisplay} alt="img-display"></img>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Display;
