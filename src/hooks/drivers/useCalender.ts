import { useSubmitCalenderMutation } from "@/redux/api/DriversMutateApi";
import { useGetCalenderInfoQuery } from "@/redux/api/DriversQueryApi";

export default function useCalender() {
  const { data, isFetching } = useGetCalenderInfoQuery(null);
  const [request, { isLoading }] = useSubmitCalenderMutation();

  return { data, isFetching, isLoading, request };
}
