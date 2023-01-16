import React, { useEffect, useState } from 'react'
import axios from "axios"
import { server } from '../main';
import { Container,  HStack } from '@chakra-ui/react';
import Loader from './Loader';
import ExchangeCard from './ExchangeCard';
import ErrorComponent from "./ErrorComponent"

const Exchanges = () => {

  const [exchanges, setExchanges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchExchanges = async () => {
      try {
        const { data } = await axios.get(`${server}/exchanges`)
        setExchanges(data)
        setLoading(false)
      } catch (error) {
        setError(true)
        setLoading(false)
      }
    }
    fetchExchanges()
  }, []);

  if (error) {
    return (
      <ErrorComponent message={"Error while feching exchanges"} />
    )
  }

  return (
    <Container maxW={"container.xl"}>
      {loading ? (<Loader />) : (
        <>
          <HStack wrap={"wrap"} justifyContent={"space-evenly"}>
            {exchanges.map((item) => {
              return (<ExchangeCard
                key={item.id}
                name={item.name}
                img={item.image}
                rank={item.trust_score_rank}
                url={item.url} />)
            })}
          </HStack>
        </>
      )}
    </Container>
  )
}

export default Exchanges
