import Image from "next/image";
import Link from "next/link";
import white_frame from "public/images/1.png";
import publicIp from "public-ip";
import {
  BrowserView,
  MobileView,
  isBrowser,
  isMobile,
} from "react-device-detect";

export function HomeSection() {
  return (
    <div className="h-fit w-full relative" id="Home">
      <div className="relative pb-20 pt-28 lg:p-20 z-20 w-full h-full bg-gray-900 text-center text-white flex flex-col items-center">
        <h4 className="mt-0 text-lg" data-aos="fade-up">
          - HALAMAN WEBSITE RESMI -
        </h4>
        <h1 className="mt-8 text-6xl font-medium" data-aos="fade-in">
          Etalase Aplikasi FlaRank
        </h1>
        <h3 className="mt-8 text-xl" data-aos="fade-down">
          Aplikasi perankingan untuk membantu menghasilkan dukungan keputusan
          dengan metode Analytical Hierarchy Process.
        </h3>
        <Link href="/app">
          <a
            className="mt-10 bg-main hover:bg-main text-white font-medium py-3 px-6 rounded"
            rel="noreferrer"
          >
            Mulai Jelajahi
          </a>
        </Link>
        <div className="img relative w-64 mx-auto mt-10">
          <Image src={white_frame} layout="responsive" objectFit="contain" />
        </div>
      </div>
    </div>
  );
}
