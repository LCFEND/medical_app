import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../../config";
import './ProfileCard.css'

const ProfileCard = () => {
  const [userDetails, setUserDetails] = useState({});
  const [updatedDetails, setUpdatedDetails] = useState({});
  const [editMode, setEditMode] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const authtoken = sessionStorage.getItem("auth-token");
    if (!authtoken) {
      navigate("/login");
    } else {
      fetchUserProfile();
    }
  }, [navigate]);

  const fetchUserProfile = async () => {
    try {
      const authtoken = sessionStorage.getItem("auth-token");
      const email = sessionStorage.getItem("email");

      if (!authtoken) {
        navigate("/login");
      } else {
        const storedUserDetails = JSON.parse(sessionStorage.getItem("userDetails"));
        if (storedUserDetails) {
          setUserDetails(storedUserDetails);
          setUpdatedDetails(storedUserDetails);
        } else {
          const response = await fetch(`${API_URL}/api/auth/user`, {
            headers: {
              Authorization: `Bearer ${authtoken}`,
              Email: email,
            },
          });

          if (response.ok) {
            const user = await response.json();
            setUserDetails(user);
            setUpdatedDetails(user);
            sessionStorage.setItem("userDetails", JSON.stringify(user));
          } else {
            throw new Error("Failed to fetch user profile");
          }
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleInputChange = (e) => {
    setUpdatedDetails({
      ...updatedDetails,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setUpdatedDetails({
      ...updatedDetails,
      imageUrl: URL.createObjectURL(file),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const authtoken = sessionStorage.getItem("auth-token");
      const email = sessionStorage.getItem("email");

      if (!authtoken || !email) {
        navigate("/login");
        return;
      }

      const payload = { ...updatedDetails };
      const response = await fetch(`${API_URL}/api/auth/user`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${authtoken}`,
          "Content-Type": "application/json",
          Email: email,
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        sessionStorage.setItem("userDetails", JSON.stringify(updatedDetails));
        setUserDetails(updatedDetails);
        setEditMode(false);
        alert("Profile Updated Successfully!");
        navigate("/");
      } else {
        throw new Error("Failed to update profile");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="profile-container">
      {editMode ? (
        <form onSubmit={handleSubmit}>
          <label>
            Email
            <input
              type="email"
              name="email"
              value={userDetails.email}
              disabled
            />
          </label>
          <label>
            Name
            <input
              type="text"
              name="name"
              value={updatedDetails.name}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Phone
            <input
              type="text"
              name="phone"
              value={updatedDetails.phone}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Address
            <input
              type="text"
              name="address"
              value={updatedDetails.address || ""}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Date of Birth
            <input
              type="date"
              name="dob"
              value={updatedDetails.dob || ""}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Sex
            <select
              name="sex"
              value={updatedDetails.sex || ""}
              onChange={handleInputChange}
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </label>
          <label>
            Profile Image
            <input
              type="file"
              name="imageUrl"
              onChange={handleFileChange}
            />
            {updatedDetails.imageUrl && (
              <img
                src={updatedDetails.imageUrl}
                alt="Profile"
                className="profile-image-preview"
              />
            )}
          </label>
          <button type="submit">Save</button>
        </form>
      ) : (
        <div className="profile-details">
          <h1>Welcome, {userDetails.name}</h1>
          {userDetails.imageUrl && (
            <img
              src={userDetails.imageUrl}
              alt="Profile"
              className="profile-image"
            />
          )}
          <p><b>Email:</b> {userDetails.email}</p>
          <p><b>Phone:</b> {userDetails.phone}</p>
          <p><b>Address:</b> {userDetails.address || "N/A"}</p>
          <p><b>Date of Birth:</b> {userDetails.dob || "N/A"}</p>
          <p><b>Sex:</b> {userDetails.sex || "N/A"}</p>
          <button onClick={handleEdit}>Edit</button>
        </div>
      )}
    </div>
  );
};

export default ProfileCard;
