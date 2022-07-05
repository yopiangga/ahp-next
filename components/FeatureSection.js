import Image from "next/image";
import { TitleComp } from "./TitleComp";
import black_frame from "public/images/1.png";
import { FiUsers, FiCoffee, FiZap, FiCrosshair, FiSmile } from "react-icons/fi";

export function FeatureSection() {
  return (
    <div
      className="text-center lg:px-20 px-8 py-20 relative"
      style={{ boxSizing: "border-box" }}
      id="Features"
    >
      <div className="mt-16"></div>
      <TitleComp
        title="Fitur Aplikasi"
        desc="Anda dapat menggunakannya untuk berbagai jumlah kriteria dan alternatif"
      />
      <div
        className="grid lg:grid-cols-3 grid-cols-1 gap-6 lg:gap-0 mt-16 mx-auto"
        style={{ maxWidth: "1000px" }}
      >
        <div className="left flex flex-col justify-center">
          <div className="items flex flex-col items-center">
            <FiZap size={60} />
            <h2 className="text-2xl font-medium mt-4">Kecepatan</h2>
            <h4 className="text-lg mt-2 text-gray-600">
              Menggunakan algoritma yang handal dalam pemrosesan perhitungan
            </h4>
          </div>
          <div className="items flex flex-col items-center mt-10">
            <FiCrosshair size={60} />
            <h2 className="text-2xl font-medium mt-4">Sesuai Perhitungan</h2>
            <h4 className="text-lg mt-2 text-gray-600">
              Sesuai dengan data konkrit yang dimasukkan oleh pengguna
            </h4>
          </div>
        </div>
        <div className="center flex justify-center items-center my-10">
          <div className="img w-3/4">
            <Image src={black_frame} layout="responsive" objectFit="contain" />
          </div>
        </div>
        <div className="right flex flex-col justify-center">
          <div className="items flex flex-col items-center">
            <FiSmile size={60} />
            <h2 className="text-2xl font-medium mt-4">Mudah digunakan</h2>
            <h4 className="text-lg mt-2 text-gray-600">
              Pengguna disuguhkan dengan alur aplikasi yang sederhana
            </h4>
          </div>
          <div className="items flex flex-col items-center mt-10">
            <FiCoffee size={60} />
            <h2 className="text-2xl font-medium mt-4">Fleksibel</h2>
            <h4 className="text-lg mt-2 text-gray-600">
              Dapat digunakan untuk berbagai variasi jumlah krteria dan
              alternatif
            </h4>
          </div>
        </div>
      </div>
    </div>
  );
}
