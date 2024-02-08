import React from 'react';
import { Card, CardActions, CardContent, CardHeader, CardMedia, Grid, IconButton, styled } from '@mui/material';
import { Link } from 'react-router-dom';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import imageNotAvailable from '../../../assets/images/image_not_available.png';
import { apiURL } from '../../../constants';

const ImageCardMedia = styled(CardMedia)({
  height: 0,
  paddingTop: '56.25%', // 16:9
});

interface Props {
  title: string;
  price: number;
  id: string;
  image: string | null;
}

const ProductItem: React.FC<Props> = ({title, price, id, image}) => {
  let cardImage = imageNotAvailable;

  if (image) {
    cardImage = apiURL + '/' + image;
  }

  return (
    <Grid item sm md={6} lg={4}>
      <Card sx={{height: '100%'}}>
        <CardHeader title={title}/>
        <ImageCardMedia image={cardImage} title={title}/>
        <CardContent>
          <strong>{price} KGS</strong>
        </CardContent>
        <CardActions>
          <IconButton component={Link} to={'/products/' + id}>
            <ArrowForwardIcon/>
          </IconButton>
        </CardActions>
      </Card>
    </Grid>
  )
};

export default ProductItem;