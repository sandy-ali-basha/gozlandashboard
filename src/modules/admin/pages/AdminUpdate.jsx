import { React } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Box, FormControl, Grid, InputLabel, MenuItem, Select, Typography } from "@mui/material";
import { TextFieldStyled } from "components/styled/TextField";
import Loader from "components/shared/Loader";
import ButtonLoader from "components/shared/ButtonLoader";
import { useAdminUpdate } from "../hooks/useAdminUpdate";

const AdminUpdate = ({ id }) => {
  const {
    register,
    handleSubmit,
    loading,
    t,
    errors,
    details,
    handleSubmit1,
    handleClose,
    isLoading,
    open,
    data,
  } = useAdminUpdate();
  return (
    <>
      {isLoading && <Loader />}
      {loading && <Loader />}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle sx={{ color: "origin.main" }}>{t("Edit Row")}</DialogTitle>
        {!!data && (
          <Box component="form" key={id}>
            {details.map((item, index) => (
              <Box key={index}>
                <DialogContent
                  sx={{ display: "flex", gap: 1, flexDirection: "column" }}
                >
                  <Box sx={{ margin: "0 0 8px 5px" }}>
                    <Typography sx={{ color: "origin.main" }}>
                      {item.head}
                    </Typography>
                  </Box>
                  <TextFieldStyled
                    sx={{ width: "100%", my: "5px" }}
                    type={item.type}
                    placeholder={item.placeholder}
                    defaultValue={item.defaultValue}
                    name={item.name}
                    {...register(item.register)}
                    error={errors[item.error]?.message}
                    helperText={errors[item.helperText]?.message || ""}
                  />
                </DialogContent>
              </Box>
            ))}
            <Grid xs={6} sx={{ p: "10px" }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Role</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="role"
                  {...register("role")}
                  error={errors?.role?.message}
                  helperText={errors?.role?.message}
                  defaultValue={data?.role}
                >
                  <MenuItem value={"ecommerce_admin"}>
                    E-commerce admin
                  </MenuItem>
                  <MenuItem value={"super_admin"}>super admin</MenuItem>
                  <MenuItem value={"website_admin"}>website admin</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Box>
        )}
        <DialogActions sx={{ display: "flex", gap: "10px" }}>
          <Button onClick={handleClose} sx={{ color: "origin.main" }}>
            {t("Cancel")}
          </Button>

          <ButtonLoader
            onClick={() => handleSubmit(handleSubmit1)()}
            type="submit"
            loading={loading}
            style={{ color: "#fff" }}
          >
            {t("Submit")}
          </ButtonLoader>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AdminUpdate;
