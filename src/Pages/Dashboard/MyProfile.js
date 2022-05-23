import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useQuery } from "react-query";
import auth from "../../firebase.init";
import Loading from "../Shared/Loading/Loading";
import "./MyProfile.css";
import Swal from "sweetalert2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faSchool,
  faLocationDot,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";
import { faLinkedin } from "@fortawesome/free-brands-svg-icons";

const MyProfile = () => {
  const [editProfile, setEditProfile] = useState(false);
  const [user, loading, error] = useAuthState(auth);
  const {
    data: profileUser,
    isLoading,
    refetch,
  } = useQuery(["user", user.email], () =>
    fetch(`https://zipgrip-tooling.herokuapp.com/profile/${user.email}`, {
      method: "GET",
      headers: {
        authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
      },
    }).then((res) => res.json())
  );

  if (isLoading || loading) {
    return <Loading></Loading>;
  }

  const handleEditProfile = (event) => {
    event.preventDefault();
    const profile = {
      name: event.target.name.value,
      email: event.target.email.value,
      institution: event.target.institution.value,
      address: event.target.address.value,
      number: event.target.number.value,
      linkedIn: event.target.linkedIn.value,
    };
    // console.log(profile);
    fetch(`https://zipgrip-tooling.herokuapp.com/profile/${user.email}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
      },
      body: JSON.stringify(profile),
    })
      .then((res) => res.json())
      .then((acknowledged) => {
        if (acknowledged) {
          Swal.fire("Success", "Your Profile has been updated!", "success");
          setEditProfile(!editProfile);
          refetch();
        }
      });
  };

  return (
    <div>
      <h2 className="text-primary text-center lg:text-left text-2xl lg:text-3xl my-4 font-semibold">
        My Profile
      </h2>
      <div className="flex flex-col lg:flex-row justify-between gap-5">
        <div
          class={`card w-full max-w-lg bg-base-100 shadow-xl ${
            editProfile && "blur-sm"
          }`}
        >
          <div class="card-body">
            <h2 class="card-title">{user.displayName}</h2>
            <p>
              <FontAwesomeIcon className="mr-2" icon={faEnvelope} />
              <span>Email: {user.email}</span>
            </p>
            <p>
              <FontAwesomeIcon className="mr-2" icon={faSchool} />
              <span>Institution: {profileUser?.institution}</span>
            </p>
            <p>
              <FontAwesomeIcon className="mr-2" icon={faPhone} />
              <span>Number: {profileUser?.number}</span>
            </p>
            <p>
              <FontAwesomeIcon className="mr-2" icon={faLocationDot} />
              <span>Address: {profileUser?.address}</span>
            </p>
            <p>
              <FontAwesomeIcon className="mr-2" icon={faLinkedin} />
              <span>
                LinkedIn Profile:{" "}
                <a
                  href={profileUser?.linkedIn}
                  rel="noreferrer"
                  target="_blank"
                >
                  {profileUser?.linkedIn}
                </a>
              </span>
            </p>
            <div class="card-actions justify-end">
              <button
                onClick={() => setEditProfile(!editProfile)}
                class={`btn bg-gradient-to-r from-secondary to-primary text-white ${
                  editProfile && "hidden"
                }`}
              >
                Edit Profile
              </button>
            </div>
          </div>
        </div>
        {editProfile && (
          <div className="card w-full max-w-lg bg-base-100 shadow-xl">
            <div className="card-body">
              <div>
                <form onSubmit={handleEditProfile}>
                  <div className="form-control w-full max-w-lg mb-2">
                    <label className="label lg:hidden ">
                      <span className="label-text font-semibold">
                        Your Name
                      </span>
                    </label>
                    <label className="input-group w-full max-w-lg">
                      <span className="w-36 justify-center hidden lg:flex">
                        Name
                      </span>
                      <input
                        type="text"
                        defaultValue={user.displayName}
                        id="name"
                        name="name"
                        className="input input-bordered w-full max-w-lg"
                        disabled
                        required
                      />
                    </label>
                  </div>

                  <div className="form-control w-full max-w-lg mb-2">
                    <label className="label lg:hidden ">
                      <span className="label-text font-semibold">
                        Your Email
                      </span>
                    </label>
                    <label className="input-group w-full max-w-lg">
                      <span className="w-36 justify-center hidden lg:flex">
                        Email
                      </span>
                      <input
                        type="email"
                        defaultValue={profileUser.email}
                        id="email"
                        name="email"
                        className="input input-bordered w-full max-w-lg"
                        disabled
                        required
                      />
                    </label>
                  </div>
                  <div className="form-control w-full max-w-lg mb-2">
                    <label className="label lg:hidden ">
                      <span className="label-text font-semibold">
                        Institution
                      </span>
                    </label>
                    <label className="input-group w-full max-w-lg">
                      <span className="w-36 justify-center hidden lg:flex">
                        Institution
                      </span>
                      <input
                        type="text"
                        defaultValue={profileUser?.institution}
                        id="institution"
                        name="institution"
                        className="input input-bordered w-full max-w-lg"
                      />
                    </label>
                  </div>
                  <div className="form-control w-full max-w-lg mb-2">
                    <label className="label lg:hidden ">
                      <span className="label-text font-semibold">Address</span>
                    </label>
                    <label className="input-group w-full max-w-lg">
                      <span className="w-36 justify-center hidden lg:flex">
                        Address
                      </span>
                      <input
                        type="text"
                        defaultValue={profileUser?.address}
                        id="address"
                        name="address"
                        className="input input-bordered w-full max-w-lg"
                      />
                    </label>
                  </div>
                  <div className="form-control w-full max-w-lg mb-2">
                    <label className="label lg:hidden ">
                      <span className="label-text font-semibold">Number</span>
                    </label>
                    <label className="input-group w-full max-w-lg">
                      <span className="w-36 justify-center hidden lg:flex">
                        Number
                      </span>
                      <input
                        type="number"
                        defaultValue={profileUser?.number}
                        id="number"
                        name="number"
                        className="input input-bordered w-full max-w-lg"
                      />
                    </label>
                  </div>
                  <div className="form-control w-full max-w-lg mb-2">
                    <label className="label lg:hidden ">
                      <span className="label-text font-semibold">LinkedIn</span>
                    </label>
                    <label className="input-group w-full max-w-lg">
                      <span className="w-36 justify-center hidden lg:flex">
                        LinkedIn
                      </span>
                      <input
                        type="text"
                        defaultValue={profileUser?.linkedIn}
                        id="linkedIn"
                        name="linkedIn"
                        className="input input-bordered w-full max-w-lg"
                      />
                    </label>
                  </div>
                  <div className="card-actions justify-end">
                    <input
                      className="btn bg-gradient-to-r from-secondary to-primary text-white my-3"
                      type="submit"
                      value="Update"
                    />
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyProfile;
