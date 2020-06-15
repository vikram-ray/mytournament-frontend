import { useDispatch } from 'react-redux';
import  { useEffect} from 'react';

const  useFetching = (someFetchActionCreator) => {
    const dispatch = useDispatch()

    useEffect(() => {
    dispatch(someFetchActionCreator());
  }, [])
}

export default useFetching;