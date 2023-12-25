import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { styled } from '@mui/system';

import { CardActions } from '@mui/material';

const cardStyle = {
  maxWidth: 345,
};

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  p: 2,
};

const ModalContent = styled('div')(modalStyle);

const PokemonCard = ({ name, image, types, data }) => {
  const [open, setOpen] = useState(false);
  const [pokeData, setPokeData] = useState([]);
  const [loading, setLoading] = useState(true);

  // const handleOpen = () => setOpen(true);
  // const handleClose = () => setOpen(false);

  let handleopen= ()=>{
 
  }
  const typeHandle = () => {
    return types[1] ? `${types[0].type.name} ${types[1].type.name}` : types[0].type.name;
  };

  const fetchPokemonData = async () => {
    try {
      setLoading(true);
      const res = await axios.get("https://pokeapi.co/api/v2/pokemon/");
      setPokeData(res.data.results);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching Pokemon data:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPokemonData();
  }, []);

  return (
    <>
      <Card sx={cardStyle} onClick={handleopen} style={{cursor:"pointer", bgcolor:"gray"}}>
        <CardMedia component="img" height="240" image={image} alt={name} />
        <CardContent>
          <Box display="flex" justifyContent="space-between">
            <Typography gutterBottom variant="h6" component="div">
              {name}
            </Typography>
            <Typography gutterBottom variant="h6" component="div">
              {typeHandle()}
            </Typography>
          </Box>
        </CardContent>
        <CardActions>
          <Button onClick={handleopen}  size="small" color="primary">
            More Details
          </Button>
        </CardActions>
      </Card>

    </>
  );
};

export default PokemonCard;
