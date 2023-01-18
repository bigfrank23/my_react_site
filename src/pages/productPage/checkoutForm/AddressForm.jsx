import { Box, Button, Grid, InputLabel, MenuItem, Select, Typography, } from "@mui/material";
import React, { useState } from "react";
import { useEffect } from "react";
import { useForm, FormProvider } from "react-hook-form";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";

import FormInput from "./FormInput";
import { Link } from "react-router-dom";
import { commerce } from './../../../lib/commerce';

const AddressForm = ({ checkoutToken, test }) => {
  const methods = useForm();
  const [shippingCountries, setShippingCountries] = useState([]);
  const [shippingCountry, setShippingCountry] = useState("");
  const [shippingSubdivisions, setShippingSubdivisions] = useState([]);
  const [shippingSubdivision, setShippingSubdivision] = useState("");
  const [shippingOptions, setShippingOptions] = useState([]);
  const [shippingOption, setShippingOption] = useState("");

  const countries = Object.entries(shippingCountries).map(([code, name]) => ({ id: code, label: name, }));
  const subdivisions = Object.entries(shippingSubdivisions).map( ([code, name]) => ({ id: code, label: name }) );
  const options = shippingOptions.map((sO) => ({ id: sO.id, label: `${sO.description} - (${sO.price.formatted_with_symbol})`, }));

  // console.log(shippingOptions);

  const fetchShippingCountries = async (checkoutTokenId) => {
    const { countries } = await commerce.services.localeListShippingCountries( checkoutTokenId );
    console.log(countries);
    setShippingCountries(countries);
    setShippingCountry(Object.keys(countries)[0]);
  };

  const fetchSubdivisions = async (countryCode) => {
    const { subdivisions } = await commerce.services.localeListSubdivisions( countryCode );
    // console.log(countries);
    setShippingSubdivisions(subdivisions);
    setShippingSubdivision(Object.keys(subdivisions)[0]);
  };

  const fetchShippingOptions = async ( checkoutTokenId, country, region = null ) => {
    const options = await commerce.checkout.getShippingOptions( checkoutTokenId, { country, region } );
    // console.log(countries);
    setShippingOptions(options);
    setShippingOption(options[0]?.id);
  };

  useEffect(() => {
    fetchShippingCountries(checkoutToken.id);
  }, []);

  useEffect(() => {
    if (shippingCountry) fetchSubdivisions(shippingCountry);
  }, [shippingCountry]);

  useEffect(() => {
    if (shippingSubdivision)
      fetchShippingOptions( checkoutToken.id, shippingCountry, shippingSubdivision );
  }, [shippingSubdivision]);

// const countries = [{
//     id: 1,
//     label: 'Nigeria'
// }]
// const subdivisions = [{
//     id: 1,
//     label: 'Nigeria'
// }]
// const options = [{
//     id: 1,
//     label: 'Nigeria'
// }]

  return (
    <>
    <Box sx={{background: '#fff', padding: {xs: '5rem 2rem', md: '10rem'}}}>
      <Typography variant="h6" gutterBottom>
        {" "}
        Shipping Address{" "}
      </Typography>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit((data) => test({ ...data, shippingCountry, shippingSubdivision, shippingOption, }) )} >
          <Grid container spacing={3}>
            <FormInput name="firstName" label="First Name" />
            <FormInput name="lastName" label="Last Name" />
            <FormInput name="address1" label="Address" />
            <FormInput name="email" label="Email" />
            <FormInput name="city" label="City" />
            <FormInput name="zip" label="ZIP / Postal code" />
            <Grid item xs={12} sm={6}>
              <InputLabel>Shpping Country</InputLabel>
              <Select
                value={shippingCountry}
                fullWidth
                onChange={(e) => setShippingCountry(e.target.value)}
              >
                {countries.map((country) => (
                  <MenuItem key={country.id} value={country.id}>
                    {country.label}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputLabel>Shpping Subdivision</InputLabel>
              <Select
                value={shippingSubdivision}
                fullWidth
                onChange={(e) => setShippingSubdivision(e.target.value)}
              >
                {subdivisions.map((subdivision) => (
                  <MenuItem key={subdivision.id} value={subdivision.id}>
                    {subdivision.label}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputLabel>Shpping Option</InputLabel>
              <Select
                value={shippingOption}
                fullWidth
                onChange={(e) => setShippingOption(e.target.value)}
              >
                {options.map((option) => (
                  <MenuItem key={option.id} value={option.id}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
          </Grid>
          <br />
          <div style={{ display: "flex", gap: '10px', position: 'relative', float: 'right'}}>
            <Button component={Link} to="/cart" variant="outlined" color='secondary' startIcon={<ArrowRightAltIcon sx={{transform: 'rotate(180deg)'}} />}>
              Back to Cart{" "}
            </Button>
            <Button type="submit" variant="contained" color="secondary" endIcon={<ArrowRightAltIcon/>}>
              {" "}
              Next{" "}
            </Button>
          </div>
        </form>
      </FormProvider>

    </Box>
    </>
  );
};

export default AddressForm;
