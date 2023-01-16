import { Box, Container, HStack, RadioGroup, Radio, VStack, Text, Image, Stat, StatLabel, StatNumber, StatHelpText, StatArrow, Badge, Button } from '@chakra-ui/react'
import React from 'react'
import Loader from "./Loader"
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { server } from '../main'
import ErrorComponent from './ErrorComponent'
import CustomBar from './CustomBar'
import Item from './Item'
import Chart from './Chart'

const CoinDetails = () => {
  const { id } = useParams()
  const [coin, setCoin] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [currency, setCurrency] = useState("inr");
  const [days, setDays] = useState("7");
  const [chartArray, setChartArray] = useState([]);


  const currencySymbol = currency === "inr" ? "₹" : currency === "eur" ? "€" : "$"

  const btns = ["24h", "7d", "14d", "30d", "60d", "200d", "1y", "max"]

  const swithChartStats = (btn) => {
    switch (btn) {
      case "24h":
        setDays("24h")
        setLoading(true)
        break;
      case "7d":
        setDays("7d")
        setLoading(true)
        break;
      case "14d":
        setDays("14d")
        setLoading(true)
        break;
      case "30d":
        setDays("30d")
        setLoading(true)
        break;
      case "60d":
        setDays("60d")
        setLoading(true)
        break;
      case "200d":
        setDays("200d")
        setLoading(true)
        break;
      case "1y":
        setDays("365d")
        setLoading(true)
        break;
      case "max":
        setDays("max")
        setLoading(true)
        break;
      default:
        setDays("24h")
        setLoading(true)
        break;
    }
  }


  useEffect(() => {
    const fetchCoin = async () => {
      try {

        const { data } = await axios.get(`${server}/coins/${id}`)

        setCoin(data)

        const { data: chartData } = await axios.get(`${server}/coins/${id}/market_chart?vs_currency=${currency}&days=${days}`)

        setChartArray(chartData.prices)
        setLoading(false)
      } catch (error) {
        setError(true)
        setLoading(false)
      }
    }
    fetchCoin()
  }, [id, currency, days]);


  if (error) {
    return (
      <ErrorComponent message={"Error while feching coin"} />
    )
  }

  return (
    <Container
      maxW={"container.xl"}
    >
      {loading ? (<Loader />) : (
        <>
          <Box borderWidth={1} width={"full"}>

            <Chart
              currency={currencySymbol}
              array={chartArray}
              days={days}
            />

          </Box>

          <HStack
            p={4}
            overflowX={"auto"} 
          >
            {btns.map((btn) => {
              return (
                <Button key={btn} onClick={() => swithChartStats(btn)}>{btn}</Button>
              )

            })}
          </HStack>

          <RadioGroup
            value={currency}
            onChange={setCurrency}
            p={8}>
            <HStack spacing={4}>
              <Radio value='inr'>INR</Radio>
              <Radio value='usd'>USD</Radio>
              <Radio value='eur'>EUR</Radio>
            </HStack>
          </RadioGroup>

          <VStack
            spacing={4}
            p={16}
            alignItems={'flex-start'}
          >
            <Text fontSize={"small"} alignSelf={"center"}>
              Last Updated On {Date(coin.market_data.last_updated).split("G")[0]}
            </Text>
            <Image src={coin.image.large} w={16} h={16} objectFit={"contain"} />
            <Stat>
              <StatLabel>{coin.name}</StatLabel>
              <StatNumber>{currencySymbol} {coin.market_data.current_price[currency]}</StatNumber>
              <StatHelpText>
                <StatArrow type={coin.market_data.price_change_24h > 0 ? "increase" : "decrease"} />
                {coin.market_data.price_change_24h}%
              </StatHelpText>
            </Stat>

            <Badge fontSize={"2xl"} bgColor={"blackAlpha.600"}>
              {`#${coin.market_cap_rank}`}
            </Badge>

            <CustomBar
              low={`${currencySymbol} ${coin.market_data.low_24h[currency]}`}

              high={`${currencySymbol} ${coin.market_data.high_24h[currency]}`} />

            <Box w={"full"} p={4}>

              <Item title={"Max Supply"} value={coin.market_data.max_supply} />

              <Item title={"Cerculating Supply"} value={coin.market_data.circulating_supply} />

              <Item title={"Market Cap"} value={`${currencySymbol} ${coin.market_data.market_cap[currency]}`} />

              <Item title={"All Time Low"} value={`${currencySymbol} ${coin.market_data.atl[currency]}`} />

              <Item title={"All Time High"} value={`${currencySymbol} ${coin.market_data.ath[currency]}`} />

            </Box>

          </VStack>
        </>
      )}
    </Container>
  )
}

export default CoinDetails
