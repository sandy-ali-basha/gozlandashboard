import React, { useCallback, useEffect, useMemo, useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import {
  Alert,
  Box,
  Card,
  Chip,
  FormControl,
  FormHelperText,
  Grid,
  Typography,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { _axios } from "interceptor/http-config";
import { MenuItemStyled, SelectStyled } from "components/styled/TextField";
import { useTranslation } from "react-i18next";
import { useMutation } from "react-query";
import { _Product } from "api/product/product";
import Loader from "components/shared/Loader";
import ButtonLoader from "components/shared/ButtonLoader";
import settings from "assets/images/settings.png";

let schema = yup.object().shape({
  attribute_id: yup.string().trim().required("Product attributes is required"),
  values: yup.array().min(1, "Values type is required"),
});

const ProductAttr = ({ id, open, setOpen, attr, notDialog }) => {
  const { t } = useTranslation("index");
  const formOptions = { resolver: yupResolver(schema) };
  const { handleSubmit, formState, control, reset } = useForm(formOptions);
  const { errors } = formState;
  const [loading, setLoading] = useState(false);
  const [product_attributes, setProductAttributes] = useState();
  const [product_attributes_values, setProductAttributesValues] = useState();
  const [selectedValue, setSelectedValue] = useState([]);
  const [alert, setALert] = useState([]);

  const getValues = (value) => {
    _axios
      .get(`/product_attributes_values/attribute/${value}?all=true`)
      .then((res) => {
        setLoading(false);
        setProductAttributesValues(res?.data?.data?.product_attributes_values);
      });
  };

  useEffect(() => {
    _axios.get("/product_attributes?all=true").then((res) => {
      setProductAttributes(res.data?.data?.product_attributes);
    });
  }, []);

  useEffect(() => {
    if (!open) {
      reset({
        attribute_id: "",
        values: [],
      });
      setSelectedValue("");
      setProductAttributesValues([]);
    }
  }, [open, reset, attr]);

  const handleClose = useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  const { mutate } = useMutation((data) => createPost(data));

  const handleAddAttr = ({ data }) => {
    setLoading(true);
    // Map over the array of ids to create a request for each
    const requests = id.map((id) => {
      // Return the promise for the request
      const newData = {
        ...data,
        product_id: id, // Add product_id to the form data
      };
      return _Product.attribute({
        editedID: id,
        formData: newData,
      });
    });

    // Execute all requests concurrently
    Promise.all(requests)
      .then((responses) => {
        // Handle successful responses
        responses.forEach((res, index) => {
          if (res.code === 200) {
            setALert((prev) => [
              ...prev,
              `categories for Product ${id[index]} saved successfully.`,
            ]);
          } else {
            setALert((prev) => [
              ...prev,
              `Failed to save categories for Product ${id[index]}.`,
            ]);
          }
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  async function createPost(data) {
    const newData = {
      ...data,
      product_id: id, // Add product_id to the form data
    };
    if (notDialog) {
      handleAddAttr({ data });
    } else {
      _Product
        .attribute({
          editedID: id,
          formData: newData,
        })
        .catch((err) => {
          setLoading(false);
        })
        .then((res) => {
          if (res?.code === 200) setOpen(false);
          setLoading(false);
        });
    }
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleUpdate = (input) => {
    mutate(input);
    setLoading(true);
  };

  const content = useMemo(() => {
    return (
      <>
        <DialogTitle sx={{ color: "text.main" }}>
          {t("Products categories")}
        </DialogTitle>
        <Box sx={{ width: "30%", margin: "0 auto" }}>
          <img src={settings} alt="" style={{ width: "100%" }} />
        </Box>
        <Grid container component="form" key={id}>
          <Grid item xs={12} sx={{ p: "10px" }}>
            {attr && (
              <Typography variant="body1">Current categories</Typography>
            )}
            {attr?.map((val, idx) => (
              <Chip
                variant="outlined"
                sx={{ m: 1 }}
                label={val?.value}
                key={idx}
              />
            ))}
            <Typography variant="body1" sx={{ color: "text.secondary", my: 2 }}>
              Each selected attribute updates or adds the values of these
              attributes.
            </Typography>
            <FormControl fullWidth>
              <Box sx={{ margin: "0 0 8px 5px" }}>
                <Typography color="text.main">Product categories</Typography>
              </Box>
              <Controller
                name="attribute_id"
                control={control}
                render={({ field }) => (
                  <SelectStyled
                    {...field}
                    sx={{ color: "text.main", borderColor: "text.main" }}
                    value={field.value || ""}
                    onChange={(e) => {
                      const value = e.target.value;
                      setSelectedValue(value);
                      field.onChange(value);
                      getValues(value);
                    }}
                  >
                    {product_attributes &&
                      product_attributes.map((item) => (
                        <MenuItemStyled value={item.id} key={item.id}>
                          <Box style={{ color: "text.main" }}>{item.title}</Box>
                        </MenuItemStyled>
                      ))}
                  </SelectStyled>
                )}
              />
              <FormHelperText error>
                {errors.attribute_id?.message}
              </FormHelperText>
            </FormControl>
          </Grid>

          {selectedValue && (
            <Grid item xs={12} sx={{ p: "10px" }}>
              <FormControl fullWidth>
                <Box sx={{ margin: "0 0 8px 5px" }}>
                  <Typography color="text.main">Values</Typography>
                </Box>
                <Controller
                  name="values"
                  control={control}
                  render={({ field }) => (
                    <SelectStyled
                      {...field}
                      multiple
                      sx={{ color: "text.main", borderColor: "text.main" }}
                      value={field.value || []}
                      onChange={(e) => {
                        const value = e.target.value;
                        field.onChange(value);
                      }}
                      renderValue={(selected) => (
                        <Box
                          sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}
                        >
                          {selected.map((value) => {
                            const selectedItem = product_attributes_values.find(
                              (item) => item.id === value
                            );
                            return (
                              <Chip key={value} label={selectedItem?.value} />
                            );
                          })}
                        </Box>
                      )}
                    >
                      {product_attributes_values?.map((item) => (
                        <MenuItemStyled value={item.id} key={item.id}>
                          <Box style={{ color: "text.main" }}>{item.value}</Box>
                        </MenuItemStyled>
                      ))}
                    </SelectStyled>
                  )}
                />
                <FormHelperText error>{errors.values?.message}</FormHelperText>
              </FormControl>
            </Grid>
          )}
        </Grid>

        <DialogActions>
          <Button onClick={handleClose} sx={{ color: "text.main" }}>
            {t("Cancel")}
          </Button>
          {loading && <Loader />}

          <ButtonLoader
            name={t("Submit")}
            onClick={() => handleSubmit(handleUpdate)()}
            type="save"
            loading={loading}
            disableOnLoading
          >
            {t("Submit")}
          </ButtonLoader>
        </DialogActions>
      </>
    );
  }, [
    attr,
    control,
    errors.attribute_id?.message,
    errors.values?.message,
    handleClose,
    handleSubmit,
    handleUpdate,
    id,
    loading,
    product_attributes,
    product_attributes_values,
    selectedValue,
    t,
  ]);

  return (
    <>
      {loading && <Loader />}
      {notDialog ? (
        <Card
          sx={{
            BoxShadow: 10,
            p: 3,
            opacity: id.length > 0 ? "100%" : "50%",
            pointerEvents: id.length > 0 ? "initial" : "none",
          }}
        >
          {content}
          {alert.length > 0 &&
            alert.map((item, idx) => (
              <Alert sx={{ mt: 1 }} key={idx} severity="info">
                {item}
              </Alert>
            ))}
        </Card>
      ) : (
        <Dialog open={open} onClose={handleClose}>
          {content}
        </Dialog>
      )}
    </>
  );
};

export default ProductAttr;
