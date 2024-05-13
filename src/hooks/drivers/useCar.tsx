import moment from "jalali-moment";
import { useGetCarInfoQuery } from "@/redux/api/DriversQueryApi";

export default function useCar() {
  const { isLoading, data: carInfo } = useGetCarInfoQuery(null, {
    selectFromResult: ({ data, isLoading }) => {
      const carInfo = [];
      if (data?.status === 200) {
        carInfo.push({ id: 1, title: "راننده", info: data?.data?.full_name });
        carInfo.push({ id: 2, title: "برند خودرو", info: data?.data?.car_brand });
        carInfo.push({ id: 3, title: "مدل خودرو", info: data?.data?.car_model });
        carInfo.push({
          id: 4,
          title: "سال ساخت خودرو",
          info: data?.data?.car_year_construction.toString(),
        });
        carInfo.push({ id: 5, title: "رنگ خودرو", info: data?.data?.car_color });
        carInfo.push({
          id: 6,
          title: "پلاک خودرو",
          info: (
            <p>
              <span>{data?.data?.car_plate[3]}</span> - 
              <span>{data?.data?.car_plate[2]}</span>
              <span>{data?.data?.car_plate[1]}</span>
              <span>{data?.data?.car_plate[0]}</span>
            </p>
          ),
        });
        carInfo.push({
          id: 7,
          title: "تاریخ انقضا گواهینامه",
          info: moment(data?.data?.license_expiration_date)
            .locale("fa")
            .format("YYYY/MM/DD"),
        });
        carInfo.push({
          id: 8,
          title: "تاریخ انقضا بیمه شخص ثالث",
          info: moment(data?.data?.insurance_expiration_date)
            .locale("fa")
            .format("YYYY/MM/DD"),
        });
        carInfo.push({
          id: 9,
          title: "تاریخ اخرین بازرسی",
          info: moment(data?.data?.last_inspection_date)
            .locale("fa")
            .format("YYYY/MM/DD"),
        });
      }
      return { data: carInfo, isLoading };
    },
  });

  return { isLoading, carInfo };
}
