import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
// import CardMedia from '@material-ui/core/CardMedia';
// import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Badge from '@material-ui/core/Badge';
import QueryBuilderIcon from '@material-ui/icons/QueryBuilder';
import { withRouter } from 'react-router-dom';
import Divider from '@material-ui/core/Divider';
import WhatshotIcon from '@material-ui/icons/Whatshot';
import {getLocalTime, isBefore }from '../../containers/Utils/TimeUtils';

import classs from './Card.module.css'

// const useStyles = makeStyles({
//   card: {
//     // maxWidth: 345,
//     // marginBottom:2
//   },
//   media: {
//     height: 120,
//   },
// });

const useStyles = makeStyles(theme => ({
    margin: {
      margin: theme.spacing(2),
    },
    padding: {
      padding: theme.spacing(0, 2),
    },
  }));

function MediaCard(props) {
  const classes = useStyles();  
  let {description, organizer, size, total_participants, game_mode, start, title, id} = props.tournament
  const handleClick = () => {props.history.push('/tournament/'+id)}
  if(description && description.length > 55){
      description = description.substring(0,50) + "..."
  }
  const badgeData = total_participants + '/' + size;
  const tournamentTime = getLocalTime(start);
  const [dateColor, setDateColor] = useState('initial');
  if(dateColor!=='error' &&  isBefore(start)) {
    setDateColor('error');
  }
  return (
    <Card className={classs.Card} onClick={handleClick} >
      <CardActionArea>
        {/* <CardMedia
          className={classes.media}
          image="/static/images/cards/contemplative-reptile.jpg"
          title="Contemplative Reptile"
        /> */}
        <CardContent>
        <Badge className={classes.margin} badgeContent={badgeData} color="primary">
          <Typography gutterBottom variant="h6" component="h2">
            {title}
          </Typography>
          </Badge>
          <Typography variant="body2" color="textSecondary" component="span">
            {/* <Typography className={classes.padding}> {description} </Typography> */}
          </Typography>
        </CardContent>
        <Typography className={classs.Strap}>{game_mode.name}</Typography>
      </CardActionArea>
      <Divider />
      <CardActions className={classs.CardAction} >
        <Typography className={[classs.Organiser, classs.small].join(' ')}> <WhatshotIcon fontSize='small' /> {organizer} </Typography>
        <Typography color={dateColor} className={[classes.padding, classs.Time, classs.small].join(' ')}> <QueryBuilderIcon fontSize='small' /> {tournamentTime} </Typography>
      </CardActions>     
    </Card>
  );
}

export default withRouter(MediaCard);