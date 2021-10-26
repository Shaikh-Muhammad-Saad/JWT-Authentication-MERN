import SignUp_Page from "./components.js/signupPage";
import LogIn_Page from "./components.js/login_Page";
import {Route} from "react-router-dom";


function App() {
  return (
    <>
    <Route  exact path="/" component={SignUp_Page}/>
    <Route path="/login" component={LogIn_Page}/>
    </>
  );
}

export default App;
