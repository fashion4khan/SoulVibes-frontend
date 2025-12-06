import React, { useState } from "react";
import UserCard from "./UserCard";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [age, setAge] = useState(user.age || "");
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl || "");
  const [gender, setGender] = useState(user.gender || "");
  const [about, setAbout] = useState(user.about);
  const [loading, setLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [error, setError] = useState("");
  const dispatch = useDispatch();

  const saveProfile = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        { firstName, lastName, age, photoUrl, gender, about },
        { withCredentials: true }
      );

      dispatch(addUser(res?.data?.data));
      setShowToast(true);

      setTimeout(() => {
        setShowToast(false);
      }, 3000);
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex mt-16 justify-center">
      <div className="relative flex items-center justify-center p-4">
        <form className="bg-[#111] bg-opacity-90 text-white w-[560px] p-6 rounded-xl shadow-xl space-y-6">
          <h2 className="text-2xl font-bold text-center mb-6 underline">
            Edit Profile
          </h2>

          <div className="flex gap-4">
            <div className="flex flex-col w-1/2">
              <label className="text-sm font-medium mb-1">First Name</label>
              <input
                type="text"
                placeholder="Enter your first name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full p-3 rounded-lg bg-transparent border border-gray-400 text-white focus:border-red-500 focus:ring-1 focus:ring-red-500 outline-none"
              />
            </div>

            <div className="flex flex-col w-1/2">
              <label className="text-sm font-medium mb-1">Last Name</label>
              <input
                type="text"
                placeholder="Enter your last name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="w-full p-3 rounded-lg bg-transparent border border-gray-400 text-white focus:border-red-500 focus:ring-1 focus:ring-red-500 outline-none"
              />
            </div>
          </div>
          <div className="flex gap-6">
            <div className="flex flex-col w-1/2">
              <label className="text-sm font-medium mb-1">Age</label>
              <input
                type="number"
                placeholder="Enter your age"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                className="w-full p-3 rounded-lg bg-transparent border border-gray-400 text-white focus:border-red-500 focus:ring-1 focus:ring-red-500 outline-none"
              />
            </div>

            <div className="flex flex-col w-1/2">
              <label className="text-sm font-medium mb-1">Gender</label>
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="w-full p-3 rounded-lg bg-transparent border border-gray-400 text-white focus:border-red-500 focus:ring-1 focus:ring-red-500 outline-none"
              >
                <option value="" className="text-black">
                  Select gender
                </option>
                <option value="male" className="text-black">
                  Male
                </option>
                <option value="female" className="text-black">
                  Female
                </option>
                <option value="other" className="text-black">
                  Other
                </option>
              </select>
            </div>
          </div>
          <div className="flex flex-col">
            <label className="text-sm font-medium mb-1">Photo</label>
            <input
              type="text"
              placeholder="Enter your photo URL"
              value={photoUrl}
              onChange={(e) => setPhotoUrl(e.target.value)}
              className="w-full p-3 rounded-lg bg-transparent border border-gray-400 text-white focus:border-red-500 focus:ring-1 focus:ring-red-500 outline-none"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-sm font-medium mb-1">About</label>
            <textarea
              placeholder="Write something about yourself..."
              value={about}
              onChange={(e) => setAbout(e.target.value)}
              rows="2"
              className="w-full p-3 rounded-lg bg-transparent border border-gray-400 text-white focus:border-red-500 focus:ring-1 focus:ring-red-500 outline-none"
            ></textarea>
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            onClick={saveProfile}
            className="w-full bg-red-600 hover:bg-red-700 transition-all text-white py-3 cursor-pointer rounded-lg font-semibold disabled:opacity-50 shadow-lg"
          >
            {loading ? "Updating..." : "Update Profile"}
          </button>
        </form>
      </div>
      <UserCard user={{ firstName, lastName, age, photoUrl, gender, about }} />
      {showToast && (
        <div className="toast toast-top toast-center mt-20">
          <div className="alert alert-success">
            <span>Profile saved successfully.</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditProfile;
