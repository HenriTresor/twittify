// import React from 'react'
import { Typography, TextField } from "@mui/material"
import { buttonStyles } from "../Aside/buttonStyles"
import { Google, Twitter } from "@mui/icons-material"

const Login = () => {
  return (
      <div>
          <Typography color={'#1d98f0'}>
              <Twitter />
          </Typography>
          <Typography variant='h6' letterSpacing={1} fontWeight={'bold'}>
              Signin to Twitter
          </Typography>
          <button style={{
              ...buttonStyles,
              padding: '0.2em', display: 'flex', alignItems: 'center', justifyContent: "center", gap: '1em'
          }}> <Google /> Sign in with Google</button>

          <div style={{
              display: "flex",
              alignItems: 'center',
              justifyContent: "center",
          }}>
              <hr style={{ width: '100px' }} />
              <Typography sx={{m:'0 0.2em'}}>
                  or
                </Typography>
               <hr style={{ width: '100px' }} />
          </div>

          <div>
              <div className="input_container">
                  <TextField 
                //   color='white'
                      sx={{ color: 'white' }}
                      label='email address'
                  />
              </div>
              <div className="input_container">
                  <TextField 
                //   color='white'
                      fullWidth
                      sx={{ color: 'white' }}
                      label='password'
                  />
              </div>

              <div>
                  <button style={buttonStyles}>
                      Sign in
                  </button>
              </div>
          </div>
    </div>
  )
}

export default Login