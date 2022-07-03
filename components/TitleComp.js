import { React } from "react";
// import AOS from "aos";
// import "aos/dist/aos.css";

export function TitleComp({ title, desc }) {
  return (
    <div>
      <h1 className="text-4xl font-medium">{title}</h1>
      <div className="w-40 h-0.5 mt-6 mx-auto bg-indigo-600 "></div>
      <h3 className="mt-6 text-md text-gray-600">{desc}</h3>
    </div>
  );
}
