import React from "react";

type RemoveIconProps = {
  size?: number;
  color?: string;
};

const RemoveIcon: React.FC<RemoveIconProps> = ({
  size = 24,
  color = "black",
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={color}
    >
      <path d="M0 10h24v4h-24z" />
    </svg>
  );
};

export default RemoveIcon;
