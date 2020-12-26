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
    height: '100%',
    backgroundSize: 'contain',
    '&:hover': {
      cursor: "pointer",
    }
  },
  cardContent: {
    textAlign: 'left',
  },
  cardTitle: {
    fontWeight: 'bold',
    '&:hover': {
      cursor: "pointer",
    }
  }
}));

export default function BookCard ({card}) {
  const classes = useStyles();
  return (
    <Grid item key={card.id} xs={12} sm={6} md={4}>
      <Card className={classes.card}>
        <Grid container>
          <Grid item xs={4}>
            <CardMedia
              className={classes.cardMedia}
              image={card.volumeInfo.imageLinks ? card.volumeInfo.imageLinks.smallThumbnail : ""}
              title="Image title"
              onClick={()=> window.open(card.volumeInfo.infoLink, "_blank")}
            />
          </Grid>
          <Grid item xs={8}>
            <CardContent className={classes.cardContent}>
              <Typography gutterBottom onClick={()=> window.open(card.volumeInfo.infoLink, "_blank")} className={classes.cardTitle}>
                {card.volumeInfo.title.length > 25 ? card.volumeInfo.title.substring(0,25)+'...' : card.volumeInfo.title}
              </Typography>
              <Typography variant="caption" display="block" gutterBottom>
                by : {card.volumeInfo.authors && card.volumeInfo.authors.join(", ")}
              </Typography>
              <Typography variant="caption" display="block" gutterBottom>
                Publisher : {card.volumeInfo.publisher && card.volumeInfo.publisher}
              </Typography>
              <Typography variant="caption" display="block" gutterBottom>
                Published Date : {card.volumeInfo.publishedDate && card.volumeInfo.publishedDate}
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small" color="primary" onClick={()=> window.open(card.volumeInfo.previewLink, "_blank")}>
                Preview
              </Button>
              <Button size="small" color="primary" onClick={()=> window.open(card.volumeInfo.infoLink, "_blank")}>
                More Info
              </Button>
            </CardActions>
          </Grid>
        </Grid>
      </Card>
    </Grid>
  )
}