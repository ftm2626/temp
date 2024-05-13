"use client";
import GenericButton from "@/components/form/GenericButton";
import GenericCaptcha, { validateCaptcha } from "@/components/form/GenericCaptcha";
import GenericInput from "@/components/form/GenericInput";
import Uselogin from "@/hooks/uselogin";
import { authErrors } from "@/utils/formErrors";
import Image from "next/image";
import React from "react";

export default function LoginContent() {
  const { errors, loginLoading, register, loginFunc, handleSubmit } =
    Uselogin();
  return (
    <main className="flex flex-col justify-center gap-3">
      <Image
        src={"/assets/png/mainRedLogo.png"}
        width={300}
        height={200}
        alt=""
        className="mx-auto my-10"
      />
      <form className="flex flex-col gap-3 bg-white rounded-lg p-4 shadow-lg">
        <GenericInput
          label="نام کاربری"
          name="vesal-drivers-phone"
          register={register("phone", { required: authErrors.login.phone })}
          error={errors.phone?.message}
          required
        />
        <GenericInput
          type="password"
          label="کلمه عبور"
          name="vesal-drivers-password"
          register={register("password", {
            required: authErrors.login.password,
          })}
          error={errors.password?.message}
          required
        />
        <GenericCaptcha
          name="captcha"
          register={register("captcha", {
            required: authErrors.login.captcha,
            validate: (value) =>
              value
                ? validateCaptcha(value) == false
                  ? "لطفا کد را صحیح وارد کنید"
                  : true
                : true,
          })}
          error={errors.captcha?.message}
          placeholder="کد امنیتی را وارد کنید"
        />
        <GenericButton
          color="red"
          title="ورود"
          isLoading={loginLoading}
          onClick={handleSubmit(loginFunc)}
        />
      </form>
    </main>
  );
}
