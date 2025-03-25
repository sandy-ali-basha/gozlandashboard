import { React, useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import { Box, Grid, Typography } from "@mui/material";
import { colorStore } from "store/ColorsStore";
import { useForm } from "react-hook-form";
import { _axios } from "interceptor/http-config";
import { TextFieldStyled } from "components/styled/TextField";
import { useTranslation } from "react-i18next";
import { useMutation, useQueryClient } from "react-query";
import { _Home } from "api/home/home";
import Loader from "components/shared/Loader";
import ButtonLoader from "components/shared/ButtonLoader";

const NavUpdate = ({ id, setId }) => {
  const { t } = useTranslation("index");

  const formOptions = {};
  const { register, handleSubmit, formState } = useForm(formOptions);
  const { errors } = formState;
  const [open, setOpen] = useState(true);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState();


  useEffect(() => {
    _axios.get("/navbar/" + id).then((res) => {
      setData(res.data?.data);
      setLoading(false)
    });
  }, [id]);

  const details = [
    {
      head: t("link"),
      type: "text",
      placeholder: t("Link"),
      register: "link",
      defaultValue: data?.link,
    },
    {
      head: t("text"),
      type: "text",
      placeholder: t("text"),
      register: "text",
      defaultValue: data?.text,
    },
    {
      head: t("text arabic"),
      type: "text_ar",
      placeholder: t("text arabic"),
      register: "text_ar",
      defaultValue: data?.text_ar,
    },
    {
      head: t("text turkish"),
      type: "text_tr",
      placeholder: t("text turkish"),
      register: "text_tr",
      defaultValue: data?.text_tr,
    },
  ];

  const handleClose = () => {
    setOpen(false);
    setId(null);
  };

  const { mutate } = useMutation((data) => createPost(data));
  const queryClient = useQueryClient();

  async function createPost(data) {
    _Home
      .updateNav({
        editedID: id,
        formData: data,
      })
      .catch((err) => {
        setLoading(false);
      })
      .then(() => {
        setLoading(false);
        handleClose();
        queryClient.invalidateQueries(["navbar"]);
      });
  }

  const hanldeUpdate = (input) => {
    mutate(input);
    setLoading(true);
  };

  return (
    <>
      {loading && <Loader />}
      <Dialog open={true} onClose={handleClose}>
        <DialogTitle sx={{ color: "text.main" }}>{t("Edit Row")}</DialogTitle>
        {!!data && (
        <>
          <Grid container component="form" key={id}>
            {details?.map((item, index) => {
              const error = errors?.[item.register.split(".")[0]]?.name;
              return (
                <Grid key={index} item md={6} sx={{ p: "10px", my: 1 }}>
                  <Box sx={{ margin: "0 0 8px 5px" }}>
                    <Typography variant="body1" color="text.main">
                      {item.head}
                    </Typography>
                  </Box>
                  <TextFieldStyled
                    sx={{ width: "100%" }}
                    type={item.type}
                    placeholder={item.placeholder}
                    defaultValue={item.defaultValue}
                    name={item.register}
                    {...register(item.register)}
                    error={!!error}
                    helperText={error?.message || ""}
                  />
                </Grid>
              );
            })}
          </Grid>
        </>
         )} 

        <DialogActions>
          <Button onClick={() => handleClose()} sx={{ color: "text.main" }}>
            {t("Cancel")}
          </Button>
          {loading && <Loader />}

          <ButtonLoader
            name={t("Submit")}
            onClick={() => handleSubmit(hanldeUpdate)()}
            type="save"
            loading={loading}
            disableOnLoading
          >
            {t("Submit")}
          </ButtonLoader>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default NavUpdate;
