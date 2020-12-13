import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { AuthPage } from './pages/AuthPage'
import { CreateRoomPage } from './pages/CreateRoomPage'
import { TilesPage } from './pages/TilesPage'
import { RoomsPage } from './pages/RoomsPage'
import { RoomPage } from './pages/RoomPage'
import { StudentPage } from './pages/StudentPage'
import { StudentsPage } from './pages/StudentsPage'
import { CreateStudentPage } from './pages/CreateStudentPage'
import { ChooseRoom } from './pages/ChooseRoom'
export const useRoutes = isAuthenticated => {
    if (isAuthenticated) {
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
                <Route path="/students" exact>
                    <StudentsPage />
                </Route>
                <Route path="/student/:id">
                    <StudentPage />
                </Route>
                <Route path="/chooseRoom" exact>
                    <ChooseRoom />
                </Route>
                <Route path="/createStudent/:id">
                    <CreateStudentPage />
                </Route>
                <Redirect to="/home" />
            </Switch>
        )
    }

    return (
        <Switch>
            <Route path="/" exact>
                <AuthPage />
            </Route>
            <Redirect to="/" />
        </Switch>
    )
}