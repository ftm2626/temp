import { ButtonHTMLAttributes } from "react";
import LoadingIcon from "@/public/assets/svg/Loading.svg";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  color: "red" | "blue" | "dark" | "green";
}

const GenericButton: React.FC<Props> = ({
  name,
  title,
  isLoading,
  color,
  ...rest
}) => (
  <button
    className={`rounded-md text-white py-2 font-bold transition text-center cursor-pointer flex justify-center items-center  disabled:cursor-not-allowed w-full duration-500 bg-${color}01 disabled:bg-${color}03 disabled:hover:bg-${color}03 hover:bg-${color}02/50`}
    {...rest}
  >
    {isLoading ? (
      <LoadingIcon className="h-7 w-7 animate-spin text-white" />
    ) : (
      title
    )}
  </button>
);
export default GenericButton;
