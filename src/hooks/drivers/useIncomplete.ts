import { useGetIncompeleteServicesQuery } from "@/redux/api/DriversQueryApi";

export default function useIncomplete() {
  const { data, isLoading } = useGetIncompeleteServicesQuery(null);
  return { data, isLoading };
}
