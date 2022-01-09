import { makeStyles } from '@material-ui/styles'
import ReactHtmlParser from 'react-html-parser'
import React, { useState, useEffect, useContext } from 'react'
import { useParams } from 'react-router'
import { CryptoContext, comma } from '../App'
import CoinChart from '../Components/coinChart'
import { fetchCoinData } from '../config/actions'
import { LinearProgress, Typography } from '@material-ui/core'

const CoinPage = () => {
  const { id } = useParams()
  const [coin, setCoin] = useState()

  const { currency, symbol } = useContext(CryptoContext)

  useEffect(() => {
    fetchCoinData(id).then((data) => {
      setCoin(data)
    })
  }, [id])

  const useStyles = makeStyles((theme) => ({
    container: {
      display: 'flex',
      marginTop: 28,
      marginLeft: 28,
    },
    image: {
      display: 'flex',
      justifyContent: 'center',
      height: 200,
      width: 200,
      marginLeft: 180,
    },
    sideBar: {
      width: '30%',
      display: 'flex',
      marginTop: 24,
      flexDirection: 'column',
      justifyContent: 'center',
      borderRight: '2px solid grey',
    },
    heading: {
      display: 'flex',
      justifyContent: 'center',
      fontWeight: 'bold',
      marginBottom: 20,
      marginTop: 30,
      fontFamily: 'Montserrat',
    },
    description: {
      width: '100%',
      fontFamily: 'Montserrat',
      padding: 24,
      paddingBottom: 16,
      paddingTop: 0,
      textAlign: 'justify',
    },
    marketData: {
      alignSelf: 'start',
      padding: 25,
      paddingTop: 10,
      width: '100%',
    },
    key: {
      fontWeight: 'bold',
    },
    marketHeader: {
      fontFamily: 'Montserrat',
      marginBottom: 14,
    },
  }))

  const classes = useStyles()

  if (!coin)
    return <LinearProgress style={{ backgroundColor: 'gold', marginTop: 24 }} />

  return (
    <div className={classes.container}>
      <div className={classes.sideBar}>
        <img className={classes.image} src={coin.image.large} alt={coin.name} />
        <Typography variant="h3" className={classes.heading}>
          {coin?.name}
        </Typography>
        {coin.description && (
          <Typography variant="subtitle1" className={classes.description}>
            {ReactHtmlParser(coin?.description.en.split('. ')[0])}
          </Typography>
        )}
        <div className={classes.marketData}>
          <span style={{ display: 'flex' }}>
            <Typography variant="h5" className={classes.marketHeader}>
              <span className={classes.key}>Rank : </span>{' '}
              {comma(coin?.market_cap_rank)}
            </Typography>
          </span>
          <span style={{ display: 'flex' }}>
            <Typography variant="h5" className={classes.marketHeader}>
              <span className={classes.key}>Current Price : </span>
              {symbol}&nbsp;
              {comma(coin?.market_data.current_price[currency.toLowerCase()])}
            </Typography>
          </span>
          <span style={{ display: 'flex' }}>
            <Typography className={classes.marketHeader} variant="h5">
              <span className={classes.key}>Market Cap : </span>
              {symbol}&nbsp;
              {comma(
                coin?.market_data.market_cap[currency.toLowerCase()]
                  .toString()
                  .slice(0, -6),
              )}{' '}
              M
            </Typography>
          </span>
        </div>
      </div>
      <div className={classes.chart}>
        <CoinChart coint={coin} />
      </div>
    </div>
  )
}

export default CoinPage
