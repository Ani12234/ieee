import { div } from "framer-motion/client";
import React from "react";

const Execoms = () => {
  return (
    <div className="bg-zinc-400 pt-36 w-3/4 max-w-3/4 mx-auto">
      <div className="grid grid-cols-4 gap-6 place-items-center">
        <div
          className="bg-gray-200 rounded-md h-48 w-40 sm:h-64 sm:w-56 flex flex-col justify-end items-center border-4 border-zinc-700"
          style={{
            backgroundImage: `url('https://i.pinimg.com/736x/79/f2/5e/79f25e8eda3c770b91f1c50579f2241a.jpg')`,
            backgroundSize: "cover",
          }}
        >
          <div className="bg-black w-full text-center rounded-b-md">
            <h2 className="text-sm sm:text-base font-semibold">
              Dr. Vijayalakshmi S. J
            </h2>
            <p className="text-sm">Branch Counselor</p>
          </div>
        </div>

        <div
          className="bg-gray-200 rounded-md h-48 w-40 sm:h-64 sm:w-56 flex flex-col justify-end items-center border-4 border-zinc-700"
          style={{
            backgroundImage: `url('https://i.pinimg.com/736x/79/f2/5e/79f25e8eda3c770b91f1c50579f2241a.jpg')`,
            backgroundSize: "cover",
          }}
        >
          <div className="bg-black w-full text-center rounded-b-md">
            <h2 className="text-md font-semibold">Varsha Meti</h2>
            <p className="text-sm">Chairperson</p>
          </div>
        </div>

        <div
          className="bg-gray-200 rounded-md h-48 w-40 sm:h-64 sm:w-56 flex flex-col justify-end items-center border-4 border-zinc-700"
          style={{
            backgroundImage: `url('https://i.pinimg.com/736x/79/f2/5e/79f25e8eda3c770b91f1c50579f2241a.jpg')`,
            backgroundSize: "cover",
          }}
        >
          <div className="bg-black w-full text-center rounded-b-md">
            <h2 className="text-md font-semibold">Sanjana Dadamode</h2>
            <p className="text-sm">Vice Chairperson</p>
          </div>
        </div>

        <div
          className="bg-gray-200 rounded-md h-48 w-40 sm:h-64 sm:w-56 flex flex-col justify-end items-center border-4 border-zinc-700"
          style={{
            backgroundImage: `url('https://i.pinimg.com/736x/79/f2/5e/79f25e8eda3c770b91f1c50579f2241a.jpg')`,
            backgroundSize: "cover",
          }}
        >
          <div className="bg-black w-full text-center rounded-b-md">
            <h2 className="text-md font-semibold">Sambhav Osawal</h2>
            <p className="text-sm">Secretary</p>
          </div>
        </div>

        <div
          className="bg-gray-200 rounded-md h-48 w-40 sm:h-64 sm:w-56 flex flex-col justify-end items-center border-4 border-zinc-700"
          style={{
            backgroundImage: `url('https://i.pinimg.com/736x/79/f2/5e/79f25e8eda3c770b91f1c50579f2241a.jpg')`,
            backgroundSize: "cover",
            backgroundPosition: "right",
          }}
        >
          <div className="bg-black w-full text-center rounded-b-md">
            <h2 className="text-md font-semibold">Uday Magadum</h2>
            <p className="text-sm">Treasurer</p>
          </div>
        </div>

        <div
          className="bg-gray-200 rounded-md h-48 w-40 sm:h-64 sm:w-56 flex flex-col justify-end items-center border-4 border-zinc-700"
          style={{
            backgroundImage: `url('https://i.pinimg.com/736x/79/f2/5e/79f25e8eda3c770b91f1c50579f2241a.jpg')`,
            backgroundSize: "cover",
          }}
        >
          <div className="bg-black w-full text-center rounded-b-md">
            <h2 className="text-md font-semibold">Rahul Hugar</h2>
            <p className="text-sm">Design head</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Execoms;
