import { Box, makeStyles, Typography, Button, Grid } from '@material-ui/core';
import { useEffect } from 'react';
import CartItem from './CartItem.jsx'
import { useSelector, useDispatch } from 'react-redux';
import { addToCart,removeFromCart } from '../../redux/actions/cartActions';
import TotalView from './TotalView.jsx';
import EmptyCart from './EmptyCart.jsx';
import { payUsingPaytm } from '../../service/api';
import { post } from '../../utils/paytm';

const useStyle = makeStyles(theme => ({
    component: {
        background:'#f2f2f2',
        marginTop: 55,
        padding: '30px 135px',
        display: 'flex',
        [theme.breakpoints.down('sm')]: {
            padding: '15px 0'
        }
    },
    leftComponent: {
        width: '67%',
        paddingRight: 15,
        [theme.breakpoints.down('sm')]: {
            marginBottom: 15
        }
    },
    header: {
        padding: '15px 24px',
        background: '#fff'
    },
    bottom: {
        padding: '16px 22px',
        background: '#fff',
        boxShadow: '0 -2px 10px 0 rgb(0 0 0 / 10%)',
        borderTop: '1px solid #f0f0f0'
    },
    placeOrder: {
        display: 'flex',
        marginLeft: 'auto',
        background: '#fb641b',
        color: '#fff',
        borderRadius: 2,
        width: 250,
        height: 51
    }
}));

const Cart =() =>{
    const classes = useStyle();

    const cartDetails = useSelector(state => state.cart);
    const { cartItems } = cartDetails;

    const dispatch = useDispatch();
    useEffect(() => {
        console.log(cartItems);
    }, [dispatch]);

    const buyNow = async () => {
        let response = await payUsingPaytm({ amount: 500, email: 'shikhar199641@mail.com'});
        var information = {
            action: 'https://securegw-stage.paytm.in/order/process',
            params: response    
        }
        post(information);
    }

    const removeItemFromCart = (id) => {
        dispatch(removeFromCart(id));
    }
    return (
        <>
        { cartItems.length ? 
            <Box className={classes.component}>
                <Box className={classes.leftComponent}>
                    <Box className={classes.header}>
                        <Typography style={{fontWeight: 600, fontSize: 18}}>My Cart ({cartItems?.length})</Typography>
                    </Box>
                        {   cartItems.map(item => (
                                <CartItem item={item} removeItemFromCart={removeItemFromCart}/>
                            ))
                        }
                    <Box className={classes.bottom}>
                        <Button onClick={() => buyNow()}  variant="contained" className={classes.placeOrder}>Place Order</Button>
                    </Box>
                </Box>
                <Box >
                    <TotalView cartItems={cartItems} />
                </Box>
            </Box> : <EmptyCart />
        }
        </>
    );
}

export default Cart;