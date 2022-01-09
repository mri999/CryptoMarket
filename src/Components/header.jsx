import React from 'react'
import {
  AppBar,
  Toolbar,
  Container,
  Typography,
  Select,
  MenuItem,
  createTheme,
} from '@material-ui/core'
import { makeStyles, ThemeProvider } from '@material-ui/styles'
import { useNavigate } from 'react-router-dom'

const Header = () => {
  const useStyles = makeStyles(() => ({
    title: {
      color: 'gold',
      cursor: 'pointer',
      fontFamily: 'Montserrat',
      fontWeight: 'bold',
      flex: '1',
    },
  }))

  const navigate = useNavigate()

  const classes = useStyles()
  const darkTheme = createTheme({
    palette: {
      primary: {
        main: '#fff',
      },
      type: 'dark',
    },
  })

  return (
    <ThemeProvider theme={darkTheme}>
      <AppBar color="transparent" position="static">
        <Container>
          <Toolbar>
            <Typography onClick={() => navigate('/')} className={classes.title}>
              Crypto Market
            </Typography>
            <Select
              variant="outlined"
              style={{
                width: 100,
                height: 40,
                marginLeft: 15,
              }}
            >
              <MenuItem value={'INR'}> INR </MenuItem>
              <MenuItem value={'USD'}> USD </MenuItem>
            </Select>
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  )
}

export default Header
