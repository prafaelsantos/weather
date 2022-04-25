import React from 'react';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';

const Item = styled(Button)(({ }) => ({
    backgroundColor: 'transparent',
    flexDirection: 'column',
    justifyContent: 'space-between',
    boxShadow: 'none',
    borderRadius: 0,
    color: '#3E5F6C',
    textAlign: 'center',
    width: 'calc(100% / 5)',
    height: '4rem',
    alignSelf: 'center',
    '&:hover': {
        backgroundColor: '#0F84B0',
        borderRadius: 0,
        color: '#FFF'
    },
    '&:focus': {
        backgroundColor: '#0F84B0',
    },
    '&:first-of-type': {
        borderBottomLeftRadius: '1rem'
    },
    '&:last-child': {
        borderBottomRightRadius: '1rem'
    }

}));

export default function MyButton({ day, imgIcon, onClick }) {
    return (
        <React.Fragment>
            <Item onClick={onClick}>
                <Typography variant='h6' sx={{ fontSize: 12 }}>
                    {typeof day !== 'undefined' && day}
                </Typography>
                <Typography variant='h3'>
                    {<img src={`https://openweathermap.org/img/wn/${imgIcon}.png`} alt="" style={{ marginTop: '-1rem' }} />}
                </Typography>
            </Item>
        </React.Fragment>
    )
} 