import React from "react";
import flag from "../../images/logo/flag.png";
import maintenance from "../../images/logo/maintenance.png";
import map from "../../images/logo/map-2.png";
import prize from "../../images/logo/prize.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMapLocation,
  faAward,
  faPeopleGroup,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
// import { faStar } from "@fortawesome/free-regular-svg-icons";

const Summary = () => {
  return (
    <div className="bg-primary">
      <div className="my-10 py-20 lg:py-10 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 justify-between items-center gap-10 lg:gap-0">
        <div data-aos="zoom-in" class="card bg-primary">
          {/* <FontAwesomeIcon className="text-7xl" icon={faMapLocation} /> */}
          <figure className="w-24 mx-auto">
            <img src={flag} alt="flag" class="rounded-xl" />
          </figure>
          <div class="card-body items-center text-center text-white">
            <p className="text-3xl">BD</p>
            <h2 class="font-medium">Made in Bangladesh</h2>
            <button className="btn btn-outline bg-white mt-3">Read More</button>
          </div>
        </div>
        <div data-aos="zoom-in" class="card bg-primary">
          {/* <FontAwesomeIcon className="text-7xl" icon={faAward} /> */}
          <figure className="w-24 mx-auto">
            <img src={prize} alt="prize" class="rounded-xl" />
          </figure>
          <div class="card-body items-center text-center text-white">
            <p className="text-3xl">ISO 9001:2015</p>
            <h2 class="font-medium">ISO Certified</h2>
            <button className="btn btn-outline bg-white mt-3">Read More</button>
          </div>
        </div>
        <div data-aos="zoom-in" class="card bg-primary">
          {/* <FontAwesomeIcon className="text-7xl" icon={faPeopleGroup} /> */}
          <figure className="w-24 mx-auto">
            <img src={maintenance} alt="maintenance" class="rounded-xl" />
          </figure>
          <div class="card-body items-center text-center text-white">
            <p className="text-3xl">24/7</p>
            <h2 class="font-medium">Technical Support</h2>
            <button className="btn btn-outline bg-white mt-3">Read More</button>
          </div>
        </div>
        <div data-aos="zoom-in" class="card bg-primary">
          {/* <FontAwesomeIcon className="text-7xl" icon={faStar} /> */}
          <figure className="w-24 mx-auto">
            <img src={map} alt="map" class="rounded-xl" />
          </figure>
          <div class="card-body items-center text-center text-white">
            <p className="text-3xl">10+ Countries</p>
            <h2 className="font-medium">International Distribution</h2>
            <button className="btn btn-outline bg-white mt-3">Read More</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Summary;
