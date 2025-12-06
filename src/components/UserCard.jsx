import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../utils/feedSlice";

const UserCard = ({ user }) => {
  console.log("User in UserCard:", user);

  const { _id, firstName, lastName, photoUrl, age, gender, about } = user;
  const dispatch = useDispatch();
  if (!user) return null;
  const handleSendRequest = async (userId, status) => {
    try {
      const res = await axios.post(
        BASE_URL + "/request/send/" + status + "/" + userId,
        {},
        { withCredentials: true }
      );
      dispatch(removeUserFromFeed(userId));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="bg-[#1a1a1a] text-white mt-4 w-80 h-auto rounded-xl shadow-lg border border-gray-700">
      <div className="flex flex-col items-center m-4">
        <img
          src={photoUrl}
          alt="User"
          className="mt-8 w-52 h-64 rounded-lg object-cover mb-4 border-2 border-gray-500"
        />

        <h2 className="text-xl font-bold text-center">
          {firstName} {lastName}
        </h2>
        <div className="flex items-center gap-3 mt-1 text-gray-300">
          <span>{age} years</span>
          <span className="text-gray-400">•</span>
          <span className="capitalize">{gender}</span>
        </div>

        <p className="text-sm text-gray-300 m-3 line-clamp-3">
          {about}
        </p>

        <div className="flex gap-4 mt-5">
          <button
            onClick={() => handleSendRequest(_id, "interested")}
            className="px-4 py-2 cursor-pointer bg-red-500 hover:bg-red-600 rounded-lg text-white text-sm"
          >
            Interested
          </button>

          <button
            onClick={() => handleSendRequest(_id, "ignored")}
            className="px-4 py-2 cursor-pointer bg-gray-600 hover:bg-gray-700 rounded-lg text-white text-sm"
          >
            Ignored
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
