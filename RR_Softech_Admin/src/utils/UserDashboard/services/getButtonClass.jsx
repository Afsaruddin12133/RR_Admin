  export const getButtonClass = (tabName, activeTab) => {
    const baseClasses =
      "flex-1 text-center py-2.5 px-5 rounded-xl transition-all duration-300 ease-in-out cursor-pointer";
    if (activeTab === tabName) {
      return `${baseClasses} bg-white text-gray-900 font-semibold shadow-md`;
    } else {
      return `${baseClasses} bg-transparent text-gray-600 font-medium`;
    }
  };