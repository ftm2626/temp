import React, { useEffect } from "react";

import ReloadIcon from "@/public/assets/svg/reload.svg";

interface LoadCaptchaEngineProps {
  numberOfCharacters: number;
  backgroundColor: string;
  fontColor: string;
  font: string;
  charMap: string;
  captcha_number?: number;
  backgroundColor_value?: string;
  fontColor_value?: string;
  charMap_value?: string;
}
interface CaptchaReloadProps {
  className?: string;
  reloadText?: string;
  Icon?: any;
  error?: string | undefined;
  name: any;
  register?: any;
  placeholder?: string;
}
/* default values */
let captcha_value = "";
let captcha_number = 4;
let backgroundColor_value = "white";
let fontColor_value = "black";
let charMap_value = "numbers";
let font_value = "italic 20px peyda";

/* function to make canvas captcha */
export const loadCaptchaEngine = ({
  backgroundColor,
  fontColor,
  charMap,
  numberOfCharacters,
  font,
}: LoadCaptchaEngineProps): void => {
  backgroundColor_value = backgroundColor;
  fontColor_value = fontColor;
  charMap_value = charMap;
  captcha_number = numberOfCharacters;
  font_value = font;
  let retVal = "";
  let charset =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  switch (charMap) {
    case "upper":
      charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
      break;
    case "lower":
      charset = "abcdefghijklmnopqrstuvwxyz0123456789";
      break;
    case "numbers":
      charset = "0123456789";
      break;
    case "special_char":
      charset = "~`!@#$%^&*()_+-=[]{}|:'<>,.?/";
      break;
    default:
      break;
  }

  let length = numberOfCharacters;

  for (let i = 0, n = charset.length; i < length; ++i) {
    retVal += charset.charAt(Math.floor(Math.random() * n));
  }

  let captcha = retVal;
  captcha_value = captcha;

  let canvas = document.getElementById("canv") as HTMLCanvasElement,
    ctx = canvas.getContext("2d") as any,
    img = document.getElementById("image") as HTMLImageElement;
  canvas.style.width = "100%";
  canvas.style.height = "100%";

  ctx.canvas.width = 100;
  ctx.canvas.height = 28;

  ctx.fillStyle = backgroundColor;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.textBaseline = "middle";
  ctx.font = font;
  ctx.fillStyle = fontColor;

  let num = 0;
  for (let i = 0; i < length; i++) {
    num = num + 1;
    let heigt_num = 20 * num;
    ctx.fillText(
      retVal[i],
      heigt_num,
      Math.round(Math.random() * (25 - 12) + 12)
    );
  }
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.bezierCurveTo(
    0,
    Math.random() * 30,
    Math.random() * 100,
    Math.random() * 30,
    100,
    Math.random() * 30
  );
  ctx.stroke();
  document.getElementById("reload_href")!.onclick = function () {
    loadCaptchaEngine({
      backgroundColor,
      fontColor,
      charMap,
      numberOfCharacters,
      font,
    });
  };
};

/* count is used to load the captcha engine only once */
var count: number = 0;

/* validateCaptcha is function to validate captcha in front */
export const validateCaptcha = (input: string): boolean => {
  if (input !== captcha_value) {
    if (count === 0) {
      loadCaptchaEngine({
        numberOfCharacters: captcha_number,
        backgroundColor: backgroundColor_value,
        fontColor: fontColor_value,
        charMap: charMap_value,
        font: font_value,
      });
      count++;
      // (document.getElementById('captcha') as HTMLInputElement).value = "" ;
    }

    return false;
  } else {
    return true;
  }
};

/* GenericCaptcha is custom captcha component */
const GenericCaptcha = ({
  className,
  reloadText,
  Icon,
  error,
  name,
  register,
  placeholder,
}: CaptchaReloadProps) => {
  useEffect(() => {
    loadCaptchaEngine({
      backgroundColor: "white",
      fontColor: "black",
      charMap: "numbers",
      numberOfCharacters: 4,
      font: "italic 1.125rem peyda",
    });
  }, []);

  return (
    <>
      <div
        className={`grid grid-cols-2 gap-4 w-full rounded-full items-end`}
      >
        <div
          className={`border rounded-lg p-2 outline-none duration-500 w-full text-xl bg-white ${
            error ? "border-red02" : "border-dark05 focus:border-light01"
          }`}
        >
          <input
            id={name}
            {...register}
            className="w-full  outline-none placeholder:text-sm bg-transparent placeholder:text-dark01"
            placeholder={placeholder}
          />
        </div>
        <div className="flex rounded-lg overflow-hidden h-[46px] bg-white">
          <button
            type="button"
            id="reload_href"
            className="px-3 inline-flex justify-center items-center gap-x-2 text-sm font-semibold bg-gray-500 text-white hover:bg-gray-700 transition-all disabled:opacity-50 disabled:pointer-events-none"
          >
            {Icon ? (
              <Icon
                className={`w-4 h-4 text-white duration-300`}
              />
            ) : (
              <ReloadIcon
                className={`p-x text-white duration-300`}
              />
            )}
            {reloadText ? (
              <span className="text-white">{reloadText}</span>
            ) : null}
          </button>
          <div className="block w-full border-gray-200 shadow-sm rounded-s-lg text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600">
            <canvas id="canv" className="h-full w-full"></canvas>
          </div>
        </div>
        {error && <span className="text-sm  text-red01">{error}</span>}
      </div>
    </>
  );
};
export default GenericCaptcha;
