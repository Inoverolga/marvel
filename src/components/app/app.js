import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
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

const App = () => {
    const [selectedChar, setChar] = useState(null);
    const [selectedComics, setSelectedComics] = useState(null);

    const onCharSelected = (id) => {
        //метод для установки свойства selectedChar
        setChar(id);
    };

    const onSelectedComics = (id) => {
        setSelectedComics(id);
    };

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
                                                onCharSelected={onCharSelected}
                                            />
                                        </ErrorBoundary>

                                        <div className="char__content-forma">
                                            <ErrorBoundary>
                                                <CharInfo
                                                    charId={selectedChar} //передаем то, что сохранили в состоянии (т.е id)
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

                        <Route
                            path="/comics"
                            element={
                                <>
                                    <AppHeader />
                                    <AppBanner />
                                    <ErrorBoundary>
                                        <AppComics
                                            onSelectedComics={onSelectedComics}
                                        />
                                    </ErrorBoundary>
                                </>
                            }
                        />

                        <Route
                            path="/comicsitem"
                            element={
                                <>
                                    <AppHeader />
                                    <AppBanner />
                                    <SingleComic comicsId={selectedComics} />
                                </>
                            }
                        />
                    </Routes>
                </main>
            </div>
        </Router>
    );
};
export default App;
