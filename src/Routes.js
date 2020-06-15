import React, {Suspense, lazy} from 'react';
import {useSelector} from 'react-redux';
import {Route, Switch, Redirect} from 'react-router-dom';
import {toast} from 'react-toastify';

import Loader from './components/Loader/Loader'

const Login = lazy(()=>import('./containers/Login/Login'));
const Signup = lazy(()=>import('./containers/Signup/Signup'));
const TournamentList = lazy(()=>import('./containers/Tournament/TournamentList/TournamentList'));
const TournamentDetail = lazy(()=>import('./containers/Tournament/TournamentDetail/TournamentDetail'));
const Account = lazy(()=>import('./containers/Account/Account'));
const MyTournamentEditOrCreate = lazy(()=>import('./containers/MyTournament/MyTournamentEditOrCreate/MyTournamentEditorCreate'));
const MyTournamentList = lazy(()=>import('./containers/MyTournament/MyTournamentList/MyTournamentList'));
const MyParticipation = lazy(()=>import('./containers/MyTournament/MyParticipation/MyParticipation'));
const Search = lazy(()=>import('./containers/Search/Search'));
const UserDetails = lazy(()=>import('./containers/UserDetails/UserDetails'));
const ChangePassword = lazy(()=>import('./containers/Account/ChangePassword/ChangePassword'));
const ForgotPassword = lazy(()=>import('./containers/ForgotPassword/ForgotPassword'));
const TC = lazy(()=>import('./components/T&C/T&C'));
const PrivacyPolicy = lazy(()=>import('./components/PrivacyPolicy/PrivacyPolicy'));
const AboutUs = lazy(()=>import('./components/AboutUs/AboutUs'));
const ContactUs = lazy(()=>import('./components/ContactUs/ContactUs'));
const Home = lazy(()=>import('./containers/Home/Home'));
const NotFound = lazy(()=>import('./components/NotFound/NotFound'))
const Invite = lazy(()=>import('./containers/Invitation/Invitation'))

const FilteredRoutes = (props) =>{
    const isAuthenticated = useSelector(state=>state.auth.isAuthenticated);
    const forAuthenticatedUser = ['/account','/mytournament','/myparticipation','/change-password','/mytournament/create','/mytournament/edit/:id','/invite']
    if(!isAuthenticated) {
        if(forAuthenticatedUser.includes(props.path)) {
            toast.info('To access this page you need to login')
            return <Redirect to='/login' />
        }
    }
    return <Route {...props}/>
}

function baseRoutes() {
    return  (
    <Suspense fallback={<Loader/>}>
     <Switch>
        <Route exact path='/' component={Home}/>
        <Route exact path='/login' component={Login}/>
        <FilteredRoutes exact path='/signup' component={Signup}/>
        <FilteredRoutes exact path='/account' component={Account}/>
        <FilteredRoutes exact path='/search' component={Search}/>
        <FilteredRoutes exact path='/invite' component={Invite}/>
        <FilteredRoutes exact path='/forgot-password' component={ForgotPassword}/>
        <FilteredRoutes exact path='/change-password' component={ChangePassword}/>
        <FilteredRoutes exact path='/user/:id' component={UserDetails}/>
        <FilteredRoutes exact path='/tournament' component={TournamentList}/>
        <FilteredRoutes exact path='/tournament/:id' component={TournamentDetail}/>
        <FilteredRoutes exact path='/mytournament' component={MyTournamentList}/>
        <FilteredRoutes exact path='/myparticipation' component={MyParticipation}/>
        <FilteredRoutes exact path='/mytournament/create' component={MyTournamentEditOrCreate}/>
        <FilteredRoutes exact path='/mytournament/edit/:id' component={MyTournamentEditOrCreate}/>
        <Route exact path='/tnc' component={TC}/>
        <Route exact path='/privacy-policy' component={PrivacyPolicy}/>
        <Route exact path='/about' component={AboutUs}/>
        <Route exact path='/contact' component={ContactUs}/>
        <Route component={NotFound} />
    </Switch>
    </Suspense>)
}

export default baseRoutes;