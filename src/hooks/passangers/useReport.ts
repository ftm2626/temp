/* eslint-disable react-hooks/exhaustive-deps */
import {
  ReportListFormInputT,
} from "@/interface/passangers.interface";
import { usePassGetReportsMutation } from "@/redux/api/PassMutateApi";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

export default function useReport() {

  const {
    control,
    handleSubmit,
    getValues,
  } = useForm<ReportListFormInputT>();
  const [paginationNum, setPaginationNum] = useState(1);
  const [
    reportsList,
    { isLoading: requestListLoading, data: requestListData },
  ] = usePassGetReportsMutation();

  const getReportsList: SubmitHandler<{}> = () => {
    reportsList({
      from: +(getValues().from / 1000).toFixed(0),
      to: +(getValues().to / 1000).toFixed(0),
      page: paginationNum,
    });
  };


  useEffect(() => {
    if (getValues().from) {
      getReportsList({});
    }
  }, [paginationNum]);

  return {
    control,
    requestListData,
    requestListLoading,
    handleSubmit,
    getReportsList,
    setPaginationNum,
  };
}
