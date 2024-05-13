import React, { Dispatch, SetStateAction } from "react";
import { Control, FieldErrors, UseFormRegister, UseFormSetValue, UseFormWatch } from "react-hook-form";
import GenericInput from "@/components/form/GenericInput";
import GenericTextarea from "@/components/form/GenericTextarea";
import GenericDatePicker from "@/components/form/GenericDatePicker";
import GenericTimeSwiper from "@/components/form/GenericTimeSwiper";
import GenericSearchSelect from "@/components/form/GenericSearchSelect";
import { createInfoApiResT } from "@/interface/passangersApi.interface";
import {
  submitRequestErrorT,
  submitRequestFormInputT,
} from "@/interface/passangers.interface";
import GenericAddressField from "@/components/form/GenericAddressField";

export default function Airport({
  errors,
  control,
  formErr,
  Airline,
  cityInfo,
  categories,
  airportInfo,
  selectedAirport,
  register,
  setSelectedAirport,
  setValue,
  watch
}: {
  selectedAirport: string;
  errors: submitRequestErrorT;
  control: Control<any, any>;
  categories: { id: string; title: string }[];
  formErr: FieldErrors<submitRequestFormInputT>;
  cityInfo: createInfoApiResT["data"]["cities"] | [];
  Airline: createInfoApiResT["data"]["airlines"] | [];
  airportInfo: createInfoApiResT["data"]["airports"] | [];
  setSelectedAirport: Dispatch<SetStateAction<string>>;
  register: UseFormRegister<submitRequestFormInputT>;
  setValue: UseFormSetValue<submitRequestFormInputT>;
  watch: UseFormWatch<submitRequestFormInputT>;
}) {
  return (
    <>
      <div className="flex flex-row gap-2">
        {categories.map(({ id, title }) => (
          <div
            key={id}
            className={`w-full text-center py-3 duration-300 bg-white ${
              selectedAirport === id
                ? "border-2 border-blue01 text-blue01 font-bold"
                : "cursor-pointer border-2 border-white"
            }`}
            onClick={() => setSelectedAirport(id)}
          >
            {title}
          </div>
        ))}
      </div>
      <div>
        <GenericSearchSelect<createInfoApiResT["data"]["cities"][0]>
          required
          selectId="id"
          label="فرودگاه"
          selectValue="name"
          name="airport_id"
          data={airportInfo}
          control={control}
          error={formErr.airport_id?.message}
          rules={{ required: errors.airport_id }}
        />
        <GenericInput
          label="ترمینال"
          name="terminal"
          register={register("terminal", { required: errors.terminal })}
          error={formErr.terminal?.message}
          required
        />
      </div>
      {selectedAirport === "tfa" && (
        <div>
          <GenericSearchSelect<createInfoApiResT["data"]["cities"][0]>
            required
            selectId="id"
            label="ایرلاین"
            selectValue="name"
            name="airline_id"
            data={Airline}
            control={control}
            error={formErr.airline_id?.message}
            rules={{ required: errors.airline_id }}
          />

          <GenericInput
            label="شماره پرواز"
            name="flight_number"
            register={register("flight_number", {
              required: errors.flight_number,
            })}
            error={formErr.flight_number?.message}
            required
          />
        </div>
      )}
      {/* <div className="flex flex-row gap-2"> */}
      {selectedAirport === "tta" && (
        <GenericSearchSelect<createInfoApiResT["data"]["cities"][0]>
          required
          selectId="id"
          label="شهر مبدا"
          selectValue="name"
          name="origin_city"
          data={cityInfo}
          control={control}
          error={formErr.origin_city?.message}
          rules={{ required: errors.origin_city }}
        />
      )}
      {selectedAirport === "tfa" && (
        <GenericSearchSelect<createInfoApiResT["data"]["cities"][0]>
          required
          selectId="id"
          label="شهر مقصد"
          selectValue="name"
          name="destination_city"
          data={cityInfo}
          control={control}
          error={formErr.destination_city?.message}
          rules={{ required: errors.destination_city }}
        />
      )}
      {/* </div> */}
      {/* <div className="flex flex-row gap-2"> */}
      <GenericDatePicker
        required
        upToDate
        label="تاریخ رفت"
        name="departure_date"
        control={control}
        error={formErr.departure_date?.message}
        rules={{ required: errors.departure_date }}
      />

      <GenericTimeSwiper
        required
        name="hour"
        label="ساعت حضور راننده"
        control={control}
        error={formErr.hour?.message}
        rules={{ required: errors.hour }}
      />
      {/* </div> */}
      {selectedAirport === "tta" && (
        <GenericAddressField
          label="آدرس مبدا"
          name="origin"
          required
          register={register}
          error={formErr.origin?.message}
          textError={errors.origin}
          setValue={setValue}
          textValue={watch("origin")}
        />
      )}
      {selectedAirport === "tfa" && (
        <GenericAddressField
          label="آدرس مقصد"
          name="destination"
          // required
          register={register}
          error={formErr.destination?.message}
          textError={errors.destination}
          setValue={setValue}
          textValue={watch("destination")}
        />
      )}
      <GenericTextarea
        label="توضیحات"
        name="description"
        register={register("description")}
        error={formErr.description?.message}
      />
    </>
  );
}
