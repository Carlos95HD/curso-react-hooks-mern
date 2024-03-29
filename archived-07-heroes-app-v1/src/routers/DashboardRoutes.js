import React from 'react'
import {
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import { DcScreen } from '../components/dc/DcScreen';
import { HeroScreen } from '../components/heroes/HeroScreen';
import { marvelScreen } from '../components/marvel/MarvelScreen';
import { SearchScreen } from '../components/search/SearchScreen';
import { Navbar } from '../components/ui/NavBar'

export const DashboardRoutes = () => {
  return (
    <>
      <Navbar />

      <div className="container mt-2">
        <Switch>
          <Route exact path='/marvel' component={ marvelScreen }/>
          <Route exact path="/hero/:heroeId" component={ HeroScreen }/>
          <Route exact path="/dc/" component={ DcScreen }/>
          <Route exact path="/search" component={ SearchScreen }/>


          <Redirect to="/marvel" />
        </Switch>
      </div>

    </>
  )
}
