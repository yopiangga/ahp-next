import { TitleComp } from "./TitleComp";
import publicIp from "public-ip";
export function CallToActionSection() {
  return (
    <div className="py-20 lg:px-20 px-8 bg-gray-900 text-white flex flex-col justify-center items-center text-center">
      <TitleComp
        title="Dapatkan layanan"
        desc="Anda dapat menggunakannya diberbagai perangkat yang anda miliki."
      />
      <a
        href=""
        target="_blank"
        download
        className="mt-10 bg-main hover:bg-main text-white font-medium py-3 px-6 rounded"
        rel="noreferrer"
      >
        Mulai Aplikasi
      </a>
    </div>
  );
}
