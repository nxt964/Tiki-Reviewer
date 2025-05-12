// General
import Home from "./Home";

// Authentication
import Signin from "./Authentication/Signin";
import SignUp from "./Authentication/Signup";

// User UI
import Account from "./Account";
import History from "./History"
import Analyzation from "./Analyzation"


// Export for use
const routes = [
    { path: '/', component: Home },

    { path: '/signin', component: Signin },
    { path: '/signup', component: SignUp },

    { path: '/account', component: Account },
    { path: '/history', component: History },
    { path: '/analyze', component: Analyzation },
]

export default routes