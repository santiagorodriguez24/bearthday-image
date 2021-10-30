import 'config/DayJs/config-dayjs';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './styles/app.scss';
import * as routes from 'routes/routes';

import Home from 'routes/home/Home';
import PhotoGallery from 'routes/photo-gallery/PhotoGallery';
import NotFoundPage from 'routes/not-found/NotFound';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path={routes.ROUTE_HOME} component={Home} />
        <Route
          exact
          path={routes.ROUTE_PHOTO_GALLERY}
          component={PhotoGallery}
        />
         <Route render={(props) => <NotFoundPage {...props} />} /> 
      </Switch>
    </Router>
  );
}

export default App;
