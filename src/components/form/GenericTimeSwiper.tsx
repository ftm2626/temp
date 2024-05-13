import { useEffect, useState, InputHTMLAttributes, useRef } from "react";
import { Control, Controller, RegisterOptions } from "react-hook-form";
import { Swiper, SwiperSlide } from "swiper/react";
import CloseIcon from "@/public/assets/svg/Close.svg";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label: string;
  error: string | undefined;
  control: Control<any, any>;
  rules?: Omit<
    RegisterOptions<any, string>,
    "setValueAs" | "disabled" | "valueAsNumber" | "valueAsDate"
  >;
}

function GenericTimeSwiper({
  name,
  label,
  rules,
  error,
  control,
  required,
}: Props) {
  const [showDropDown, setShowDropDown] = useState(false);
  const refMenu = useRef<HTMLDivElement>(null);
  const hours = [
    "00",
    "01",
    "02",
    "03",
    "04",
    "05",
    "06",
    "07",
    "08",
    "09",
    "10",
    "11",
    "12",
    "13",
    "14",
    "15",
    "16",
    "17",
    "18",
    "19",
    "20",
    "21",
    "22",
    "23",
  ];
  const mins = [
    "00",
    "01",
    "02",
    "03",
    "04",
    "05",
    "06",
    "07",
    "08",
    "09",
    "10",
    "11",
    "12",
    "13",
    "14",
    "15",
    "16",
    "17",
    "18",
    "19",
    "20",
    "21",
    "22",
    "23",
    "24",
    "25",
    "26",
    "27",
    "28",
    "29",
    "30",
    "31",
    "32",
    "33",
    "34",
    "35",
    "36",
    "37",
    "38",
    "39",
    "40",
    "41",
    "42",
    "43",
    "44",
    "45",
    "46",
    "47",
    "48",
    "49",
    "50",
    "51",
    "52",
    "53",
    "54",
    "55",
    "56",
    "57",
    "58",
    "59",
  ];

  const closeOpenMenus = (e: any) => {
    if (refMenu?.current && !refMenu?.current.contains(e?.target)) {
      setShowDropDown(false);
    }
  };
  useEffect(() => {
    document.addEventListener("mousedown", closeOpenMenus);
    return () => {
      document.removeEventListener("mousedown", closeOpenMenus);
    };
  }, []);

  const initTime = (type: "hour" | "min", value: any, onChange: any) => {
    const myTime = value ? value.split(":") : "00:00".split(":");
    if (!value) {
      onChange("00:00");
    }
    if (type === "hour") {
      return +myTime[0];
    } else {
      return +myTime[1];
    }
  };
  const updateMin = (swiperInstance: any, value: any, onChange: any) => {
    // console.log(value)
    if (swiperInstance === null) return;
    let currentSlide = swiperInstance?.activeIndex;
    if (currentSlide < 10) {
      currentSlide = "0" + currentSlide;
    }
    const myTime = value.split(":");
    onChange(myTime[0] + ":" + currentSlide);
  };
  const updateHour = (swiperInstance: any, value: any, onChange: any) => {
    if (swiperInstance === null) return;
    let currentSlide = swiperInstance?.activeIndex;
    if (currentSlide < 10) {
      currentSlide = "0" + currentSlide;
    }
    const myTime = value.split(":");
    onChange(currentSlide + ":" + myTime[1]);
  };

  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ field: { onChange, name, value } }) => (
        <div className="flex flex-col relative w-full">
          <label className="text-md font-bold">
            {label}
            {required && <span className="text-red01">*</span>}
          </label>
          <input
            readOnly
            id={name}
            name={name}
            value={value}
            className={`border rounded-lg p-2 outline-none placeholder:text-dark01 duration-500 w-full mt-3 text-xl ${
              error ? "border-red02" : "border-dark05 focus:border-light01"
            }`}
            onFocus={() => setShowDropDown(true)}
          />
          {error && <span className="text-sm my-1 text-red01">{error}</span>}
          {showDropDown && (
            <div className="bg-dark02/50 z-20 w-screen h-screen fixed top-6 -right-1.5 flex flex-col justify-center items-center px-6">
              <div
                className="bg-white w-full border border-dark03 rounded-md"
                ref={refMenu}
              >
                {/* <button
                  className="ml-auto m-3"
                  onClick={() => setShowDropDown(false)}
                >
                  <CloseIcon className="w-5 h-5 " />{" "}
                </button> */}
                <div className="flex flex-col border-y border-dark03 p-2">
                  <div className="flex flex-row justify-center gap-6 border-b-2 border-dark03 pb-2">
                    <span>دقیقه</span>
                    <span>ساعت</span>
                  </div>
                  <div className="w-full flex flex-row items-center justify-center">
                    <div className="relative">
                      <div className="border-b-2 border-dark03 w-12 h-1 absolute top-[calc(30%)] left-2" />
                      <div className="border-b-2 border-dark03 w-12 h-1 absolute bottom-[calc(30%)] left-2" />
                      <Swiper
                        spaceBetween={1}
                        slidesPerView={3}
                        direction={"vertical"}
                        className="h-32 text-center mx-4"
                        centeredSlides={true}
                        onRealIndexChange={(data) =>
                          updateMin(data, value, onChange)
                        }
                        initialSlide={initTime("min", value, onChange)}
                      >
                        {mins.map((item) => (
                          <SwiperSlide key={item}>{item}</SwiperSlide>
                        ))}
                      </Swiper>
                    </div>
                    <span className="font-bold text-3xl">:</span>
                    <div className="relative">
                      <div className="border-b-2 border-dark03 w-12 h-1 absolute top-[calc(30%)] left-2" />
                      <div className="border-b-2 border-dark03 w-12 h-1 absolute bottom-[calc(30%)] left-2" />
                      <Swiper
                        spaceBetween={1}
                        slidesPerView={3}
                        direction={"vertical"}
                        className="h-32 text-center mx-4"
                        centeredSlides={true}
                        onRealIndexChange={(data) =>
                          updateHour(data, value, onChange)
                        }
                        initialSlide={initTime("hour", value, onChange)}
                      >
                        {hours.map((item) => (
                          <SwiperSlide key={item}>{item}</SwiperSlide>
                        ))}
                      </Swiper>
                    </div>
                  </div>
                </div>
                <button
                  className="text-center w-full py-3 bg-blue02 text-white font-bold"
                  onClick={() => setShowDropDown(false)}
                >
                  تایید
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    />
  );
}

export default GenericTimeSwiper;
