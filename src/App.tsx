import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { FirebaseProvider } from './providers/FirebaseProvider';
import { AuthProvider } from './providers/AuthProvider';
import Home from './pages/Home';
import Login from './pages/auth/Login';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import Register from './pages/auth/Register';
import PrivateRoute from './HOCs/PrivateRoute';
import Chat from './pages/chat/Chat';
import AuthRoute from './HOCs/AuthRoute';
import ErrorBoundary from './errors/ErrorBoundry';


setupIonicReact();

const App: React.FC = () => (
  <ErrorBoundary>
  <FirebaseProvider>
      <IonApp>
        <IonReactRouter>
          <IonRouterOutlet>
            <Route>
              <Redirect to={{ pathname: "/login" }} />
            </Route>
            <AuthRoute exact path="/login" component={Login} to="/chat"/>
            <AuthRoute exact path="/register" component={Register} to="/chat"/>
            <PrivateRoute exact path="/chat" component={Chat}/>
          </IonRouterOutlet>
        </IonReactRouter>
      </IonApp>
  </FirebaseProvider>
  </ErrorBoundary>
);

export default App;
