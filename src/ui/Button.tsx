import { useState } from "@lynx-js/react";

interface ButtonProps{
  text:string;
  className?:string;
  bindtap: () => void;
}

const Button: React.FC<ButtonProps> = ({text, className = '', bindtap}) => {
  const [isTapping, setisTapping] = useState(false);

  return (
    <view className={className}
      style={{backgroundColor: isTapping ? '#b6b6b6': 'white'}} 
      bindtap={bindtap}
      bindtouchstart={() => {setisTapping(true)}}
      bindtouchend={() => {setisTapping(false)}}
      >
        <text>{text}</text>
    </view>
  )
}

export default Button;