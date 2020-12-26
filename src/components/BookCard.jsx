import React from "react";
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '76.25%', // 16:9
    width: '100%',
    backgroundSize: 'contain'
  },
  cardContent: {
    flexGrow: 1,
  },
}));

export default function BookCard ({card}) {
  const classes = useStyles();
  return (
    <Grid item key={card.id} xs={12} sm={6} md={4}>
      <Card className={classes.card} onClick={()=> window.open(card.volumeInfo.infoLink, "_blank")}>
        <Grid container spacing={4}>
          <Grid item xs={4}>
            <CardMedia
              className={classes.cardMedia}
              image={card.volumeInfo.imageLinks ? card.volumeInfo.imageLinks.smallThumbnail : ""}
              title="Image title"
            />
          </Grid>
          <Grid item xs={8}>
            <CardContent className={classes.cardContent}>
              <Typography gutterBottom>
                {card.volumeInfo.title.substring(0,20)}
              </Typography>
              <Typography>
                {/* {card.volumeInfo.description} */}
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small" color="primary">
                View
              </Button>
              <Button size="small" color="primary">
                Edit
              </Button>
            </CardActions>
          </Grid>
        </Grid>
      </Card>
    </Grid>
  )
}