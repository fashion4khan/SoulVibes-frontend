import React from "react";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="text-center">

      <p className="text-white text-6xl pt-36 md:text-8xl lg:text-9xl font-extrabold font-serif drop-shadow-xl">
        start something epic
      </p>

      <Link to="/signup">
        <button className="mt-10 px-8 py-4 bg-secondary cursor-pointer hover:bg-pink-900 rounded-3xl text-white text-2xl font-bold shadow-lg">
          Create account
        </button>
      </Link>
    </div>
  );
};

export default Index;

