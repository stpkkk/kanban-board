interface ThreeDotsIconProps {
  color?: string;
}

export default function ThreeDotsIcon({
  color = 'current',
}: ThreeDotsIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
    >
      <path
        d="M9.99998 10.8333C10.4602 10.8333 10.8333 10.4602 10.8333 10C10.8333 9.53976 10.4602 9.16666 9.99998 9.16666C9.53974 9.16666 9.16665 9.53976 9.16665 10C9.16665 10.4602 9.53974 10.8333 9.99998 10.8333Z"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M15.8333 10.8333C16.2935 10.8333 16.6666 10.4602 16.6666 10C16.6666 9.53976 16.2935 9.16666 15.8333 9.16666C15.3731 9.16666 15 9.53976 15 10C15 10.4602 15.3731 10.8333 15.8333 10.8333Z"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M4.16665 10.8333C4.62688 10.8333 4.99998 10.4602 4.99998 10C4.99998 9.53976 4.62688 9.16666 4.16665 9.16666C3.70641 9.16666 3.33331 9.53976 3.33331 10C3.33331 10.4602 3.70641 10.8333 4.16665 10.8333Z"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
