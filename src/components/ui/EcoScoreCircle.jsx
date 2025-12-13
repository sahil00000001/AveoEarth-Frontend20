"use client";

export default function EcoScoreCircle({ 
  score = 90, 
  size = "default",
  className = ""
}) {
  const sizeClasses = {
    small: "w-7 h-7",
    default: "w-10 h-10 sm:w-12 sm:h-12",
    large: "w-14 h-14"
  };

  const textSizes = {
    small: { score: "text-[9px]", eco: "text-[5px]" },
    default: { score: "text-xs sm:text-sm", eco: "text-[6px] sm:text-[8px]" },
    large: { score: "text-sm", eco: "text-[8px]" }
  };

  const sizeClass = sizeClasses[size] || sizeClasses.default;
  const textSize = textSizes[size] || textSizes.default;

  return (
    <div className={`${sizeClass} bg-gradient-to-br from-[#6b8e23] to-[#556b2f] rounded-full flex items-center justify-center shadow-lg ${className}`}>
      <div className="text-center">
        <span className={`text-white font-bold ${textSize.score}`}>{score}</span>
        <span className={`text-white/80 ${textSize.eco} block -mt-0.5`}>ECO</span>
      </div>
    </div>
  );
}
