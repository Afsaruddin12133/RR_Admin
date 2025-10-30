import React from "react";
import { statusColors } from "../../utils/statusColors";


const ServiceCard = ({
  title,
  plan,
  price,
  progress,
  status,
  icon: IconComponent,
  onViewDetails,
}) => {
  return (
    <div className="w-[360px] h-[256px] bg-white rounded-xl shadow-md p-5 flex flex-col justify-between border border-gray-100">
      <div className="flex justify-between items-start">
        <div>
          <div className="p-2 bg-blue-50 rounded-lg w-10 h-10">
            {IconComponent ? (
              <IconComponent className="text-blue-600" />
            ) : (
                <TrendingUp className="text-blue-600" />
            )}
          </div>
          <div className="mt-3">
                <h2 className="text-lg font-semibold text-gray-800">{title}</h2> 
                <p className="text-sm text-gray-500">
                {price} {plan}
                </p>
          </div>
        </div>
        <span
          className={`text-xs font-semibold text-white px-3 py-1 rounded-full ${statusColors[status]}`}
        >
          {status}
        </span>
      </div>

      <div className="mt-4">
        <div className="flex justify-between mb-1">
          <p className="text-sm text-gray-600 font-medium">Progress</p>
          <p className="text-sm text-gray-800 font-semibold">{progress}%</p>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div
            className={`h-2.5 rounded-full ${statusColors[status]}`}
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>

      <button
        onClick={onViewDetails}
        className="mt-6 w-full bg-[#0062FF] text-white text-sm font-semibold py-2.5 rounded-lg hover:bg-blue-700 transition-all duration-300"
      >
        View Details
      </button>
    </div>
  );
};

export default ServiceCard;
