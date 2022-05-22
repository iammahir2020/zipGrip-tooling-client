import React from "react";
import flag from "../../images/logo/flag.png";
import maintenance from "../../images/logo/maintenance.png";
import map from "../../images/logo/map-2.png";
import prize from "../../images/logo/prize.png";
import people from "../../images/logo/people.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMapLocation,
  faAward,
  faPeopleGroup,
  faStar,
} from "@fortawesome/free-solid-svg-icons";

const Summary = () => {
  return (
    <div className="bg-accent">
      <div className="my-10 py-10 max-w-5xl mx-auto flex flex-col lg:flex-row justify-between items-center gap-10 lg:gap-0">
        <div class="card bg-accent">
          <FontAwesomeIcon className="text-7xl" icon={faMapLocation} />
          <div class="card-body items-center text-center">
            <p className="text-4xl font-bold">10+</p>
            <h2 class="card-title">Countries</h2>
          </div>
        </div>
        <div class="card bg-accent">
          <FontAwesomeIcon className="text-7xl" icon={faAward} />
          <div class="card-body items-center text-center">
            <p className="text-4xl font-bold">ISO 9001:2015</p>
            <h2 class="card-title">ISO Certified</h2>
          </div>
        </div>
        <div class="card bg-accent">
          <FontAwesomeIcon className="text-7xl" icon={faPeopleGroup} />
          <div class="card-body items-center text-center">
            <p className="text-4xl font-bold">120+</p>
            <h2 class="card-title">Happy Clients</h2>
          </div>
        </div>
        <div class="card bg-accent">
          <FontAwesomeIcon className="text-7xl" icon={faStar} />
          <div class="card-body items-center text-center">
            <p className="text-4xl font-bold">300+</p>
            <h2 className="card-title">Positive Reviews</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Summary;