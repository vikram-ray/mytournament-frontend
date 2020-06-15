import React from 'react';
import Pagination from "material-ui-flat-pagination";
import Divider from '@material-ui/core/Divider';


export default function CustomPagination(props) {
  return (
      <React.Fragment>
        <Divider />
        <Pagination
            limit={props.limit}
            offset={props.offset}
            total={props.total}
            onClick={(e, offset, pageNo) => props.handleClick(offset, pageNo)}
        />
      </React.Fragment>
  );
}
