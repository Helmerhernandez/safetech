import React from 'react';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
} from '@mui/material';
import Slide from '@mui/material/Slide'; 
import Box from '@mui/material/Box';
import { useState } from "react";
import { useSelector } from 'react-redux'; 
import useMediaQuery from '@mui/material/useMediaQuery';
import Link from 'next/link';
import Typography from '@mui/material/Typography';
 
import Stack from '@mui/material/Stack'; 
import CustomTextField from '@/app/components/forms/theme-elements/CustomTextField';
import CustomFormLabel from '@/app/components/forms/theme-elements/CustomFormLabel';

const Transition = React.forwardRef(function Transition(props, ref) {

  const customizer = useSelector((state) => state.customizer);
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up('lg'));
  const hideMenu = lgUp ? customizer.isCollapse && !customizer.isSidebarHover : '';

  return <Slide class={hideMenu ? 'dialog-form' : 'dialog-form extended'} direction="right" ref={ref} {...props} />;

});

const Createroute = () => {

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
 
  return (
    <>

      <Button class="bubble-link" fullWidth onClick={handleClickOpen}>
              <Typography
                variant="subtitle2"
                fontWeight="600"
                color="textPrimary"
                display="flex"
                alignItems="center"
                gap="4px"
              >

                ROUTE
              </Typography>
      </Button>

      <Dialog
        variant="content"
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >

        <DialogContent class="dialog-form-content">

          <Button class="close-dialog-form" onClick={handleClose}>
            <svg width="20" height="20" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M32 3.22286L28.7771 0L16 12.7771L3.22286 0L0 3.22286L12.7771 16L0 28.7771L3.22286 32L16 19.2229L28.7771 32L32 28.7771L19.2229 16L32 3.22286Z" fill="#202022" />
            </svg>
          </Button>

          <DialogTitle>{"NEW ROUTE"} <Typography class="DialogSubTitle">12/08/2024  10:08 PM</Typography></DialogTitle>


          <Stack>
            <Box className="muitech">
              <CustomFormLabel className="nametech" htmlFor="object">OBJECT ID</CustomFormLabel>
              <CustomTextField id="object" placeholder="OBJECT ID" variant="outlined" fullWidth />
            </Box>

            <Box className="muitech">
              <CustomFormLabel className="nametech" htmlFor="plate">PLATE NUMBER</CustomFormLabel>
              <CustomTextField id="plate" placeholder="PLATE NUMBER" variant="outlined" fullWidth />
            </Box>

            <Box className="muitech">
              <CustomFormLabel className="nametech" htmlFor="model">MODEL</CustomFormLabel>
              <CustomTextField id="model" placeholder="MODEL" variant="outlined" fullWidth />
            </Box>

            <Box className="muitech">
              <CustomFormLabel className="nametech" htmlFor="year">YEAR</CustomFormLabel>
              <CustomTextField id="year" placeholder="YEAR" variant="outlined" fullWidth />
            </Box>


            <Box className="muitech">
              <CustomFormLabel className="nametech" htmlFor="serial">SERIAL</CustomFormLabel>
              <CustomTextField id="serial" placeholder="SERIAL" variant="outlined" fullWidth />
            </Box>

            <Box className="muitech">
              <CustomFormLabel className="nametech" htmlFor="brand">BRAND</CustomFormLabel>
              <CustomTextField id="brand" placeholder="BRAND" variant="outlined" fullWidth />
            </Box>

            <Box className="muitech">
              <CustomFormLabel className="nametech" htmlFor="vendor">VENDOR</CustomFormLabel>
              <CustomTextField id="vendor" placeholder="VENDOR" variant="outlined" fullWidth />
            </Box>

            <Box className="muitech-confirm">



              <Button
                class="lineal"
                color="primary"
                variant="contained"
                size="large"
                fullWidth
                component={Link}
                href="/"
                onClick={handleClose}
              >
                CANCEL
              </Button>

              <Button
                color="primary"
                variant="contained"
                size="large"
                fullWidth
                component={Link}
                href="/"
                type="submit"
              >
                CREATE
              </Button>
            </Box>

          </Stack>
        </DialogContent>
      </Dialog>

    </>
  );
};

export default Createroute;
