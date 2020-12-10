import React from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'
import { AuthPage } from './pages/AuthPage'
import { CreateRoomPage } from './pages/CreateRoomPage'
import { TilesPage } from './pages/TilesPage'
import { RoomsPage } from './pages/RoomsPage'
import { RoomPage } from './pages/RoomPage'
// import { StudentPage } from './pages/StudentPage'
// import { StudentsPage } from './pages/StudentsPage'
export const useRoutes = isAuthenticated =>{
    if(isAuthenticated) {
        return (
            <Switch>
                <Route path="/home" exact>
                    <TilesPage />
                </Route>
                <Route path="/createRoom" exact>
                    <CreateRoomPage />
                </Route>
                <Route path="/rooms" exact>
                    <RoomsPage />
                </Route>
                <Route path="/room/:id">
                    <RoomPage />
                </Route>
                <Redirect to="/home"/>
            </Switch>
        )
    }

    return (
        <Switch>
            <Route path="/" exact>
                <AuthPage />
            </Route>
            <Redirect to="/"/>
        </Switch>
    )
}