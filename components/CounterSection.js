import { FiUsers, FiDownload } from "react-icons/fi";
import { useState, useEffect } from "react";
import getVisitCount from "services/visit/getVisitCount";

export function CounterSection() {
  const [visits, setVisits] = useState();

  useEffect(() => {
    getVisitCount()
      .then((res) => {
        setVisits({
          ...visits,
          all: res.all,
          daily: res.daily,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="bg-gray-900 px-20 py-20 grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 gap-12 box-border text-white">
      <div className="items flex flex-col items-center">
        <FiUsers size={48} />
        <h2 className="text-4xl font-medium mt-4">{visits?.all + 1000}</h2>
        <h4 className="text-lg mt-2">Total Visitor</h4>
      </div>
      <div className="items flex flex-col items-center">
        <FiUsers size={48} />
        <h2 className="text-4xl font-medium mt-4">{visits?.daily ?? 0}</h2>
        <h4 className="text-lg mt-2">Daily Visitor</h4>
      </div>
    </div>
  );
}
