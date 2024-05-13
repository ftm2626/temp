import { useGetCompeleteServicesQuery } from "@/redux/api/DriversQueryApi";

export default function useComplete() {
  const { data, isLoading } = useGetCompeleteServicesQuery(null);
  return { data, isLoading };
}
