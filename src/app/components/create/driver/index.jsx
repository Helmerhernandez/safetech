


'use client';
import React, { useState } from 'react';
import { saveUser } from '@/utils/parse';
import { useSession } from 'next-auth/react';

import {
  Box,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  Stepper,
  Button,
  Typography,
  Hidden,
} from '@mui/material';
import Slide from '@mui/material/Slide';
import { useSelector } from 'react-redux';
import useMediaQuery from '@mui/material/useMediaQuery';
import Link from 'next/link'; 

import CustomTextField from '@/app/components/forms/theme-elements/CustomTextField';
import CustomFormLabel from '@/app/components/forms/theme-elements/CustomFormLabel';
import { Stack } from '@mui/system';
import { LayoutGroup } from 'framer-motion';


const Transition = React.forwardRef(function Transition(props, ref) {


  const customizer = useSelector((state) => state.customizer);
  const hideMenu = customizer.isCollapse;

  return <Slide className={hideMenu ? 'dialog-form' : 'dialog-form extended'} direction="right" ref={ref} {...props} />;

});

const steps = ['Create', 'Confirm']; 

const CreateDriver = () => {

  const { data: session } = useSession();
  const [userData, setUserData] = useState({
    name: '',
    username: '',
    password: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    country: '',
    vendor: '',
    status: '',
    role: "driver"
  });

  const [idUser, setIdUser] = useState('');


  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  
  const fields = [
    { label: 'NOMBRE COMPLETO', name: 'name' },
    { label: 'USUARIO', name: 'username' , layout: 'two' },
    { label: 'PASSWORD', name: 'password' , layout: 'two' },
    { label: 'EMAIL', name: 'email' },
    { label: 'TELÉFONO', name: 'phone' },
    { label: 'DIRECCIÓN', name: 'address' },
    { label: 'CIUDAD', name: 'city', layout: 'two' },
    { label: 'PAÍS', name: 'country' , layout: 'two' },
    { label: 'PROVEEDOR', name: 'vendor' }, 
    { label: 'ESTADO', name: 'status' },
  ];

  const [activeStep, setActiveStep] = React.useState(0);

  const isStepOptional = (step) => step === 1;


  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setActiveStep(0);
    setOpen(true);
  };

  const handleClose = () => {    
    setOpen(false);    
  };

  const handleSubmit = async (e) => {

    e.preventDefault();
    setActiveStep((prevActiveStep) => prevActiveStep + 1);

  };

  const saveIt = async(e) => {

    e.preventDefault();

    try {
      if (session) {

        const token = session.accessToken;

        const response = await saveUser(userData, token);
        setIdUser(response.result.id);
        setActiveStep((prevActiveStep) => prevActiveStep + 1);        

      } else {
        //alert('No se ha encontrado una sesión activa.');
      }

    } catch (error) {
      //console.error(error);
      //alert('Error al guardar el vehículo. Por favor, intente de nuevo.');
    }



  }

  const handleSteps = (step) => {
    switch (step) {
      case 0:
        return (


          <form onSubmit={handleSubmit}>

            <Box className="muitech">

                <CustomFormLabel className="nametech" htmlFor="name">Nombres Completos</CustomFormLabel>

                <CustomTextField id="name" name="name" placeholder="Nombres" variant="outlined" fullWidth
                          required={true}
                          onChange={handleChange}
                          onKeyDown={(e) => {
                            e.stopPropagation();
                }} />

            </Box>
 
            <Grid spacing={3} container>

              <Grid item lg={6} md={6} sm={6} >

                <Box className="muitech">

                  <CustomFormLabel className="nametech" htmlFor="username">Usuario</CustomFormLabel>

                  <CustomTextField id="username" name="username" placeholder="Usuario" variant="outlined" fullWidth
                            required={true}
                            onChange={handleChange}
                            onKeyDown={(e) => {
                              e.stopPropagation();
                  }} />

                </Box>

               </Grid>

               <Grid item lg={6} md={6} sm={6} >

                <Box className="muitech">

                  <CustomFormLabel className="nametech" htmlFor="password">Contraseña</CustomFormLabel>

                  <CustomTextField id="password" name="password" placeholder="Contraseña" variant="outlined" fullWidth
                            required={true}
                            type="password"
                            onChange={handleChange}
                            onKeyDown={(e) => {
                              e.stopPropagation();
                  }} />

                </Box>

               </Grid>

            </Grid>

            <Box className="muitech">

              <CustomFormLabel className="nametech" htmlFor="email">Correo electrónico</CustomFormLabel>

              <CustomTextField id="email" name="email" placeholder="Email" variant="outlined" fullWidth
                        required={true}
                        onChange={handleChange}
                        onKeyDown={(e) => {
                          e.stopPropagation();
              }} />

            </Box>

            <Grid spacing={3} container>

              <Grid item lg={6} md={6} sm={6} >

                <Box className="muitech">

                  <CustomFormLabel className="nametech" htmlFor="phone">Teléfono</CustomFormLabel>

                  <CustomTextField id="phone" name="phone" placeholder="Teléfono" variant="outlined" fullWidth
                            required={true}
                            onChange={handleChange}
                            onKeyDown={(e) => {
                              e.stopPropagation();
                  }} />

                </Box>

               </Grid>

               <Grid item lg={6} md={6} sm={6} >

                <Box className="muitech">

                  <CustomFormLabel className="nametech" htmlFor="address">Dirección</CustomFormLabel>

                  <CustomTextField id="address" name="address" placeholder="Dirección" variant="outlined" fullWidth
                            required={true}
                            onChange={handleChange}
                            onKeyDown={(e) => {
                              e.stopPropagation();
                  }} />

                </Box>

               </Grid>

            </Grid>

            <Grid spacing={3} container>

              <Grid item lg={6} md={6} sm={6} >

                <Box className="muitech">

                  <CustomFormLabel className="nametech" htmlFor="city">Ciudad</CustomFormLabel>

                  <CustomTextField id="city" name="city" placeholder="Ciudad" variant="outlined" fullWidth
                            required={true}
                            onChange={handleChange}
                            onKeyDown={(e) => {
                              e.stopPropagation();
                  }} />

                </Box>

               </Grid>

               <Grid item lg={6} md={6} sm={6} >

                <Box className="muitech">

                  <CustomFormLabel className="nametech" htmlFor="country">País</CustomFormLabel>

                  <CustomTextField id="country" name="country" placeholder="País" variant="outlined" fullWidth
                            required={true}
                            onChange={handleChange}
                            onKeyDown={(e) => {
                              e.stopPropagation();
                  }} />

                </Box>

               </Grid>

            </Grid>






            <Box className="muitech">

              <CustomFormLabel className="nametech" htmlFor="vendor">Proveedor</CustomFormLabel>

                <CustomTextField id="vendor" name="vendor" placeholder="Proveedor" variant="outlined" fullWidth
                          required={true}
                          onChange={handleChange}
                          onKeyDown={(e) => {
                            e.stopPropagation();
                }} />

            </Box>



            <Box className="muitech">

              <CustomFormLabel className="nametech" htmlFor="status">Estado</CustomFormLabel>

                <CustomTextField id="status" name="status" placeholder="Estado" variant="outlined" fullWidth
                          required={true}
                          onChange={handleChange}
                          onKeyDown={(e) => {
                            e.stopPropagation();
                }} />

            </Box>



            

            <Box className="muitech-confirm">
                <Button
                  color="secondary"
                  variant="alone"
                  size="large"
                  fullWidth
                  onClick={handleClose}
                >
                  CANCELAR
                </Button>

                <Button
                  type="submit"
                  color="primary"
                  variant="contained"
                  size="large"
                  fullWidth
                >
                  CREAR
                </Button>
            </Box>

          </form>




        );
      case 1:
        return (

          <Box className="dialog-form-box">

            <svg width="134" height="134" viewBox="0 0 134 134" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="67" cy="67" r="66.5" fill="white" stroke="#D1D1D1"/>
              <path d="M66.5 32C70.35 32 73.5 35.15 73.5 39C73.5 42.85 70.35 46 66.5 46C62.65 46 59.5 42.85 59.5 39C59.5 35.15 62.65 32 66.5 32ZM98 56.5H77V102H70V81H63V102H56V56.5H35V49.5H98V56.5Z" fill="#202022"/>
            </svg>


            <Typography className='dialog-response' variant="body2" sx={{ mt: 1 }}>¿Estás seguro de crear el siguiente conductor? </Typography>

          </Box>

        );

      default:
        break;
    }
  };





  return (
    <>

      <Button className="bubble-link" fullWidth onClick={handleClickOpen}>
        <Typography
          variant="subtitle2"
          fontWeight="600"
          color="textPrimary"
          display="flex"
          alignItems="center"
          gap="4px"
        >

          CONDUCTOR
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

        <Button className="close-dialog-form" onClick={handleClose}>
          <svg width="20" height="20" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M32 3.22286L28.7771 0L16 12.7771L3.22286 0L0 3.22286L12.7771 16L0 28.7771L3.22286 32L16 19.2229L28.7771 32L32 28.7771L19.2229 16L32 3.22286Z" fill="#202022" />
          </svg>
        </Button>

        <DialogTitle>{"CREAR CONDUCTOR"} <Typography className="DialogSubTitle">12/08/2024  10:08 PM</Typography></DialogTitle>

        <DialogContent className="dialog-form-content">

          <Box width="100%">

            <Stepper activeStep={activeStep}>
              {steps.map((label, index) => {
                const stepProps = {};
                const labelProps = {};
                if (isStepOptional(index)) {
                  labelProps.optional = <Typography variant="caption">Optional</Typography>;
                }
              })}
            </Stepper>

            {activeStep === steps.length ? (

              <>

                <Box className="dialog-form-box">

                  <svg width="134" height="134" viewBox="0 0 134 134" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="67" cy="67" r="66.5" fill="white" stroke="#D1D1D1"/>
                    <circle cx="113" cy="24" r="18" fill="#0CC71E"/>
                    <path d="M104 26.2L108.909 31L122 17" stroke="white" stroke-width="4" stroke-linecap="round"/>
                    <path d="M66.5 32C70.35 32 73.5 35.15 73.5 39C73.5 42.85 70.35 46 66.5 46C62.65 46 59.5 42.85 59.5 39C59.5 35.15 62.65 32 66.5 32ZM98 56.5H77V102H70V81H63V102H56V56.5H35V49.5H98V56.5Z" fill="#202022"/>
                  </svg>

                  <Typography className='dialog-response' variant="body2" sx={{ mt: 1 }}>Has creado un nuevo conductor</Typography>
                  <Typography className='dialog-response' variant="body2" sx={{ mt: 1 }}>Identificación del Conductor : {idUser}</Typography>

                </Box>

                <Box className="muitech-confirm">

                  <Button
                    color="primary"
                    variant="contained"
                    size="large"
                    fullWidth
                    component={Link}
                    href="/"
                    onClick={handleClose}
                  >
                    CERRAR

                  </Button>

                </Box>

              </>
            ) : (
              <>

                {handleSteps(activeStep)}

                {activeStep === steps.length - 1 ?

                  <>
                    <Box className="muitech-confirm">

                      <Button
                        color="primary"
                        variant="alone"
                        size="large"
                        fullWidth
                        component={Link}
                        href="/"
                        onClick={handleClose}
                      >
                        CERRAR
                      </Button>

                      <Button
                        color="primary"
                        variant="contained"
                        size="large"
                        fullWidth
                        onClick={saveIt}>

                        CREAR

                      </Button>

                    </Box>

                  </> : ''} </>)}

          </Box>

        </DialogContent>

      </Dialog>

    </>

  );
};


export default CreateDriver;



