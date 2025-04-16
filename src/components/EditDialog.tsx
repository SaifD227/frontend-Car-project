"use client";
import * as React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
  IconButton,
  Box,
  Grid,
  Typography,
  InputAdornment,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { styled } from "@mui/material/styles";

import Cookies from "js-cookie";

interface EditDialogsProps {
  isOpen: boolean;
  onClose: () => void;
  product: ProductData | null; 
  onUpdateSuccess: () => void;  
}
import { ProductData } from "@/types/productTypes";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

import {
  countries,
  countryCodes,
  ratings,
  colors,
  fuelTypes,
  transmissions,
  bodyTypes,
  brands,
  years,
  models,
  engineCapacities,
  features,
  registrationStatuses,
  stockStatuses,
  conditions,
} from "./constant/ConstantProduct";

const EditDialogs: React.FC<EditDialogsProps> = ({
  isOpen,
  onClose,
  product,
  onUpdateSuccess,
}) => { const [formData, setFormData] = React.useState({
    name: "",
    brand: "",
    carModel: "",
    year: "",
    price: "",
    mileage: "",
    fuelType: "",
    transmission: "",
    engineCapacity: "",
    bodyType: "",
    registrationStatus: "",
    features: "",
    images: [] as File[],
    color: "",
    stock: "",
    condition: "",
    sellerName: "",
    sellerLocation: "",
    sellerRating: "",
    sellerContactCode: "",
    sellerContactNumber: "",
  });

  const [errors, setErrors] = React.useState({
    name: false,
    brand: false,
    carModel: false,
    year: false,
    price: false,
    mileage: false,
    fuelType: false,
    transmission: false,
    engineCapacity: false,
    bodyType: false,
    registrationStatus: false,
    features: false,
    color: false,
    stock: false,
    condition: false,
    sellerName: false,
    sellerLocation: false,
    sellerRating: false,
    sellerContactCode: false,
    sellerContactNumber: false,
  });

  React.useEffect(() => {
    if (product) {
      setFormData({
        name: product.name || "",
        brand: product.brand || "",
        carModel: product.carModel || "",
        year: product.year?.toString() || "",
        price: product.price?.toString() || "",
        mileage: product.mileage || "",
        fuelType: product.fuelType || "",
        transmission: product.transmission || "",
        engineCapacity: product.engineCapacity || "",
        bodyType: product.bodyType || "",
        registrationStatus: product.registrationStatus || "",
        features: product.features?.join(", ") || "",
        images: [], // Images cannot be pre-filled
        color: product.color?.[0] || "",
        stock: product.stock || "",
        condition: product.condition || "",
        sellerName: product.seller?.name || "",
        sellerLocation: product.seller?.location || "",
        sellerRating: product.ratings?.toString() || "",
        sellerContactCode: product.seller?.contact.split(" ")[0] || "",
        sellerContactNumber: product.seller?.contact.split(" ")[1] || "",
      });
    }
  }, [product]);


  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: false,
      }));
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files).slice(0, 5);
      setFormData((prev) => ({
        ...prev,
        images: filesArray,
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {
      name: !formData.name.trim(),
      brand: !formData.brand,
      carModel: !formData.carModel,
      year: !formData.year,
      price: !formData.price.trim() || isNaN(Number(formData.price)),
      mileage: !formData.mileage.trim() || isNaN(Number(formData.mileage)),
      fuelType: !formData.fuelType,
      transmission: !formData.transmission,
      engineCapacity: !formData.engineCapacity,
      bodyType: !formData.bodyType,
      registrationStatus: !formData.registrationStatus,
      features: !formData.features,
      color: !formData.color,
      stock: !formData.stock,
      condition: !formData.condition,
      sellerName: !formData.sellerName.trim(),
      sellerLocation: !formData.sellerLocation,
      sellerRating: !formData.sellerRating,
      sellerContactCode: !formData.sellerContactCode,
      sellerContactNumber: !formData.sellerContactNumber.trim(),
    };

    setErrors(newErrors);

    return !Object.values(newErrors).some((error) => error);
  };
  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    try {
      const formDataToSend = new FormData();
      const productData: ProductData = {
        name: formData.name,
        brand: formData.brand,
        carModel: formData.carModel,
        year: parseInt(formData.year),
        price: parseFloat(formData.price),
        condition: formData.condition,
        mileage: formData.mileage + " km/l",
        fuelType: formData.fuelType,
        transmission: formData.transmission,
        engineCapacity: formData.engineCapacity,
        color: [formData.color],
        bodyType: formData.bodyType,
        images: [],
        registrationStatus: formData.registrationStatus,
        features: formData.features.split(",").map((f) => f.trim()),
        stock: formData.stock,
        ratings: parseFloat(formData.sellerRating),
        seller: {
          name: formData.sellerName.trim(),
          contact: `${
            formData.sellerContactCode
          } ${formData.sellerContactNumber.trim()}`,
          location: formData.sellerLocation.trim(),
        },
      };
      console.log("seller is successfully", productData.seller);

      Object.keys(productData).forEach((key) => {
        const value = productData[key as keyof ProductData];
        if (key === "seller") {
          formDataToSend.append(key, JSON.stringify(value));
        } else if (Array.isArray(value)) {
          formDataToSend.append(key, JSON.stringify(value));
        } else {
          formDataToSend.append(key, String(value));
        }
      });

      formData.images.forEach((file) => {
        formDataToSend.append("images", file);
      });

      const token = Cookies.get("token");
      console.log("form data to send saif backend", formData);

      const response = await fetch("http://localhost:5001/api/products", {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formDataToSend,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      onUpdateSuccess();
      const result = await response.json();
      console.log("API Response:", result);
      onClose();
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <BootstrapDialog onClose={onClose} open={isOpen}>
      <DialogTitle sx={{ m: 0, p: 2, color: "#14b8a6" }}>
        Car Details Form
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={(theme) => ({
            position: "absolute",
            right: 8,
            top: 8,
            color: theme.palette.grey[500],
          })}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>
        <Box component="form" sx={{ mt: 2 }}>
          <Grid container spacing={2}>
            <Grid>
              <TextField
                fullWidth
                label="Car Name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                error={errors.name}
                helperText={errors.name ? "Car name is required" : ""}
                required
              />
            </Grid>
            <Grid>
              <TextField
                fullWidth
                select
                label="Brand"
                name="brand"
                value={formData.brand}
                onChange={handleInputChange}
                error={errors.brand}
                helperText={errors.brand ? "Brand is required" : ""}
                required
              >
                {brands.map((brand) => (
                  <MenuItem key={brand} value={brand}>
                    {brand}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid>
              <TextField
                fullWidth
                select
                label="Model"
                name="carModel"
                value={formData.carModel}
                onChange={handleInputChange}
                error={errors.carModel}
                helperText={errors.carModel ? "Model is required" : ""}
                required
              >
                {models.map((model) => (
                  <MenuItem key={model} value={model}>
                    {model}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid>
              <TextField
                fullWidth
                select
                label="Year"
                name="year"
                value={formData.year}
                onChange={handleInputChange}
                error={errors.year}
                helperText={errors.year ? "Year is required" : ""}
                required
              >
                {years.map((year) => (
                  <MenuItem key={year} value={year}>
                    {year}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid>
              <TextField
                fullWidth
                label="Price"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                error={errors.price}
                helperText={errors.price ? "Valid price is required" : ""}
                required
                type="number"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">$</InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid>
              <TextField
                fullWidth
                label="Mileage"
                name="mileage"
                value={formData.mileage}
                onChange={handleInputChange}
                error={errors.mileage}
                helperText={errors.mileage ? "Valid mileage is required" : ""}
                required
                type="number"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">km/l</InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid>
              <TextField
                fullWidth
                select
                label="Fuel Type"
                name="fuelType"
                value={formData.fuelType}
                onChange={handleInputChange}
                error={errors.fuelType}
                helperText={errors.fuelType ? "Fuel type is required" : ""}
                required
              >
                {fuelTypes.map((type) => (
                  <MenuItem key={type} value={type}>
                    {type}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid>
              <TextField
                fullWidth
                select
                label="Transmission"
                name="transmission"
                value={formData.transmission}
                onChange={handleInputChange}
                error={errors.transmission}
                helperText={
                  errors.transmission ? "Transmission is required" : ""
                }
                required
              >
                {transmissions.map((type) => (
                  <MenuItem key={type} value={type}>
                    {type}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid>
              <TextField
                fullWidth
                select
                label="Engine Capacity"
                name="engineCapacity"
                value={formData.engineCapacity}
                onChange={handleInputChange}
                error={errors.engineCapacity}
                helperText={
                  errors.engineCapacity ? "Engine capacity is required" : ""
                }
                required
              >
                {engineCapacities.map((capacity) => (
                  <MenuItem key={capacity} value={capacity}>
                    {capacity}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid>
              <TextField
                fullWidth
                select
                label="Body Type"
                name="bodyType"
                value={formData.bodyType}
                onChange={handleInputChange}
                error={errors.bodyType}
                helperText={errors.bodyType ? "Body type is required" : ""}
                required
              >
                {bodyTypes.map((type) => (
                  <MenuItem key={type} value={type}>
                    {type}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid>
              <TextField
                fullWidth
                select
                label="Registration Status"
                name="registrationStatus"
                value={formData.registrationStatus}
                onChange={handleInputChange}
                error={errors.registrationStatus}
                helperText={
                  errors.registrationStatus
                    ? "Registration status is required"
                    : ""
                }
                required
              >
                {registrationStatuses.map((status) => (
                  <MenuItem key={status} value={status}>
                    {status}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid>
              <TextField
                fullWidth
                select
                label="Color"
                name="color"
                value={formData.color}
                onChange={handleInputChange}
                error={errors.color}
                helperText={errors.color ? "Color is required" : ""}
                required
              >
                {colors.map((color) => (
                  <MenuItem key={color} value={color}>
                    {color}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid>
              <TextField
                fullWidth
                select
                label="Stock Status"
                name="stock"
                value={formData.stock}
                onChange={handleInputChange}
                error={errors.stock}
                helperText={errors.stock ? "Stock status is required" : ""}
                required
              >
                {stockStatuses.map((status) => (
                  <MenuItem key={status} value={status}>
                    {status}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid>
              <TextField
                fullWidth
                select
                label="Condition"
                name="condition"
                value={formData.condition}
                onChange={handleInputChange}
                error={errors.condition}
                helperText={errors.condition ? "Condition is required" : ""}
                required
              >
                {conditions.map((condition) => (
                  <MenuItem key={condition} value={condition}>
                    {condition}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid>
              <TextField
                fullWidth
                select
                label="Features"
                name="features"
                value={formData.features}
                onChange={handleInputChange}
                error={errors.features}
                helperText={errors.features ? "Features are required" : ""}
                required
              >
                {features.map((feature) => (
                  <MenuItem key={feature} value={feature}>
                    {feature}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid>
              <Typography variant="h6" sx={{ mt: 2, mb: 2 }}>
                Seller Information
              </Typography>
            </Grid>
            <Grid>
              <TextField
                fullWidth
                label="Seller Name"
                name="sellerName"
                value={formData.sellerName}
                onChange={handleInputChange}
                error={errors.sellerName}
                helperText={errors.sellerName ? "Seller name is required" : ""}
                required
              />
            </Grid>
            <Grid>
              <TextField
                fullWidth
                select
                label="Seller Location"
                name="sellerLocation"
                value={formData.sellerLocation}
                onChange={handleInputChange}
                error={errors.sellerLocation}
                helperText={
                  errors.sellerLocation ? "Seller location is required" : ""
                }
                required
              >
                {countries.map((country) => (
                  <MenuItem key={country} value={country}>
                    {country}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid>
              <TextField
                fullWidth
                select
                label="Seller Rating"
                name="sellerRating"
                value={formData.sellerRating}
                onChange={handleInputChange}
                error={errors.sellerRating}
                helperText={
                  errors.sellerRating ? "Seller rating is required" : ""
                }
                required
              >
                {ratings.map((rating) => (
                  <MenuItem key={rating} value={rating}>
                    {rating} Star{rating !== "1" ? "s" : ""}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid>
              <Box sx={{ display: "flex", gap: 2 }}>
                <TextField
                  select
                  label="Country Code"
                  name="sellerContactCode"
                  value={formData.sellerContactCode}
                  onChange={handleInputChange}
                  error={errors.sellerContactCode}
                  helperText={
                    errors.sellerContactCode ? "Country code is required" : ""
                  }
                  required
                  sx={{ width: "40%" }}
                >
                  {countryCodes.map((code) => (
                    <MenuItem key={code} value={code}>
                      {code}
                    </MenuItem>
                  ))}
                </TextField>
                <TextField
                  fullWidth
                  label="Phone Number"
                  name="sellerContactNumber"
                  value={formData.sellerContactNumber}
                  onChange={handleInputChange}
                  error={errors.sellerContactNumber}
                  helperText={
                    errors.sellerContactNumber ? "Phone number is required" : ""
                  }
                  required
                  placeholder="Enter phone number"
                />
              </Box>
            </Grid>

            <Grid>
              <Button variant="outlined" component="label">
                Upload up to 5 Images
                <input
                  type="file"
                  hidden
                  multiple
                  accept="image/*"
                  onChange={handleImageUpload}
                />
              </Button>

              <Box mt={1}>
                {formData.images.map((file, index) => {
                  const imageUrl = file ? URL.createObjectURL(file) : null;

                  return (
                    <Box
                      key={index}
                      sx={{ display: "flex", alignItems: "center", gap: 1 }}
                    >
                      <Typography variant="body2">
                        {index + 1}. {file.name}
                      </Typography>

                      {imageUrl && (
                        <img
                          src={imageUrl}
                          alt={`Preview ${index + 1}`}
                          style={{ width: 50, height: 50, objectFit: "cover" }}
                        />
                      )}
                    </Box>
                  );
                })}
              </Box>
            </Grid>
          </Grid>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button
          autoFocus
          onClick={handleSubmit}
          variant="contained"
          disableElevation
          className="!bg-teal-500 hover:!bg-teal-600 text-white"
        >
          Submit
        </Button>
      </DialogActions>
    </BootstrapDialog>
  );
};

export default EditDialogs;
