import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
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
  faArrowUpFromBracket,
  faXmarkCircle,
} from "@fortawesome/free-solid-svg-icons";
import { faLinkedin } from "@fortawesome/free-brands-svg-icons";
import Updating from "../Shared/Updating/Updating";
import useUserInformation from "../../Hooks/useUserInformation";

const MyProfile = () => {
  const [editProfile, setEditProfile] = useState(false);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [user, loading, error] = useAuthState(auth);

  const [profileUser, isLoadingUser, refetch] = useUserInformation(user);

  if (isLoadingUser || loading) {
    return <Loading></Loading>;
  }

  if (updateLoading) {
    return <Updating></Updating>;
  }

  const imgbbAPIkey = "18a71459c4944f29646f860968c71813";

  const handleUpdatedp = (event) => {
    setUpdateLoading(true);
    event.preventDefault();
    const profilePicture = event.target.image.files[0];
    // console.log("profilePicture", profilePicture);
    if (!profilePicture) {
      setUpdateLoading(false);
      Swal.fire("Error", "Please Choose a Photo", "error");
      // setEditProfile(!editProfile);
      return;
    }
    const formData = new FormData();
    formData.append("image", profilePicture);
    const url = `https://api.imgbb.com/1/upload?key=${imgbbAPIkey}`;
    fetch(url, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((result) => {
        // console.log(result);
        if (result.success) {
          const img = result.data.url;
          fetch(
            `${process.env.REACT_APP_LOCAL_SERVER_URL}/profilePicture/${user.email}`,
            {
              method: "PUT",
              headers: {
                "content-type": "application/json",
                authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
              },
              body: JSON.stringify({ profilePicture: img }),
            }
          )
            .then((res) => {
              // console.log(res);
              return res.json();
            })
            .then((acknowledged) => {
              if (acknowledged) {
                Swal.fire(
                  "Success",
                  "Your Profile Picture has been updated!",
                  "success"
                );
                setUpdateLoading(false);
                setEditProfile(!editProfile);
                refetch();
              }
            });
        }
      });
  };

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
    fetch(`${process.env.REACT_APP_LOCAL_SERVER_URL}/profile/${user.email}`, {
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

  const handleRemoveDp = () => {
    setUpdateLoading(true);
    fetch(
      `${process.env.REACT_APP_LOCAL_SERVER_URL}/profilePicture/${user.email}`,
      {
        method: "PUT",
        headers: {
          "content-type": "application/json",
          authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
        },
        body: JSON.stringify({
          profilePicture:
            "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png",
        }),
      }
    )
      .then((res) => {
        // console.log(res);
        return res.json();
      })
      .then((acknowledged) => {
        if (acknowledged) {
          Swal.fire("Success", "Profile Picture Removed!", "success");
          setUpdateLoading(false);
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
          className={`card w-full max-w-lg bg-base-100 shadow-xl ${
            editProfile && "blur-sm"
          }`}
        >
          <div className="card-body">
            <div className="avatar">
              <div className="w-32 rounded-xl">
                <img
                  src={
                    profileUser?.profilePicture ||
                    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png"
                  }
                  alt="PP"
                />
              </div>
            </div>
            <h2 className="card-title">{user.displayName}</h2>
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
                LinkedIn:{" "}
                <a
                  href={profileUser?.linkedIn}
                  rel="noreferrer"
                  target={"_blank"}
                >
                  {profileUser?.linkedIn}
                </a>
              </span>
            </p>
            <div className="card-actions justify-end">
              <button
                onClick={() => setEditProfile(!editProfile)}
                className={`btn bg-gradient-to-r from-secondary to-primary text-white ${
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
              <div className="flex justify-end">
                <span>
                  <FontAwesomeIcon
                    onClick={() => setEditProfile(!editProfile)}
                    className="text-2xl text-red-500 hover:cursor-pointer"
                    icon={faXmarkCircle}
                  />
                </span>
              </div>
              <div>
                <p className="my-4 text-center">Upload Profile Information</p>
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
                      value="Update Info"
                    />
                  </div>
                </form>
                <p className="my-4 text-center">Upload Profile Picture</p>
                <form onSubmit={handleUpdatedp}>
                  <div className="flex flex-col lg:flex-row justify-between items-center w-full max-w-lg mb-2">
                    <label className="flex justify-center items-center bg-gray-200 p-2 rounded-lg hover:cursor-pointer">
                      <input
                        className="hidden"
                        id="image"
                        name="image"
                        type="file"
                        accept="image/png, image/jpeg,image/jpg"
                      />
                      <span>Choose</span>
                      <FontAwesomeIcon
                        className="ml-2"
                        icon={faArrowUpFromBracket}
                      />
                    </label>
                    <input
                      className="btn bg-gradient-to-r from-secondary to-primary text-white my-3"
                      type="submit"
                      value="Update  Photo"
                    />
                  </div>
                </form>
                <div className="flex justify-center lg:justify-end">
                  <button onClick={handleRemoveDp} className="btn btn-error">
                    Remove Photo
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyProfile;
