import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionsSlice";

const Connections = () => {
  const connections = useSelector((store) => store.connection);
  const dispatch = useDispatch();
  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      dispatch(addConnections(res.data.data));
    } catch (err) {
      console.log(err.message);
    }
  };
  useEffect(() => {
    fetchConnections();
  }, []);
  if (!connections) return null;

  if (connections.length === 0)
    return (
      <h1 className="flex p-56 text-8xl font-bold text-center">
        No connections found !
      </h1>
    );
  return (
    <div className="pt-6 z-20">
      <h1 className="text-3xl font-bold mb-4">All Connections</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {connections.map((user) => (
          <div
            key={user._id}
            className="bg-[#1a1a1a] text-white mt-4 w-80 h-96 rounded-xl shadow-lg border border-gray-700 mx-auto"
          >
            <div className="flex flex-col items-center">
              <img
                src={user.photoUrl}
                alt="User"
                className="mt-6 w-32 h-32 rounded-full object-cover mb-4 border-2 border-gray-500"
              />

              <h2 className="text-2xl font-bold text-center">
                {user.firstName} {user.lastName}
              </h2>

              <p className="text-gray-300 text-lg my-2">Age: {user.age || "N/A"}</p>
              <p className="text-gray-400 text-sm capitalize">
                Gender: {user.gender || "N/A"}
              </p>

              <p className="text-sm text-gray-300 text-center mt-3 px-3 line-clamp-3">
                {user.about}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Connections;
