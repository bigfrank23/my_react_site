/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
import { Pagination, PaginationItem } from '@mui/lab';
import { Link } from 'react-router-dom';

// import { getPosts } from '../actions/posts';
// import useStyles from './styles';
import axios from 'axios';

const Paginate = ({ page }) => {
//   const { numberOfPages } = useSelector((state) => state.posts);
   const numberOfPages  = 10
//   const dispatch = useDispatch();

//   const classes = useStyles();

  useEffect(() => {
    if (page) {
    //   dispatch(getPosts(page));
      const fetchPosts = async () => {
        await axios.get(
          `http://localhost:5000/api/posts/`
        );
      };
      fetchPosts();
    }
  }, [ page]);

  return (
    <Pagination
    //   classes={{ ul: classes.ul }}
      count={numberOfPages}
      page={Number(page) || 1}
      variant="outlined"
      color="primary"
      renderItem={(item) => (
        <PaginationItem {...item} component={Link} to={`/posts?page=${item.page}`} />
      )}
    />
  );
};

export default Paginate;