import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import {NavLink} from 'react-router-dom';

import {getLocalTime }from '../../../../Utils/TimeUtils';

const columns = [
  { id: 'name', label: 'NAME', minWidth: 100 },
  { id: 'username', label: 'USERNAME', minWidth: 100 },
  {id: 'joined',label: 'JOINED',  minWidth: 100, align: 'right',}
];

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 650,
  },
});

export default function StickyHeadTable({participants, participantHandler, total}) { 
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    participantHandler(Number(newPage)+1, rowsPerPage);
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="a dense table">
          <TableHead>
            <TableRow >
              {columns.map(column => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth, zIndex:"0" }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {participants && participants.map(row => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                      <TableCell>
                        <NavLink to={`/user/${row.user.id}`}>{row.user.username}</NavLink></TableCell>
                      <TableCell>
                        <NavLink to={`/user/${row.user.id}`}>{row.user.name}</NavLink></TableCell>
                      <TableCell>
                        {getLocalTime(row.created_at)}
                      </TableCell>
                </TableRow>
                
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        labelRowsPerPage={''}
        rowsPerPageOptions={[10, 25, 50, 100]}
        component="div"
        count={total||0}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
