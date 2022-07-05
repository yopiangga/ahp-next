import { TitleComp } from "./TitleComp";
import { FiMapPin, FiPhone, FiMail } from "react-icons/fi";
import sendMessage from "services/contact/sendMessage";
import { useState } from "react";

export function ContactUsSection() {
  const [message, setMessage] = useState({
    fullname: "",
    email: "",
    textMessage: "",
  });

  function handleChange(e) {
    setMessage({ ...message, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    sendMessage(message.fullname, message.email, message.textMessage);
  }

  return (
    <div
      id="ContactUs"
      className="flex flex-wrap"
      style={{ maxWidth: "1200px" }}
    >
      <div className="lg:w-7/12 w-full py-20 lg:px-14 px-8 bg-gray-100 text-center">
        <div className="mt-12"></div>
        <TitleComp
          title="Kontak Kami"
          desc="Kami akan menghubungi Anda dalam waktu kurang dari 24 jam."
        />

        <div className="form">
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="fullname"
              id=""
              className="bg-white border-2 border-gray-300 outline-none h-14 w-full text-lg px-4 text-gray-900 mt-16"
              placeholder="Nama"
              onChange={handleChange}
            />
            <input
              type="email"
              name="email"
              id=""
              className="bg-white border-2 border-gray-300 outline-none h-14 w-full text-lg px-4 text-gray-900 mt-6"
              placeholder="Email"
              onChange={handleChange}
            />
            <textarea
              type="text"
              name="textMessage"
              id=""
              rows={5}
              className="bg-white border-2 border-gray-300 outline-none w-full text-lg px-4 py-4 text-gray-900 mt-6"
              placeholder="Pesan"
              onChange={handleChange}
            />

            <button
              type="submit"
              className=" bg-gray-900 hover:bg-gray-900 text-white font-medium h-14 px-6 mt-8 text-lg"
            >
              KIRIM PESAN
            </button>
          </form>
        </div>
      </div>
      <div className="lg:w-5/12 w-full py-20 lg:px-14 px-8">
        <div className="mt-12"></div>
        <div className="text-center">
          <TitleComp
            title="Alamat Kami"
            desc="Untuk Dukungan Pelanggan dan Pertanyaan, Hubungi kami."
          />
        </div>

        <div className="mt-12 flex flex-col gap-8">
          <div className="item flex gap-4">
            <div className="">
              <FiMapPin size={36} />
            </div>
            <div>
              <h2 className="text-xl font-medium mb-3">
                <span className="text-primary">Fla</span>Rank
              </h2>
              <a
                className="text-lg"
                href="https://goo.gl/maps/rKmsvQXbLxtU36BRA"
              >
                Politeknik Elektronika Negeri Surabaya, <br />
                Jl. Raya ITS, Keputih,
                <br />
                Kec. Sukolilo, Kota SBY, Jawa Timur <br />
                60111 Indonesia
              </a>
            </div>
          </div>
          <div className="item flex gap-4">
            <div className="">
              <FiPhone size={36} />
            </div>
            <div>
              <h2 className="text-xl font-medium mb-3">Telephone</h2>
              <a className="text-lg" href="https://wa.me/6282330410865">
                +62 823-3041-0865
              </a>
            </div>
          </div>
          <div className="item flex gap-4">
            <div className="">
              <FiMail size={36} />
            </div>
            <div>
              <h2 className="text-xl font-medium mb-3">Alamat Email</h2>
              <a
                className="text-lg"
                href="mailto:yopiangga@it.student.pens.ac.id"
              >
                yopiangga@it.student.pens.ac.id
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
