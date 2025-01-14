import React from "react";
import { ViewMemorialBook } from "./ViewMemorialBook";

interface ProgressWithButtonProps {
  fill: number;
}

const ProgressWithButton: React.FC<ProgressWithButtonProps> = ({ fill }) => {
  const isDisabled = fill < 49;
  const buttonText = isDisabled
    ? "아직 메모리얼북을 열람할 수 없어요"
    : "메모리얼북 열람하기";
  const buttonTheme = isDisabled ? "white" : "focus"; // 버튼 테마 설정

  return (
    <div className="flex items-center justify-center h-full">
      <ViewMemorialBook
        theme={buttonTheme}
        size="large"
        disabled={isDisabled}
        onClick={() => alert("버튼 클릭됨")}
      >
        {buttonText}
      </ViewMemorialBook>
    </div>
  );
};

export default ProgressWithButton;
