import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Login from '../App';
import Dashboard from '../Pages/Dashboard'
import CardVisit from '../Pages/Profile'
import Navbar from '../Pages/Login&Sign/Components/Navbar/Navbar.js'
import Flow from '../Pages/Flow'
import {ProtectedRoute} from '../auth/protected.route.js'
import ForgotPassword from '../Pages/Login&Sign/forgotPassword'
import Dash from "../Pages/Dashboard/dash";
function Root(){

    return(
        <Router>
          
          <Switch>
          <Route path="/forgot-password">
              <ForgotPassword type="mail" />
            </Route>
            <Route path="/resetpassword">
              <ForgotPassword />
            </Route>
            <Route  path="/login" exact>
              <Login />
  
            </Route> 
            <ProtectedRoute  path="/" >
              <Dash/>
            </ProtectedRoute> 
            
            <ProtectedRoute path="/profile">
              <div className="h-screen w-full flex flex-col justify-between">
                <div className="h-1/4">
                  <Navbar text="Akış" to="/flow"/>
                </div>
                <div className="h-3/4">
                <CardVisit/>
                </div>

              </div>
              
            </ProtectedRoute>
            <ProtectedRoute path="/flow">
                <Flow/>
            </ProtectedRoute>

            <Route path="/guest">

            </Route>

          </Switch>
        </Router>  

    );
}


export default Root;