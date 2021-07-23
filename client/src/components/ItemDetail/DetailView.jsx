import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Typography, makeStyles,  Table, TableBody, TableRow, TableCell,Button } from '@material-ui/core';
import { getProductDetails } from '../../redux/actions/productActions';
import clsx from 'clsx';
import ActionItem from './ActionItem.jsx';
import ProductDetail from './ProductDetail.jsx';

const useStyles = makeStyles(theme => ({
    component: {
        marginTop: 55,
        background: '#F2F2F2',
        marginLeft: 80,
        marginRight: 80,
    },
    container: {
        background: '#FFFFFF',
        // margin: '0 80px',
        display: 'flex',
        
    },
    rightContainer: {
        marginTop: 50,
        '& > *': {
            marginTop: 10
        }
    },
    price: {
        fontSize: 28
    },
    smallText: {
        fontSize: 14,
    },
    greyTextColor: {
        color: '#878787'
    }
}));


const DetailView=({match})=>{
    const classes = useStyles();
    const fassured = 'https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/fa_62673a.png'
    const adURL = 'https://rukminim1.flixcart.com/lockin/774/185/images/CCO__PP_2019-07-14.png?q=50';
    const date = new Date(new Date().getTime()+(5*24*60*60*1000));

    const { product } = useSelector(state => state.getProductDetails);

    const dispatch = useDispatch();
    
    useEffect(() => {  
            dispatch(getProductDetails(match.params.id));
    }, [dispatch]);


    return (
        <Box className={classes.component}>
            { product && Object.keys(product).length &&
                <Box className={classes.container}> 
                    <ActionItem product={product}/>
                    <Box className={classes.rightContainer}>
                        <Typography>{product.title.longTitle}</Typography>
                        <Typography className={clsx(classes.greyTextColor, classes.smallText)} style={{marginTop: 5}}>
                            8 Ratings & 1 Reviews
                            <span><img src={fassured} style={{width: 77, marginLeft: 20}} /></span>
                        </Typography>
                        <Typography>
                            <span className={classes.price}>₹{product.price.cost}</span>&nbsp;&nbsp;&nbsp; 
                            <span className={classes.greyTextColor}><strike>₹{product.price.mrp}</strike></span>&nbsp;&nbsp;&nbsp;
                            <span style={{color: '#388E3C'}}>{product.price.discount} off</span>
                        </Typography>
                        <ProductDetail product={product} />
                    </Box>
                </Box>
            }   
        </Box>
    )
}

export default DetailView;