
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Container } from '@mui/system';
import Pokemoncard from '../Component/Pokemoncard';
import Searchnav from '../Component/Searchnav';
import { Button, Grid } from '@mui/material';
import Modeldetail from '../Component/Modeldetail';

import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

export default function Home() {
  const [pokemons, setPokemons] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  useEffect(() => {
    getPokemon();
  }, [currentPage]);

  const getPokemon = () => {
    const offset = (currentPage - 1) * itemsPerPage;
    const endpoints = [];

    for (let i = 1 + offset; i <= currentPage * itemsPerPage; i++) {
      endpoints.push(`https://pokeapi.co/api/v2/pokemon/${i}/`);
    }

    axios
      .all(endpoints.map((endpoint) => axios.get(endpoint)))
      .then((res) => setPokemons(res))
      .catch((error) => console.log(error));
  };

  const handlePageChange = (event, value) => {
    // If "Prev" button is clicked
    if (value === 'prev') {
      setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
    }
    // If "Next" button is clicked
    else if (value === 'next') {
      setCurrentPage((prevPage) => prevPage + 1);
    }
    // If a page number is clicked
    else {
      setCurrentPage(value);
    }
  };

  const pokemonfilter = (name) => {
    let filteredpokemon = [];

    if (name === '') {
      getPokemon();
    }

    for (let i in pokemons) {
      if (pokemons[i].data.name.includes(name)) {
        filteredpokemon.push(pokemons[i]);
      }
    }

    setPokemons(filteredpokemon);
  };

    const [pokeDex,setPokeDex]=useState();

    
  return (
    <>
      <Searchnav pokemonfilter={pokemonfilter} />

      <Container maxWidth="xg">
        <Grid container spacing={2}>
          {pokemons.length === 0 ? (
            <Modeldetail />
          ) : (
            pokemons.map((pokemon, key) => (
              <Grid key={key} item xs={12} md={4} sm={5} lg={3}>
                <Pokemoncard
                  name={pokemon.data.name}
                  image={pokemon.data.sprites.front_default}
                  types={pokemon.data.types}
                />
              </Grid>
            ))
          )}
        </Grid>
         
          <Button spacing={2} style={{ marginTop: '20px' }} variant="contained" onClick={() => handlePageChange(null, 'prev')}>
            Prev
          </Button>
          <Button spacing={2} style={{ justifyContent: 'center', marginTop: '20px' }} variant="contained" disabled>
            <Pagination
              count={Math.ceil(200 / itemsPerPage)}
              page={currentPage}
              onChange={handlePageChange}
              color="primary"
            />
          </Button>
          <Button  variant="contained" spacing={2} style={{ justifyContent: 'center', marginTop: '20px' }} onClick={() => handlePageChange(null, 'next')}>
            Next
          </Button>
          
      </Container>
    </>
  );
}
