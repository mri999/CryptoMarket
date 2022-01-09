/* eslint-disable no-unused-vars */
import { useEffect, useState, useContext } from 'react'
import Chart from 'chart.js/auto'
import { Line } from 'react-chartjs-2'
import {
  CircularProgress,
  createTheme,
  makeStyles,
  ThemeProvider,
} from '@material-ui/core'
import SelectButton from './selectButton'
import { fetchHistoricData } from '../config/actions'
import { CryptoContext } from '../App'

const CoinChart = ({ coin }) => {
  const [historicData, setHistoricData] = useState()
  const [days, setDays] = useState(1)
  const { currency } = useContext(CryptoContext)
  const [loading, setLoading] = useState(false)

  const chartDays = [
    {
      label: '24 Hours',
      value: 1,
    },
    {
      label: '30 Days',
      value: 30,
    },
    {
      label: '3 Months',
      value: 90,
    },
    {
      label: '1 Year',
      value: 365,
    },
  ]

  const useStyles = makeStyles((theme) => ({
    container: {
      flex: '1',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 25,
      padding: 40,
      [theme.breakpoints.down('md')]: {
        width: '100%',
        marginTop: 0,
        padding: 20,
        paddingTop: 0,
      },
    },
  }))

  const classes = useStyles()

  console.log(coin)

  useEffect(() => {
    setLoading(true)
    const { id } = coin
    if (id) {
      fetchHistoricData(coin.id, days, currency).then((prices) =>
        setHistoricData(prices),
      )
    }
  }, [coin, currency, days])

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
      <div className={classes.container}>
        {!historicData | !loading ? (
          <CircularProgress
            style={{ color: 'gold', display: 'flex', alignItems: 'center' }}
            size={250}
            thickness={1}
          />
        ) : (
          <>
            <Line
              data={{
                labels: historicData.map((coin) => {
                  const date = new Date(coin[0])
                  const time =
                    date.getHours() > 12
                      ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                      : `${date.getHours()}:${date.getMinutes()} AM`
                  return days === 1 ? time : date.toLocaleDateString()
                }),

                datasets: [
                  {
                    data: historicData.map((coin) => coin[1]),
                    label: `Price ( Past ${days} Days ) in ${currency}`,
                    borderColor: '#EEBC1D',
                  },
                ],
              }}
            />
            <div
              style={{
                display: 'flex',
                marginTop: 20,
                justifyContent: 'space-around',
                width: '100%',
              }}
            >
              {chartDays.map((day) => (
                <SelectButton
                  key={day.value}
                  onClick={() => {
                    setDays(day.value)
                    setLoading(false)
                  }}
                  selected={day.value === days}
                >
                  {day.label}
                </SelectButton>
              ))}
            </div>
          </>
        )}
      </div>
    </ThemeProvider>
  )
}

export default CoinChart
