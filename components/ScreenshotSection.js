import { TitleComp } from "./TitleComp";
import image1 from "public/images/1.png";
import image3 from "public/images/3.png";
import image4 from "public/images/4.png";
import image5 from "public/images/5.png";
import image6 from "public/images/6.png";
import image7 from "public/images/7.png";
import image8 from "public/images/8.png";

import Image from "next/image";
import Slider from "react-slick";
import {
  BrowserView,
  MobileView,
  isBrowser,
  isMobile,
} from "react-device-detect";

export function ScreenshotSection() {
  const bgList = [
    { id: 1, image: image1 },
    { id: 3, image: image3 },
    { id: 4, image: image4 },
    { id: 5, image: image5 },
    { id: 6, image: image6 },
    { id: 7, image: image7 },
    { id: 8, image: image8 },
  ];

  const settings = {
    dots: true,
    autoplay: true,
    infinite: true,
    slidesToScroll: 1,
  };

  return (
    <div
      className="text-center py-20 lg:px-20 px-8 box-border bg-gray-100"
      id="Screenshot"
    >
      <div className="mt-16"></div>
      <TitleComp
        title="Layar Aplikasi"
        desc="Anda dapat melihat tampilan aplikasi yang menarik!"
      />

      <div className="mt-16 mx-auto" style={{ maxWidth: "1000px" }}>
        <BrowserView>
          <Slider {...settings} slidesToShow={3}>
            {bgList.map((el, idx) => {
              return (
                <div key={idx} className="w-48 px-4">
                  <Image
                    src={el.image}
                    layout="responsive"
                    objectFit="contain"
                  />
                </div>
              );
            })}
          </Slider>
        </BrowserView>
        <MobileView>
          <Slider {...settings} slidesToShow={1}>
            {bgList.map((el, idx) => {
              return (
                <div key={idx} className="w-48 px-4">
                  <Image
                    src={el.image}
                    layout="responsive"
                    objectFit="contain"
                  />
                </div>
              );
            })}
          </Slider>
        </MobileView>
      </div>
    </div>
  );
}
