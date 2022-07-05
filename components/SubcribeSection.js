import { useState } from "react";
import { TitleComp } from "./TitleComp";
import sendSubscribe from "services/subscribe/sendSubscribe";

export function SubcribeSection() {
  const [email, setEmail] = useState();

  function handleSubmit(e) {
    e.preventDefault();
    sendSubscribe(email);
  }

  return (
    <div className="py-20 lg:px-20 px-8 bg-gray-900 text-white flex flex-col justify-center items-center text-center">
      <TitleComp
        title="Ikuti FlaRank"
        desc="Ikuti untuk mendapatkan update terbaru dari aplikasi"
      />
      <div className="form mt-10">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            className="bg-white h-14 lg:w-80 w-full text-lg px-4 text-gray-900"
            placeholder="Alamat email anda ... "
            onChange={(e) => setEmail(e.target.value)}
          />
          <button
            type="submit"
            className=" bg-main hover:bg-main lg:mt-0 mt-8 text-white font-medium h-14 px-6 text-lg"
          >
            Ikuti
          </button>
        </form>
      </div>
    </div>
  );
}
