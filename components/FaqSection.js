import { useState } from "react";
import { TitleComp } from "./TitleComp";
import { FiMinus, FiPlus } from "react-icons/fi";

export function FaqSection() {
  const [active, setActive] = useState();
  const [h, setH] = useState();

  const faq = [
    {
      question: "Apa itu FlaRank?",
      answer:
        "Aplikasi perankingan untuk membantu menghasilkan dukungan keputusan dengan metode Analytical Hierarchy Process.",
    },
    {
      question: "Bagaimana menggunakan FlaRank App?",
      answer:
        "Kunjungi alamat url https://flarank.netlify.app/app, [1] Masukkan jumlah kriteria dan alternatif. [2] Beri nama pada kriteria dan alternatif. [3] Tentukan nilai perbandingan kriteria dan alternatif. [4] Hasil perangkingan akan muncul dibagian bawah",
    },
    {
      question: "Bagaimana FlaRank dapat memproses perhitungan dengan cepat?",
      answer:
        "FlaRank menggunakan algoritma yang optimal untuk digunakan dalam perhitungan dengan Metode AHP, sehingga hasil perhitungan dapat ditampilkan dengan sangat cepat.",
    },
    {
      question: "Mengapa menggunakan FlaRank?",
      answer:
        "FlaRank dapat membantu anda untuk menentukan kandidat terbaik dari beberapa kandidat dari kriteria yang telah anda berikan.",
    },
  ];

  return (
    <div className="text-center py-20 lg:px-20 px-8" id="Faq">
      <TitleComp
        title="Pertanyaan yang sering diajukan"
        desc="Kamu dapat melihat jawaban dari pertanyaannya disini"
      />

      <div
        className="row justify-center mt-16 mx-auto text-left text-lg"
        style={{ maxWidth: "600px" }}
      >
        {faq.map(function (el, idx) {
          return (
            <div key={idx} className="col-lg-10 col-md-12 col-sm-12">
              <div className="team-item flex px-4 py-4 justify-between">
                <div className="team-content-1 mr-4 ">
                  <h6 className="font-medium">{el.question}</h6>
                  <p
                    id={`answer${idx}`}
                    style={{ height: `${h?.[`answer${idx}`]}px` }}
                    className="m-0 w-full text-gray-600 text-md mt-2 h-0 overflow-hidden duration-300"
                  >
                    {el.answer}
                  </p>
                </div>
                <div className="action">
                  <div
                    className="w-5 h-5 flex justify-center items-center cursor-pointer group"
                    onClick={() => {
                      if (active?.[`answer${idx}`]) {
                        setActive({
                          ...active,
                          [`answer${idx}`]: false,
                        });
                        setH({
                          ...h,
                          [`answer${idx}`]: 0,
                        });
                      } else {
                        setActive({
                          ...active,
                          [`answer${idx}`]: true,
                        });
                        const a = document.querySelector(
                          `#answer${idx}`
                        ).scrollHeight;
                        setH({
                          ...h,
                          [`answer${idx}`]: a,
                        });
                      }
                    }}
                  >
                    {active?.[`answer${idx}`] ? (
                      <FiMinus className="group-hover:text-main scale-100 group-hover:scale-110 rotate-0 group-hover:rotate-90 duration-200" />
                    ) : (
                      <FiPlus className="group-hover:text-main scale-100 group-hover:scale-110 rotate-0 group-hover:rotate-90 duration-200" />
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
