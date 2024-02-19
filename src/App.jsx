import './App.scss';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useState } from 'react';
import { Box, ThemeProvider, Container } from '@mui/material';
import LocationPage from './components/locationPage/LocationPage';
import AddLocation from './components/addLocation/AddLocation';
import MainHeader from './components/mainHeader/MainHeader';
import LocationsPage from './components/locationsPage/LocationsPage';
import { theme } from './theme/theme'

function App() {
  const [state, setState] = useState([])
  return (
    <Router>
      <ThemeProvider theme={theme}>
        <Box display={'flex'}>
          <MainHeader></MainHeader>
          <Container sx={{ mt: 10, mb: 2 }} >
            <Routes>
              <Route exact path="/" element={<LocationsPage locations={state} setState={setState} title={'Locations overview'} type={'home'} />} />
              <Route path="/favorite" element={<LocationsPage locations={state} setState={setState} title={'Favorite locations'} type={'favorite'} />} />
              <Route path="/add" element={<AddLocation setState={setState} />} />
              {state.map((item, i) => {
                return (<Route path={`/${item.location.name}`} element={<LocationPage info={item} key={i} />} />)
              })}
            </Routes>
          </Container>
        </Box>
      </ThemeProvider >
    </Router>
  );
}

export default App;
