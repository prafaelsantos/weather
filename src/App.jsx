import React, { useState } from 'react';

import { Box } from '@mui/material';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Input from '@mui/material/Input';
import InputAdornment from '@mui/material/InputAdornment';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import CircularProgress from '@mui/material/CircularProgress';

import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import SearchIcon from '@mui/icons-material/Search';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

import format from 'date-fns/format';
import addDays from 'date-fns/addDays'
import locale from 'date-fns/esm/locale/pt-BR'

import MySearchIcon from './components/MySearchIcon';
import IconStatus from './components/IconStatus';
import MyButton from './components/MyButton';

const borderRadius = '1rem';

const CssTextField = styled(Input)({
  padding: '1rem',
  height: '56px',
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: 'none',
      border: 'none',
    },
  },
});

function App() {

  const [city, setCity] = useState('');
  const [daysOfWeek, setDaysOfWeek] = useState([]);
  const [cityToSearch, setCityToSearch] = useState('');
  const [haveData, setHaveData] = useState(false);
  const [myData, setMyData] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [currentDay, setCurrentDay] = useState(0);
  const [isSearching, setIsSearching] = useState(false);

  const handleInfoDay = (pos) => {
    //Pegando um novo dia para exibir
    setCurrentDay(pos);
    setCurrentPage(0);
  }

  const handleToGetDaysOfWeek = (date) => {
    //Primeira data da semana
    const firstDOW = new Date(date);

    let week = []
    let temp;
    //Pegando as legendas dos dias da semana [Dom, Seg, Ter, Qua, Qui, Sex, Sab]
    for (let index = 0; index < 5; index++) {
      temp = format(addDays(firstDOW, index), 'EEEEEE', { locale })
      week.push(temp);
    }

    setDaysOfWeek(week);

  }

  const handleToFormatData = (dataToFormat) => {
    //Separando a primeira data da semana
    const firstDate = dataToFormat.list[0].dt_txt;

    setCity(dataToFormat.city.name);

    let formattedData = [];

    //Criando um array para filtrar os dados
    for (let index = 0; index < 5; index++) {
      formattedData.push(
        {
          'date': addDays(new Date(dataToFormat.list[0].dt_txt), index),
          'data': [],
          'icon': '',
        }
      )
    }

    let dateOne, dateTwo;

    //Separando as previsões por dia (Uma previsão a cada 3 horas)
    for (let index = 0; index < 5; index++) {
      dateTwo = format(new Date(formattedData[index].date), 'yyyy-MM-dd');
      for (let j = 0; j < dataToFormat.list.length; j++) {

        dateOne = format(new Date(dataToFormat.list[j].dt_txt), 'yyyy-MM-dd');

        if (dateOne === dateTwo) {
          formattedData[index].data.push(dataToFormat.list[j]);
        }
      }
    }

    //Formatando as datas e temperaturas
    for (let index = 0; index < dataToFormat.list.length; index++) {
      dataToFormat.list[index].dt_txt = format(new Date(dataToFormat.list[index].dt_txt), "dd/MM/yyyy 'às' HH:mm");
      dataToFormat.list[index].main.temp = parseInt(dataToFormat.list[index].main.temp, 10);
      dataToFormat.list[index].main.temp_min = parseInt(dataToFormat.list[index].main.temp_min, 10);
      dataToFormat.list[index].main.temp_max = parseInt(dataToFormat.list[index].main.temp_max, 10);
    }

    //##### Pegando um icon de cada dia para exibir no 'menu'
    //Separando o primeiro icon porque o primero dia nem sempre tem a mesma quantidade de previsões
    formattedData[0].icon = formattedData[0].data[0].weather[0].icon;
    let temp, min, max;

    for (let index = 1; index < 5; index++) {
      //Criando um número aleatório entre 0 e 7 para usar como posição do array de previsões do dia
      min = Math.ceil(0);
      max = Math.floor(7);
      temp = Math.floor(Math.random() * (max - min + 1)) + min;

      //Pegando um icon aleatório entre as 8 previsões do dia
      formattedData[index].icon = formattedData[index].data[temp].weather[0].icon;
    }

    setMyData(formattedData);
    handleToGetDaysOfWeek(firstDate);
    setHaveData(true);
  }

  const handleToWeatherTemp = async () => {

    setIsSearching(true);

    try {

      if (cityToSearch === '') {
        return
      }
      //Api key Open Weather
      const myKey = import.meta.env.VITE_OPEN_WEATHER_API_KEY;

      await fetch('https://api.openweathermap.org/data/2.5/forecast?' + new URLSearchParams({
        q: cityToSearch,
        lang: 'pt_br',
        appid: `${myKey}`,
        units: 'metric'
      }))
        .then((resp) => resp.json())
        .then(function (data) {

          handleToFormatData(data);
          setCityToSearch('');
          setIsSearching(false);

        })
        .catch(function (error) {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }

  }

  const handleToPrev = () => {
    setCurrentPage(currentPage - 1);
  }

  const handleToNext = () => {
    setCurrentPage(currentPage + 1);
  }

  return (
    <React.Fragment>
      <Container maxWidth="sm">
        <Box sx={{
          height: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}>

          <Box
            component={'form'}
            sx={{
              width: 320,
              height: 506,
              backgroundColor: '#ECEFF0',
              borderRadius: borderRadius,
              position: 'relative',
              minWidth: 320
            }}
          >
            <Typography component={'div'} sx={{ flexDirection: 'row' }}>
              <CssTextField
                id="filled-basic"
                placeholder='Pesquisar cidade'
                fullWidth
                value={cityToSearch}
                onChange={(e) => setCityToSearch(e.target.value)}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleToWeatherTemp}
                      edge="end"
                      sx={{ width: '3rem', height: '3rem' }}
                    >
                      <SearchIcon />
                    </IconButton>
                  </InputAdornment>
                }
              />
            </Typography>
            {
              !haveData ? <MySearchIcon /> :
                <Box
                  sx={{
                    width: 320,
                    height: 450,
                    backgroundColor: '#FFF',
                    borderRadius: borderRadius,
                    borderTopLeftRadius: 0,
                    borderTopRightRadius: 0,
                    position: 'absolute',
                    bottom: 0,
                  }}
                >
                  <Box
                    sx={{
                      width: 300,
                      height: 380,
                      margin: '0 auto',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                    }}
                  >
                    {
                      isSearching ? (
                        <Typography
                          component="div"
                          sx={{
                            position: 'absolute',
                            width: '100%',
                            justifyContent: 'center',
                            alignItems: 'center',
                            height: '400px',
                            display: 'flex'
                          }}
                        >
                          <CircularProgress />
                        </Typography>
                      ) : (
                        <>
                          <Typography
                            component='h1'
                            sx={{
                              fontWeight: 100,
                              fontSize: '2rem',
                              textTransform: 'uppercase',
                              marginTop: '1rem',
                              color: '#3E5F6C'
                            }}
                          >
                            {city}
                          </Typography>

                          <Typography component='h2'>{myData[currentDay].data[currentPage].dt_txt}</Typography>

                          <IconStatus status={myData[currentDay].data[currentPage].weather[0].icon} sx={{ fontSize: '7rem', margin: '1rem' }} />

                          <Typography component='h2' sx={{ color: '#3E5F6C', textTransform: 'capitalize' }}>{myData[currentDay].data[currentPage].weather[0].description} </Typography>

                          <Stack direction="row" spacing={2}>
                            <Typography
                              component='h2'
                              sx={{
                                fontWeight: 100,
                                fontSize: '5rem',
                                textTransform: 'uppercase',
                                color: '#3E5F6C'
                              }}
                            >
                              {`${myData[currentDay].data[currentPage].main.temp}°`}
                            </Typography>

                            <Typography component='div' sx={{ alignSelf: 'center' }}>
                              <ArrowDownwardIcon sx={{ color: '#6699FF' }} />
                              <Typography component='h2' sx={{ color: '#3E5F6C' }}>{myData[currentDay].data[currentPage].main.temp_min} </Typography>
                            </Typography>

                            <Typography component='div' sx={{ alignSelf: 'center', }}>
                              <ArrowUpwardIcon sx={{ color: '#FF9933' }} />
                              <Typography component='h2' sx={{ color: '#3E5F6C' }}>{myData[currentDay].data[currentPage].main.temp_max}</Typography>
                            </Typography>
                          </Stack>

                          <Typography
                            component="div"
                            sx={{
                              position: 'absolute',
                              width: '100%',
                              justifyContent: 'space-between',
                              alignItems: 'center',
                              height: '400px',
                              display: 'flex'
                            }}
                          >
                            {
                              haveData && (
                                <>
                                  <IconButton onClick={handleToPrev} disabled={currentPage <= 0}
                                    sx={{
                                      height: '50px',
                                      width: '50px',
                                    }}
                                  >
                                    <ArrowBackIosIcon />
                                  </IconButton>
                                  <IconButton onClick={handleToNext} disabled={currentPage >= (myData[currentDay].data.length - 1)}
                                    sx={{
                                      height: '50px',
                                      width: '50px',
                                    }}
                                  >
                                    <ArrowForwardIosIcon />
                                  </IconButton>
                                </>
                              )
                            }
                          </Typography>
                        </>
                      )
                    }
                  </Box>
                  <Stack
                    direction="row"
                    sx={{
                      bgcolor: '#A0D4FA',
                      justifyContent: 'space-between',
                      height: '4rem',
                      position: 'absolute',
                      bottom: 0,
                      width: '100%',
                      borderBottomLeftRadius: borderRadius,
                      borderBottomRightRadius: borderRadius
                    }}
                  >
                    {
                      daysOfWeek.map((day, index) => {
                        return (
                          <MyButton key={day} day={day} imgIcon={myData[index].icon} onClick={() => handleInfoDay(index)} />
                        )
                      })
                    }
                  </Stack>
                </Box>
            }
          </Box>
        </Box>
      </Container>
    </React.Fragment >
  );
}

export default App;