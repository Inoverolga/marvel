import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Component } from "react";

import "@fontsource/roboto-condensed";
import "@fontsource/roboto-condensed/400.css"; // Specify weight
import "@fontsource/roboto-condensed/400-italic.css";
import "@fontsource/roboto-condensed/700.css"; // bold// Specify weight and style

import AppHeader from "../appHeader/AppHeader";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import AppBanner from "../appBanner/AppBanner";
import AppComics from "../appComics/AppComics";
import SingleComic from "../singleComic/SingleComic";
import AppForm from "../appForm/AppForm";
import ErrorBoundary from "../errorBoundary/ErrorBoundary";

import decoration from "../../components/resourses/img/vision.png";
import "../../index.scss";
import "./app.scss";

class App extends Component {
    state = {
        selectedChar: null,
    };

    onCharSelected = (id) => {
        //метод для установки свойства selectedChar
        this.setState({
            selectedChar: id,
        });
    };

    render() {
        return (
            <Router>
                <div className="app">
                    {/* <AppHeader /> */}
                    {/* Вынесено за Routes, если должно отображаться всегда */}
                    <main>
                        <Routes>
                            <Route
                                path="/"
                                element={
                                    <>
                                        <AppHeader />
                                        <ErrorBoundary>
                                            <RandomChar />
                                        </ErrorBoundary>

                                        <div className="char__content">
                                            <ErrorBoundary>
                                                <CharList
                                                    onCharSelected={
                                                        this.onCharSelected
                                                    }
                                                />
                                            </ErrorBoundary>

                                            <div className="char__content-forma">
                                                <ErrorBoundary>
                                                    <CharInfo
                                                        charId={
                                                            this.state
                                                                .selectedChar
                                                        } //передаем то, что сохранили в состоянии (т.е id)
                                                    />
                                                </ErrorBoundary>
                                                <AppForm
                                                    style={{
                                                        visibility: "hidden",
                                                    }}
                                                />
                                            </div>
                                        </div>
                                        <img
                                            className="bg-decoration"
                                            src={decoration}
                                            alt="vision"
                                        />
                                    </>
                                }
                            />
                            {/* <Route
                                path="/loadmore"
                                element={
                                    <>
                                        <AppHeader />
                                        <RandomChar />
                                        <div className="char__content">
                                            <CharList />
                                            <Skeleton />
                                        </div>
                                        <img
                                            className="bg-decoration"
                                            src={decoration}
                                            alt="vision"
                                        />
                                    </>
                                }
                            /> */}

                            <Route
                                path="/comics"
                                element={
                                    <>
                                        <AppHeader />
                                        <AppBanner />
                                        <AppComics />
                                    </>
                                }
                            />

                            <Route
                                path="/comicsitem"
                                element={
                                    <>
                                        <AppHeader />
                                        <AppBanner />
                                        <SingleComic />
                                    </>
                                }
                            />
                        </Routes>
                    </main>
                </div>
            </Router>
        );
    }
}
export default App;
