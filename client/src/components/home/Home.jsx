import { Box,makeStyles } from '@material-ui/core';
import {useEffect} from 'react';
import Navbar from './Navbar.jsx';
import Banner from './Banner.jsx';
import MidSection from './MidSection.jsx'
import Slide from './Slide.jsx';


import {useSelector,useDispatch} from 'react-redux';

import {getProducts as listProducts} from '../../redux/actions/productActions.js';



const useStyle = makeStyles({
    component: {
        padding: 10,
        background: '#F2F2F2'
    }
})

const Home = () =>
{
    const classes=useStyle();

    const getProducts = useSelector(state => state.getProducts);
    const { products, error } = getProducts;

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(listProducts())
    }, [dispatch])

    return (
        <div>
            <Navbar />
            <Box className={classes.component}>
                <Banner />
                <MidSection />
                <Slide 
                    title='Deals of the Day'
                    timer={true}
                    products={products}
                />
            </Box>
            <Box className={classes.component}>
            <Slide 
                    title='Recommended Items'
                    timer={false}
                    products={products}
                />
            </Box>
            <Box className={classes.component}>
                <Slide 
                    title='BestSellers'
                    timer={false}
                    products={products}
                />
            </Box>
            <Box className={classes.component}>
                <Slide 
                    title='Mobiles and Laptops'
                    timer={false}
                    products={products}
                />
            </Box>
            <Box className={classes.component}>
                <Slide 
                    title='Sports'
                    timer={false}
                    products={products}
                />
            </Box>
        </div>
    )
}



export default Home;