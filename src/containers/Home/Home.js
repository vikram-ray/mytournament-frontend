import React from 'react';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Copyright from '../../components/Copyright/Copyright';
import {NavLink} from 'react-router-dom';
import SportsEsportsIcon from '@material-ui/icons/SportsEsports';

import {Quotes} from './Quotes';

import Pubg1 from '../../assets/cover/pubg1.jpg';
import Pubg2 from '../../assets/cover/pubg2.jpg';
import Cod1 from '../../assets/cover/cod1.jpg';
import Cod2 from '../../assets/cover/cod2.jpg';
import Mini1 from '../../assets/cover/mini1.jpg';

const useStyles = makeStyles(theme => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(4, 0, 3),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
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
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
}));

const games = [
  {game:'PUBG',image:[Pubg1, Pubg2],description:``},
  {game:'Call of Duty Mobile',image:[Cod1, Cod2],description:`(upcoming)`},
  {game:'Mini Militia',image:[Mini1],description:`(upcoming)`},
];

export default function Album() {
  const classes = useStyles();

  return (
    <React.Fragment>
      <CssBaseline />
      <main>
        {/* Hero unit */}
        <div className={classes.heroContent}>
          <Container maxWidth="sm">
            <Typography component="h1" variant="h3" align="center" color="textPrimary" gutterBottom>
              MyTournament
            </Typography>
            <Typography variant="h5" align="center" color="textSecondary" paragraph>
              {Quotes[Math.floor(Math.random()*Quotes.length)]}
            </Typography>
            <div className={classes.heroButtons}>
              <Grid container spacing={2} justify="center">
                <Grid item>
                <NavLink to='/tournament' >
                  <Button variant="contained" color="primary">
                    Participate
                  </Button>
                  </NavLink>
                </Grid>
                <Grid item>
                  <NavLink to='/mytournament/create' >
                  <Button variant="outlined" color="primary">
                    Organize
                  </Button>
                  </NavLink>
                </Grid>
              </Grid>
            </div>
          </Container>
        </div>
        <Container className={classes.cardGrid} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
            {games.map((game,index) => (
              <Grid item key={index} xs={12} sm={6} md={4}>
              <NavLink to='/tournament'>
                <Card className={classes.card}>
                  <CardMedia
                    className={classes.cardMedia}
                    image={game.image[Math.floor(Math.random()*game.image.length)]}
                    title={game.name}
                  />
                  <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" component="h2">
                      {game.game}
                    </Typography>
                    <Typography>
                      {game.description}
                    </Typography>
                  </CardContent>
                  {/* <CardActions>
                    <Button size="small" color="primary">
                      View
                    </Button>
                    <Button size="small" color="primary">
                      Edit
                    </Button>
                  </CardActions> */}
                </Card>
                </NavLink>
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
      {/* Footer */}
      <footer className={classes.footer}>
        <Typography variant="h6" align="center" gutterBottom>
          <SportsEsportsIcon />
        </Typography>
        <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
          By using MyTournament you agree to our <NavLink to='/tnc'>t&c</NavLink>.
          Please read <NavLink to='/privacy-policy'>privacy policy</NavLink>.
        </Typography>
        <Copyright />
      </footer>
      {/* End footer */}
    </React.Fragment>
  );
}
