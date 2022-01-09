import React, { useContext } from 'react'
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
import { CryptoContext } from '../App'

const Header = () => {
  const { currency, setCurrency } = useContext(CryptoContext)

  const useStyles = makeStyles(() => ({
    title: {
      color: 'gold',
      cursor: 'pointer',
      fontFamily: 'Montserrat',
      fontWeight: 'bold',
      flex: '1',
      fontSize: '20px',
    },
  }))

  const navigate = useNavigate() // useHistory has been repalced by useNavigate in React-Router-Dom v6
  const classes = useStyles()

  const darkTheme = createTheme({
    palette: {
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
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              variant="outlined"
              style={{
                width: 100,
                height: 40,
                marginRight: 15,
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
