import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Copyright from '../Copyright/Copyright'
import Breadcrum from '../Breadcrum/Breadcrum';

const useStyles = makeStyles(theme => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(4, 0, 3),
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

const Quotes = [
  {'by':'Vince Lombardi','text':'Individual commitment to a group effort--that is what makes a team work, a company work, a society work, a civilization work.'},
  {'by':'Michael Jordan','text':'Talent wins games, but teamwork and intelligence win championships.'},
  {'by':'Helen Keller','text':"Alone we can do so little, together we can do so much."}
]

const team = [
  {name:'Vikram Ray ', about:'Full Stack Developer, Bangalore.'},
  {name:'Arjun',about:'Software developer at Wipro, Bangalore.' },
];

export default function Album() {
  const classes = useStyles();
  const quote = Quotes[Math.floor(Math.random()*Quotes.length)]
  return (
    <React.Fragment>
      <Breadcrum first={{text:"Home",to:"/"}} third={{text:"About"}}/>
      <CssBaseline />
      <main>
        {/* Hero unit */}
        <div className={classes.heroContent}>
          <Container maxWidth="sm">
            <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
              MT Team
            </Typography>
            <Typography variant="h5" align="center" color="textSecondary" paragraph>
                {quote.text}
            </Typography>
            <Typography align="right" color="textSecondary" paragraph>
                {quote.by}
            </Typography>
          </Container>
        </div>
        <Container className={classes.cardGrid} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
            {team.map(item => (
              <Grid item key={item.name} xs={12} sm={6} md={4}>
                <Card className={classes.card}>
                  {/* <CardMedia
                    className={classes.cardMedia}
                    image={<InsertEmoticonIcon/>}
                    title={item.name}
                  /> */}
                  <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" component="h2">
                      {item.name}
                    </Typography>
                    <Typography>
                      {item.about}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
      {/* Footer */}
      <footer className={classes.footer}>
        <Copyright />
      </footer>
      {/* End footer */}
    </React.Fragment>
  );
}