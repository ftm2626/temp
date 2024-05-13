import { useGetPassTicketListQuery } from "@/redux/api/PassQueryApi";

export default function useTickets() {
  const { isLoading: ticketsListLoading, data: ticketsListData } =
    useGetPassTicketListQuery(null);
  return { ticketsListData, ticketsListLoading };
}
