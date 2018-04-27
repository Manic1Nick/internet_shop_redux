import { PageHeader } from 'react-bootstrap'
import ItemsGroupsPage from '../containers/ItemsGroupsPage'

import '../../styles/WelcomePage.less'

const WelcomePage = ({ history }) =>
    <div className='WelcomePage'>
        <PageHeader>
            Welcome to our shop!
            <p><small>please select group items below</small></p>            
        </PageHeader>
        
        <ItemsGroupsPage history={ history } />
    </div>

export default WelcomePage