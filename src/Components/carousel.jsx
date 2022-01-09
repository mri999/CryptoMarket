import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/core'
import { CryptoContext, comma } from '../App'
import { fetchTrendingCoins } from '../config/actions'
import AliceCarousel from 'react-alice-carousel'

const Carousel = () => {
  const { currency, symbol } = useContext(CryptoContext)
  const [trendingCoins, setTrendingCoins] = useState([])

  const useStyles = makeStyles(() => ({
    carousel: {
      height: '50%',
      display: 'flex',
      alignItems: 'center',
    },
    carouselItem: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      cursor: 'pointer',
      textTransform: 'uppercase',
      color: 'white',
    },
  }))

  const classes = useStyles()

  useEffect(() => {
    fetchTrendingCoins(currency).then((data) => {
      setTrendingCoins(data)
    })
  }, [currency])

  const items =
    trendingCoins &&
    trendingCoins.map((coin) => {
      let profit = coin?.price_change_percentage_24h >= 0

      return (
        <Link className={classes.carouselItem} to={`/coins/${coin.id}`}>
          <img
            src={coin?.image}
            alt={coin.name}
            height="80"
            style={{ marginBottom: 10 }}
          />
          <span style={{ marginBottom: 4 }}>
            {coin?.symbol}
            &nbsp;
            <span
              style={{
                color: profit > 0 ? 'rgb(14, 203, 129)' : 'red',
                fontWeight: 500,
              }}
            >
              {profit && '+'}
              {coin?.price_change_percentage_24h?.toFixed(2)}%
            </span>
          </span>
          <span style={{ fontSize: 22, fontWeight: 500 }}>
            {symbol} {comma(coin?.current_price.toFixed(2))}
          </span>
        </Link>
      )
    })

  const responsive = {
    // responsive is used for alice carousel,  when it is 0 pixels or higher --> show 2 items, if it 512 or higher then show 4 items
    0: {
      items: 2,
    },
    512: {
      items: 4,
    },
  }

  return (
    <div className={classes.carousel}>
      <AliceCarousel
        mouseTracking
        infinite
        autoPlayInterval={1000}
        animationDuration={1500}
        disableDotsControls={false}
        responsive={responsive}
        autoPlay
        items={items}
      />
    </div>
  )
}

export default Carousel
