import { HashRouter as Router, Route, Switch } from 'react-router-dom'

import CartPage from './containers/CartPage'
import ShowErrors from './containers/ShowErrors'
import ItemsGroupsPage from './containers/ItemsGroupsPage'
import ItemsPage from './containers/ItemsPage'
import CheckoutPage from './containers/CheckoutPage'
import Menu from './containers/Menu'
import ItemPage from './ui/ItemPage'
import WelcomePage from './ui/WelcomePage'
import About from './ui/AboutPage'
import Terms from './ui/TermsPage'
import Contacts from './ui/ContactsPage'
import OrderConfirmationPage from './ui/OrderConfirmationPage'

export const App = () =>
    <div className="App">
        <ShowErrors />
        <Menu />
        <Switch> 
            <Route exact path='/' component={WelcomePage} />
            <Route exact path='/about' component={About} />
            <Route exact path='/terms' component={Terms} />
            <Route exact path='/contacts' component={Contacts} />
            <Route exact path='/cart' component={CartPage} />
            <Route exact path='/checkout' component={CheckoutPage} />
            <Route exact path='/confirmation' component={OrderConfirmationPage} />
            <Route exact path='/items' component={ItemsGroupsPage} />
            <Route path='/:group' component={ItemsPageContainer} />
            <Route path="/*" component={Whoops404} />
        </Switch>
    </div>

const Whoops404 = ({ location }) =>
    <div className="whoops-404">
        <h1>Whoops, route not found</h1>
        <p>Cannot find content for {location.pathname}</p>
    </div>

const ItemsPageContainer = () => 
    <Switch>
        <Route exact path='/:group' component={ItemsPage} /> 
        <Route path='/:group/:id' component={ItemsPage} />
    </Switch>