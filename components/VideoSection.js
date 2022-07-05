import {
  BrowserView,
  MobileView,
  isBrowser,
  isMobile,
} from "react-device-detect";

export function VideoSection() {
  return (
    <div className="w-full py-20 lg:px-20 px-8 bg-gray-900 flex flex-col justify-center items-center">
      <div>
        <h2 className="text-white text-4xl font-medium mb-10">
          Bagaimana cara kerjanya? Mainkan dan lihat!
        </h2>
      </div>
      <BrowserView>
        <div className="w-full flex  justify-center">
          <iframe
            width="700"
            height="400"
            src=""
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          ></iframe>
        </div>
      </BrowserView>
      <MobileView>
        <div className="w-full flex justify-center">
          <iframe
            // width="200"
            height="300"
            src=""
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          ></iframe>
        </div>
      </MobileView>
    </div>
  );
}
