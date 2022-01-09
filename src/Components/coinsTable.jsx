import React, { useContext, useEffect, useState } from 'react'
import { fetchCoinList } from '../config/actions'
import { CryptoContext, comma } from '../App'
import { makeStyles, ThemeProvider } from '@material-ui/styles'
import {
  Container,
  Typography,
  createTheme,
  TextField,
  TableContainer,
  LinearProgress,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from '@material-ui/core'
import { Pagination } from '@material-ui/lab'
import { useNavigate } from 'react-router-dom'

const CoinsTable = () => {
  const { currency, symbol } = useContext(CryptoContext)
  const [coinsList, setCoinsList] = useState([])
  const [filteredCoins, setFilteredCoins] = useState([])
  const [loading, setLoading] = useState(false)
  const [page, setPage] = useState(1)

  const columns = ['Coin', 'Current Price', '24h Change', 'Market Price']

  const useStyles = makeStyles(() => ({
    container: {
      marginTop: '24px',
    },
    heading: {
      fontFamily: 'Montserrat',
      fontWeight: 'bold',
      textAlign: 'center',
      fontSize: 24,
    },
    searchArea: {
      width: '100%',
      marginTop: 24,
    },
    topRow: {
      backgroundColor: 'gold',
    },
    headerText: {
      color: 'black',
      fontFamily: 'Montserrat',
      fontSize: 16,
      fontWeight: 700,
    },
    row: {
      backgroundColor: '#16171a',
      cursor: 'pointer',
      '&:hover': {
        backgroundColor: '#131111',
      },
      fontFamily: 'Montserrat',
    },
    columnData: {
      fontSize: 18,
    },
    pagination: {
      display: 'flex',
      justifyContent: 'center',
      padding: 24,
      width: '100%',
      '& .MuiPaginationItem-root': {
        color: 'gold',
      },
    },
  }))

  const classes = useStyles()
  const navigate = useNavigate() // useHistory has been repalced by useNavigate in React-Router-Dom v6

  const darkTheme = createTheme({
    palette: {
      type: 'dark',
    },
  })

  const handleSearch = (query) => {
    setFilteredCoins(
      coinsList.filter(
        (coin) =>
          coin.name.toLowerCase().includes(query) ||
          coin.symbol.toLowerCase().includes(query),
      ),
    )
  }

  useEffect(() => {
    setLoading(true)
    fetchCoinList(currency).then((data) => {
      setCoinsList(data)
      setFilteredCoins(data)
      setLoading(false)
    })
  }, [currency])

  return (
    <ThemeProvider theme={darkTheme}>
      <Container className={classes.container}>
        <Typography className={classes.heading}>
          Prices by Market Cap
        </Typography>
        <TextField
          className={classes.searchArea}
          label="Search crypto "
          variant="outlined"
          onChange={(e) => handleSearch(e.target.value)}
        />
        <TableContainer style={{ marginTop: '20px', borderRadius: '6px' }}>
          {loading ? (
            <LinearProgress style={{ backgroundColor: 'gold' }} />
          ) : (
            <Table>
              <TableHead>
                <TableRow className={classes.topRow}>
                  {columns.map((title) => (
                    <TableCell
                      align={title !== 'Coin' ? 'right' : ''}
                      className={classes.headerText}
                    >
                      {title}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredCoins
                  .slice((page - 1) * 10, (page - 1) * 10 + 10)
                  .map((row) => {
                    const profit = row.price_change_percentage_24h > 0
                    return (
                      <TableRow
                        onClick={() => navigate(`/coins/${row.id}`)}
                        className={classes.row}
                        key={row.name}
                      >
                        <TableCell
                          component="th"
                          scope="row"
                          style={{
                            display: 'flex',
                            gap: 15,
                          }}
                        >
                          <img
                            src={row.image}
                            alt={row.name}
                            height="50"
                            style={{ marginBottom: 10 }}
                          />
                          <div
                            style={{ display: 'flex', flexDirection: 'column' }}
                          >
                            <span
                              style={{
                                textTransform: 'uppercase',
                                fontSize: 18,
                              }}
                            >
                              {row.symbol}
                            </span>
                            <span style={{ color: 'darkgrey' }}>
                              {row.name}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell align="right" className={classes.columnData}>
                          {symbol} {comma(row.current_price.toFixed(2))}
                        </TableCell>
                        <TableCell
                          align="right"
                          className={classes.columnData}
                          style={{
                            color: profit > 0 ? 'rgb(14, 203, 129)' : 'red',
                            fontWeight: 500,
                          }}
                        >
                          {profit && '+'}
                          {row.price_change_percentage_24h.toFixed(2)}%
                        </TableCell>
                        <TableCell align="right" className={classes.columnData}>
                          {symbol}{' '}
                          {comma(row.market_cap.toString().slice(0, -6))} M
                        </TableCell>
                      </TableRow>
                    )
                  })}
              </TableBody>
            </Table>
          )}
        </TableContainer>
        <Pagination
          className={classes.pagination}
          count={(filteredCoins.length / 10).toFixed(0)}
          onChange={(_, page) => {
            setPage(page)
            window.scroll(0, 450)
          }}
        ></Pagination>
      </Container>
    </ThemeProvider>
  )
}

export default CoinsTable
