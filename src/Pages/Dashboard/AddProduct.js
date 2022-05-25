import { signOut } from "firebase/auth";
import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import auth from "../../firebase.init";
import Loading from "../Shared/Loading/Loading";

const AddProduct = () => {
  const [user, loading, error] = useAuthState(auth);
  const [adding, setAdding] = useState(false);
  const navigate = useNavigate();

  const imgbbAPIkey = "18a71459c4944f29646f860968c71813";

  const handleAddProduct = async (event) => {
    setAdding(true);
    event.preventDefault();
    const image = event.target.image.files[0];
    const formData = new FormData();
    formData.append("image", image);

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
          const product = {
            addedBy: user?.email,
            name: event.target.name.value,
            available: event.target.available.value,
            minimum: event.target.minimum.value,
            price: event.target.price.value,
            description: event.target.description.value,
            image: img,
          };
          console.log(product);
          fetch("http://localhost:5000/product", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
            },
            body: JSON.stringify(product),
          }).then((res) => {
            // console.log("res", res);
            if (res.status === 403 || res.status === 401) {
              signOut(auth);
              localStorage.removeItem("jwtToken");
              navigate("/login");
            }
            if (res.status === 200) {
              setAdding(false);
              Swal.fire({
                title: "Success!",
                text: "Product Added",
                icon: "success",
                confirmButtonText: "Proceed",
              });
              event.target.reset();
            }
          });
        }
      });
  };

  if (adding) {
    return <Loading></Loading>;
  }

  return (
    <div>
      <h2 className="text-primary text-center lg:text-left text-2xl lg:text-3xl my-4 font-semibold">
        Add Product
      </h2>
      <div className="my-10 flex flex-col justify-center items-center">
        <div className="card w-full max-w-lg bg-base-100 shadow-xl">
          <div className="card-body">
            <form onSubmit={handleAddProduct}>
              <div className=" mb-3">
                <h2 className="card-title">Product Name</h2>
                <input
                  type="text"
                  name="name"
                  id="name"
                  className="input-bordered input w-full max-w-lg"
                  required
                />
              </div>
              <div className=" mb-3">
                <h2 className="card-title">Quantity in Stock</h2>
                <input
                  type="number"
                  className="input-bordered input w-full max-w-lg  "
                  name="available"
                  id="available"
                  required
                />
              </div>
              <div className=" mb-3">
                <h2 className="card-title">Minimum Order Quantity</h2>
                <input
                  type="number"
                  className="input-bordered input w-full max-w-lg  "
                  name="minimum"
                  id="minimum"
                  required
                />
              </div>
              <div className=" mb-3">
                <h2 className="card-title">Price per Unit</h2>
                <input
                  type="number"
                  className="input-bordered input w-full max-w-lg  "
                  name="price"
                  id="price"
                  required
                />
              </div>
              <div className=" mb-3">
                <h2 className="card-title">Product Image</h2>
                <input
                  type="file"
                  className="input-bordered input w-full max-w-lg  "
                  name="image"
                  id="image"
                  accept="image/png, image/jpeg,image/jpg"
                  required
                />
              </div>
              <div className=" mb-3">
                <h2 className="card-title">Description</h2>
                <textarea
                  type="text"
                  className="input-bordered input w-full max-w-lg h-32"
                  name="description"
                  id="description"
                  required
                />
              </div>
              <div>
                <input
                  type="submit"
                  className="btn bg-gradient-to-r from-secondary to-primary text-white w-full max-w-lg"
                  value="Add"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
