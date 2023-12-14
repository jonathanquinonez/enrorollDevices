import React from "react"
import Svg, { Path, Rect, SvgProps } from "react-native-svg";

type Props = SvgProps & {
  color?: string;
};

export const TabBg: React.FC<Props> = ({
  color = '#FFFFFF',
  ...props
}) => {
  return (
    <Svg
      width="777" height="68" viewBox="0 0 777 68"
      {...props}
    >
      <Path
        d="M201 0H330.01C343.169 0 355.504 6.40611 363.073 17.1707L365.345 20.4023C370.458 27.6731 378.789 32 387.678 32V32C396.367 32 404.538 27.8631 409.682 20.8591L412.39 17.1707C420.318 6.37596 432.911 0 446.304 0H576V68H201V0Z" 
        fill="#B4B4B4"
      />
      <Rect x="0.185791" width="202.512" height="68" fill="#B4B4B4"/>
      <Rect x="574.042" width="202.512" height="68" fill="#B4B4B4"/>
    </Svg>
  )
};