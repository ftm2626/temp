/* eslint-disable react-hooks/exhaustive-deps */
import { requestListApiResT } from "@/interface/passangersApi.interface";
import {
  useGetPassRequestsListQuery,
  useLazyGetPassRequestSubservicesQuery,
} from "@/redux/api/PassQueryApi";
import { useState } from "react";

export default function useRequests() {
  const [showSubModal, setShowSubModal] = useState(0);
  const [paginationNum, setPaginationNum] = useState(1);
  const [showReasonsModal, setShowReasonsModal] = useState(0);
  const [reasons, setReasons] =
    useState<requestListApiResT["data"]["services"][0]["rejected_reasons"]>();
    
  const { isFetching: isLoading, data } =
    useGetPassRequestsListQuery(paginationNum);

  const [
    subServices,
    { isFetching: requestSubLoading, data: requestSubListData },
  ] = useLazyGetPassRequestSubservicesQuery();

  return {
    reasons,
    showSubModal,
    showReasonsModal,
    requestSubLoading,
    requestSubListData,
    setReasons,
    subServices,
    setShowSubModal,
    setPaginationNum,
    setShowReasonsModal,
    data,
    isLoading,
  };
}
