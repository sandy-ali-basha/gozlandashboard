import { Typography, Box, Button, Grid, Alert } from "@mui/material";
import { BoxStyled } from "components/styled/BoxStyled";
import { TextFieldStyled } from "components/styled/TextField";
import React, { useState } from "react";
import Loader from "components/shared/Loader";
import { useProductdetailsCreate } from "../hooks/useProductdetailsCreate";
import ButtonLoader from "components/shared/ButtonLoader";
import EditorInput from "components/shared/EditorInput";
const ProductdetailsCreate = ({ id, isCreateProduct }) => {
  const {
    handleCancel,
    hanldeCreate,
    register,
    handleSubmit,
    loading,
    t,
    errors,
    details,
    Discription,
    control,
    setValue,
    alert,
    handleReset,
  } = useProductdetailsCreate({ id });

  return (
    <Box>
      {loading && <Loader />}
      <Typography sx={{ color: "text.main", mb: "16px" }} variant="h5">
        {t("Create Product detail")}
      </Typography>

      <BoxStyled
        sx={{
          BoxShadow: 10,
          px: 3,
          ...(isCreateProduct && {
            opacity: id && id.length > 0 ? "100%" : "50%",
            pointerEvents: id && id.length > 0 ? "initial" : "none",
          }),
        }}
      >
        <Box component="form">
          <Grid container spacing={2}>
            {/* * //details */}
            {details.map((item, index) => (
              <Grid item key={index} xs={6} sx={{ p: "10px" }}>
                <Box sx={{ margin: "0 0 8px 5px" }}>
                  <Typography variant="body1" color="text.main">
                    {item.head}
                  </Typography>
                </Box>
                <TextFieldStyled
                  sx={{ width: "100%" }}
                  type={item.type}
                  placeholder={item.placeholder}
                  name={item.name}
                  {...register(item.register)}
                  error={errors[item.error]?.message}
                  helperText={errors[item.helperText]?.message || ""}
                />
              </Grid>
            ))}
            {Discription.map((item, index) => (
              <Grid item key={index} xs={12} sx={{ p: "10px" }}>
                <Box sx={{ margin: "0 0 8px 5px" }}>
                  <Typography color="text.main" variant="body1">
                    {item.head}
                  </Typography>
                </Box>
                <EditorInput
                  control={control}
                  register={register}
                  name={item.name}
                  setValue={setValue}
                  errors={errors[item.helperText]?.message || ""}
                />
              </Grid>
            ))}
          </Grid>
        </Box>

        <Box
          sx={{
            mt: "20px",
            display: "flex",
            justifyContent: "flex-end",
            columnGap: "15px",
          }}
        >
          <Button
            variant="outlined"
            sx={{
              width: "120px",
              borderColor: "origin.main",
              color: "text.main",
              "&:hover": {
                borderColor: "origin.main",
              },
            }}
            onClick={handleCancel}
          >
            {t("Cancel")}
          </Button>
          <Button
            id="rest"
            variant="outlined"
            color="secondary"
            onClick={handleReset}
          >
            {t("Reset")}
          </Button>
          <ButtonLoader
            name={t("Submit")}
            onClick={() => handleSubmit(hanldeCreate)()}
            type="submit"
            loading={loading}
            disableOnLoading
          >
            {t("Submit")}
          </ButtonLoader>
        </Box>
        {alert.length > 0 &&
          alert.map((item, idx) => (
            <Alert sx={{ mt: 1 }} key={idx} severity="info">
              {item}
            </Alert>
          ))}
      </BoxStyled>
    </Box>
  );
};

export default ProductdetailsCreate;
