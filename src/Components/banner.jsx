import React from 'react'
import { Container, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import Carousel from './carousel'

const Banner = () => {
  const useStyles = makeStyles(() => ({
    banner: {
      backgroundImage: 'url(./banner.jpeg)',
    },
    content: {
      display: 'flex',
      flexDirection: 'column',
      height: 400,
      justifyContent: 'space-around',
    },
    tagline: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    title: {
      fontFamily: 'Montserrat',
      color: '#fff',
      fontWeight: 'bold',
      marginBottom: 16,
    },
    subTitle: {
      color: 'darkGrey',
      fontSize: '14px',
    },
  }))

  const classes = useStyles()

  return (
    <div className={classes.banner}>
      <Container className={classes.content}>
        <div className={classes.tagline}>
          <Typography variant="h2" className={classes.title}>
            Crypto Market
          </Typography>
          <Typography variant="subTitile2" className={classes.subTitle}>
            Get All The Info Regarding Your Favorite Crypto Currency
          </Typography>
        </div>
        <Carousel />
      </Container>
    </div>
  )
}

export default Banner
