
import Typography from '@mui/material/Typography';

import svgSearchIcon from '../../images/undraw_the_search_s0xf.svg';

export default function MySearchIcon() {
    return (
        <Typography
            component="div"
            sx={{
                width: '100%',
                justifyContent: 'center',
                alignContent: 'center',
                display: 'flex',
                height: '450px'
            }}
        >
            <img src={svgSearchIcon} alt="teste" style={{ width: '70%' }} />
        </Typography>
    )
}