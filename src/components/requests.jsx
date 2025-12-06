import axios from 'axios';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { BASE_URL } from '../utils/constants';
import {addRequests} from "../utils/requestSlice"

const Requests = () => {
  const requests = useSelector((store) => store.request);
  const dispatch = useDispatch();
  const fetchRequests = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/requests/received", {
        withCredentials: true,
      });
      dispatch(addRequests(res.data.data));
    } catch (err) {
      console.log(err.message);
    }
  };
  useEffect(() => {
    fetchRequests();
  }, []);
  const handleReview = async (status, requestId) => {
    try {
      const res = await axios.post(
        `${BASE_URL}/request/review/${status}/${requestId}`,
        {},
        { withCredentials: true }
      );

      console.log(res.data.message);
      fetchRequests();
    } catch (err) {
      console.log("Error:", err.message);
    }
  };
  if (!requests) return null;

  if (requests.length === 0)
    return (
      <h1 className="flex p-56 drop-shadow-black text-8xl font-bold text-center">
        No Request found Now
      </h1>
    );
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">All Connections</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {requests.map((user) => {
        const {firstName, lastName, age,photoUrl, gender, about} = user.fromUserId;
        return (
          <div
            key={user._id}
            className="bg-[#1a1a1a] text-white mt-4 w-80 h-auto rounded-xl shadow-lg border border-gray-700 mx-auto"
          >
            <div className="flex flex-col items-center">
              <img
                src={photoUrl}
                alt="User"
                className="mt-6 w-32 h-32 rounded-full object-cover mb-4 border-2 border-gray-500"
              />

              <h2 className="text-2xl font-bold text-center">
                {firstName} {lastName}
              </h2>

              <p className="text-gray-300 text-lg my-2">Age: {age || "N/A"}</p>
              <p className="text-gray-400 text-sm capitalize">
                Gender: {gender || "N/A"}
              </p>

              <p className="text-sm text-gray-300 text-center mt-3 px-3 line-clamp-3">
                {about}
              </p>
              <div className="flex gap-4 mt-5">
              <button 
              onClick={() => handleReview("accepted", user._id)}
              className="px-4 py-2 bg-secondary hover:bg-red-600 rounded-lg text-white text-sm">
                Accepted
              </button>

              <button
               onClick={() => handleReview("rejected", user._id)}
               className="px-4 py-2 bg-primary hover:bg-gray-700 rounded-lg text-white text-sm">
                Rejected
              </button>
            </div>
            </div>
          </div>
        )})}
      </div>
    </div>
  );
};

export default Requests;