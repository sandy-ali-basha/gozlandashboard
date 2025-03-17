import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import * as yup from "yup";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { _Terms } from "api/terms/terms";
import { _axios } from "interceptor/http-config";

let schema = yup.object().shape({
  ar: yup.object().shape({
    name: yup.string().required("Arabic name is required"),
    text: yup.string().required("Arabic Text is required"),
  }),
  en: yup.object().shape({
    name: yup.string().required("English name is required"),
    text: yup.string().required("English Text is required"),
  }),
});

export const useTermsCreate = () => {
  const { t } = useTranslation("index");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const formOptions = { resolver: yupResolver(schema) };
  const { register, handleSubmit, formState, setValue, control, reset } =
    useForm(formOptions);
  const { errors } = formState;
  const { mutate } = useMutation((data) => createPost(data));
  const [details, setDetails] = useState([]);
  const [language, setLanguage] = useState("en");

  async function createPost(data) {
    _Terms
      .post(data, setLoading)
      .then((res) => {
        if (res?.code === 200) navigate(-1);
        setLoading(true);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  const handleCancel = () => navigate(-1);

  const handleReset = () => {
    const form = document.querySelector("form");
    if (form) form.reset();
    reset();
  };

  const hanldeCreate = (input) => {
    mutate(input);
    setLoading(true);
  };

  return {
    handleCancel,
    handleReset,
    hanldeCreate,
    register,
    handleSubmit,
    setValue,
    loading,
    t,
    errors,
    control,
    language,
    setLanguage,
  };
};
