import { useEffect, useState } from "react";
import InputRange from "../components/InputRange";
import { TitleComp } from "../components/TitleComp";
import "config/firebase.js";
import { Navbar } from "../components/Navbar";
import { FaGithub } from "react-icons/fa";

import Head from "next/head";
import Image from "next/image";
import "react-awesome-slider/dist/styles.css";
import publicIp from "public-ip";
import { FiDownload } from "react-icons/fi";
import AOS from "aos";
import "aos/dist/aos.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Link from "next/link";

// import logo from "public/images/aisoru.png";
import { HomeSection } from "components/HomeSection";
import { AboutSection } from "components/AboutSection";
import { CounterSection } from "components/CounterSection";
import { FeatureSection } from "components/FeatureSection";
import { ScreenshotSection } from "components/ScreenshotSection";
import { VideoSection } from "components/VideoSection";
import { CallToActionSection } from "components/CallToActionSection";
import { SubcribeSection } from "components/SubcribeSection";
import { FaqSection } from "components/FaqSection";
import { ContactUsSection } from "components/ContactUsSection";
import { FooterSection } from "components/FooterSection";

export default function Landing() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    AOS.init({
      duration: 2000,
    });
  }, []);

  const menu = [
    { title: "Beranda", href: "#Home", id: 0 },
    { title: "Tentang Aplikasi", href: "#About", id: 1 },
    { title: "Fitur", href: "#Features", id: 2 },
    { title: "Tangkapan Layar", href: "#Screenshot", id: 3 },
    { title: "Pertanyaan", href: "#Faq", id: 5 },
    { title: "Kontak Kami", href: "#ContactUs", id: 6 },
  ];

  return (
    <div className="w-full scrollbar-hide h-screen flex">
      <Head>
        <title>FlaRank | Pendukung Keputusan</title>
      </Head>
      {/* <Navbar /> */}
      <div className="w-72 lg:flex hidden bg-white border-r border-grey-900 flex-col justify-between items-end py-8 px-10">
        <div>
          <h1 className="font-semibold text-xl">
            <span className="text-primary">Fla</span>Rank
          </h1>
          {/* <div className="img w-36 h-20">
            <Image src={logo} layout="responsive" objectFit="contain" />
          </div> */}
        </div>
        <div className="">
          <ul>
            {menu.map((el, idx) => {
              return (
                <li key={idx} className="text-right py-3 cursor-pointer">
                  <Link href={el.href}>
                    <a
                      onClick={() => setActive(el.id)}
                      className={`hover:text-main duration-100 text-xl font-reguler ${
                        idx == active ? "text-main" : ""
                      }`}
                    >
                      {el.title}
                    </a>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
        <div>
          <h1 className="">© 2022 FlaRank v.1.0</h1>
        </div>
      </div>

      <div className="navbar bg-base-100 fixed z-50 lg:hidden shadow-sm">
        <div className="navbar-start">
          <div className="dropdown">
            <label tabIndex="0" className="btn btn-ghost btn-circle">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h7"
                />
              </svg>
            </label>
            <ul
              tabIndex="0"
              className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
            >
              {menu.map((el, idx) => {
                return (
                  <li key={idx}>
                    <Link href={el.href}>
                      <a
                        onClick={() => setActive(el.id)}
                        className={`${idx == active ? "text-main" : ""}`}
                      >
                        {el.title}
                      </a>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
        <div className="navbar-center">
          <a className="btn btn-ghost normal-case text-xl">
            <span className="text-primary">Fla</span>Rank
          </a>
        </div>
        <div className="navbar-end">
          <Link href="https://github.com/yopiangga/ahp-next">
            <a className="btn btn-ghost btn-circle">
              <div className="indicator">
                <FaGithub size={20} />
                <span className="badge badge-xs badge-primary indicator-item"></span>
              </div>
            </a>
          </Link>
        </div>
      </div>

      <div className="grow bg-gray-90 relative scrollbar-hide overflow-scroll text-gray-900 bg-white">
        <HomeSection />
        <AboutSection />
        <CounterSection />
        <FeatureSection />
        <ScreenshotSection />
        {/* <VideoSection /> */}
        <CallToActionSection />
        <FaqSection />
        <SubcribeSection />
        <ContactUsSection />
        <FooterSection />
      </div>
    </div>
  );
}
