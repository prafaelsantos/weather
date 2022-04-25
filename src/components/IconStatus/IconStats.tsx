import ThunderstormIcon from '@mui/icons-material/Thunderstorm';
import CloudIcon from '@mui/icons-material/Cloud';
import LightModeIcon from '@mui/icons-material/LightMode';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import BeachAccessIcon from '@mui/icons-material/BeachAccess';
import FilterDramaIcon from '@mui/icons-material/FilterDrama';
import NightsStayIcon from '@mui/icons-material/NightsStay';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import AirIcon from '@mui/icons-material/Air';

const IconStatus = ({ status, sx }) => {
    switch (status) {
        case '11d':
            return <ThunderstormIcon sx={sx} />

        case '10d':
            return <BeachAccessIcon sx={sx} />

        case '02d':
            return <FilterDramaIcon sx={sx} />

        case '02n':
            return <NightsStayIcon sx={sx} />

        case '04d':
            return <CloudIcon sx={sx} />

        case '01d':
            return <LightModeIcon sx={sx} />

        case '01n':
            return <DarkModeIcon sx={sx} />

        case '04n':
            return <CloudIcon sx={sx} />

        case '03d':
            return <FilterDramaIcon sx={sx} />

        case '03n':
            return <FilterDramaIcon sx={sx} />

        case '13d':
            return <AcUnitIcon sx={sx} />

        case '50d':
            return <AirIcon sx={sx} />

        default:
            return <BeachAccessIcon sx={sx} />
    }
}


export default IconStatus;