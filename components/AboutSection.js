import Image from "next/image";
import three_frame from "public/images/2.png";
import { TitleComp } from "./TitleComp";

export function AboutSection() {
  return (
    <div className="h-fit w-full pt-10 pb-20 relative box-border" id="About">
      <div className="w-full h-full lg:px-20 px-8 bg-gray-white text-center text-gray-900">
        {/* <div className="mt-16"></div> */}
        <TitleComp
          title="Tentang Aplikasi"
          desc="
          Anda dapat menggunakannya dimanapun dan kapanpun. Semuanya sangat mudah!"
        />

        <div
          className="grid lg:grid-cols-2 grid-cols-1 gap-6 lg:gap-0 mt-16 mx-auto"
          style={{ maxWidth: "1100px" }}
        >
          <div className="flex justify-center items-center">
            <div className="img w-full">
              <Image
                src={three_frame}
                layout="responsive"
                objectFit="contain"
              />
            </div>
          </div>
          <div className="text-left">
            <h2 className="text-2xl font-medium">
              <span className="text-primary">Fla</span>Rank
            </h2>
            <p className="mt-6 text-lg text-gray-600">
              Aplikasi perankingan untuk membantu menghasilkan dukungan
              keputusan dengan metode Analytical Hierarchy Process. Menggunakan
              algoritma yang optimal untuk digunakan dalam perhitungan dengan
              Metode AHP, sehingga hasil perhitungan dapat ditampilkan dengan
              sangat cepat.
            </p>
            <p className="mt-4 text-lg text-gray-600">
              FlaRank dapat membantu anda untuk menentukan kandidat terbaik dari
              beberapa kandidat dari kriteria yang telah anda berikan.
            </p>
          </div>
          <div></div>
        </div>
      </div>
    </div>
  );
}
