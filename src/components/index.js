import { HashRouter as Router, Route, Switch } from 'react-router-dom'

import CartPage from './containers/CartPage'
import ShowErrors from './containers/ShowErrors'
import ItemsPage from './containers/ItemsPage'
import CheckoutPage from './containers/CheckoutPage'
import Menu from './containers/Menu'
import About from './ui/AboutPage'
import Terms from './ui/TermsPage'
import Contacts from './ui/ContactsPage'
import OrderConfirmationPage from './ui/OrderConfirmationPage'

export const App = () =>
    <div className="app">
        <ShowErrors />
        <Menu />
        <Switch> 
            <Route exact path='/about' component={About} />
            <Route exact path='/' component={About} />
            <Route exact path='/terms' component={Terms} />
            <Route exact path='/contacts' component={Contacts} />
            <Route path='/items' component={ItemsPageContainer} />
            <Route exact path='/cart' component={CartPage} />
            <Route exact path='/checkout' component={CheckoutPage} />
            <Route exact path='/confirmation' component={OrderConfirmationPage} />
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
        <Route exact path='/items' component={ItemsPage} />
        <Route path='/items/:id' component={ItemsPage} />        
    </Switch>