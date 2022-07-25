import { Route, Switch } from "react-router-dom";

import Home from "../pages/Home";
import Product from "../pages/Product";

const Routes = () => {

    return (
        <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/:slug" component={Product} />
        </Switch>
    )
}

export default Routes;