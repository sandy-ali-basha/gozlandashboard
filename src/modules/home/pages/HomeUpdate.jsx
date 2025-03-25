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
import Image from "components/shared/Image";

const HomeUpdate = ({ id, type }) => {
  const { t } = useTranslation("index");
  const [editedID, setEditedID] = colorStore((state) => [
    state.editedID,
    state.setEditedID,
  ]);

  const formOptions = {};
  const { register, handleSubmit, formState, control } = useForm(formOptions);
  const { errors } = formState;
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState();
  const [image, setImage] = useState(null);

  useEffect(() => {
    _axios.get("/home/item/" + editedID).then((res) => {
      setData(res.data?.data);
    });
  }, [id, editedID]);

  const details = [
    {
      head: t("link"),
      type: "text",
      placeholder: t("Link"),
      register: "cta_link",
      defaultValue: data?.cta_link,
    },
    {
      head: t("title english"),
      type: "text",
      placeholder: t("title"),
      register: "title",
      defaultValue: data?.title,
    },
    {
      head: t("description english"),
      type: "text",
      placeholder: t("description"),
      register: "description",
      defaultValue: data?.description,
    },
    {
      head: t("title arabic"),
      type: "text",
      placeholder: t("title arabic"),
      register: "title_ar",
      defaultValue: data?.title_ar,
    },
    {
      head: t("description arabic"),
      type: "text",
      placeholder: t("description arabic"),
      register: "description_ar",
      defaultValue: data?.description_ar,
    },
    {
      head: t("title turkish"),
      type: "text",
      placeholder: t("title turkish"),
      register: "title_tr",
      defaultValue: data?.title_tr,
    },
    {
      head: t("description turkish"),
      type: "text",
      placeholder: t("description turkish"),
      register: "description_tr",
      defaultValue: data?.description_tr,
    },
  ];

  const handleClose = () => {
    setOpen(false);
    setEditedID(null);
  };

  const { mutate } = useMutation((data) => createPost(data));
  const queryClient = useQueryClient();

  async function createPost(data) {
    _Home
      .update({
        editedID: editedID,
        formData: data,
      })
      .catch((err) => {
        setLoading(false);
      })
      .then(() => {
        setLoading(false);
        handleClose();
        queryClient.invalidateQueries(["home"]);
      });
  }

  const hanldeUpdate = (input) => {
    const formData = new FormData();
    formData.append("type", type);
    formData.append("image", image);
    formData.append("cta_link", input.cta_link);
    formData.append("title", input.title);
    formData.append("description", input.description);
    formData.append("title_ar", input.title_ar);
    formData.append("description_ar", input.description_ar);
    formData.append("title_tr", input.title_tr);
    formData.append("description_tr", input.description_tr);
    mutate(formData);
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
                  <Grid key={index} item md={12} sx={{ p: "10px", my: 1 }}>
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
              <Grid
                item
                md={12}
                sx={{
                  p: "10px",
                  my: 1,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <img src={data?.image} alt="item" style={{ width: "20vw" }} />
                <Typography variant="body1"   sx={{ mt: 2 }}>
                  replace current image
                </Typography>
                <Image
                  errors={errors?.image?.message}
                  control={control}
                  register={register}
                  name={"image"}
                  setImage={(file) => setImage(file)}
                  multiple={false}
                />
              </Grid>
            </Grid>
          </>
        )}

        <DialogActions>
          <Button onClick={handleClose} sx={{ color: "text.main" }}>
            {t("Cancel")}
          </Button>
          {loading && <Loader />}
          <ButtonLoader
            name={t("Submit")}
            onClick={handleSubmit(hanldeUpdate)}
            type="save"
            loading={loading}
            disableOnLoading
            disabled={loading} // Ensure button is disabled when loading
          >
            {t("Submit")}
          </ButtonLoader>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default HomeUpdate;
