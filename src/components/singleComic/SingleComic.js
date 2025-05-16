import xmen from "../resourses/img/x-men.png";
import "./singleComic.scss";

const SingleComic = () => {
    return (
        <section className="singlecomic">
            <div className="singlecomic__wrapper">
                <img src={xmen} alt="" className="singlecomic__img" />
                <div className="singlecomic__content">
                    <div className="singlecomic__content-title">
                        <h3 className="singlecomic__content-title-first">
                            X-Men: Days of Future Past
                        </h3>
                        <h4 className="singlecomic__content-title-second">
                            Back to all
                        </h4>
                    </div>
                    <p className="singlecomic__content-text">
                        Re-live the legendary first journey into the dystopian
                        future of 2013 - where Sentinels stalk the Earth, and
                        the X-Men are humanity's only hope...until they die!
                        Also featuring the first appearance of Alpha Flight, the
                        return of the Wendigo, the history of the X-Men from
                        Cyclops himself...and a demon for Christmas!?
                    </p>
                    <p className="singlecomic__content-page">144 pages</p>
                    <p className="singlecomic__content-language">
                        Language: en-us
                    </p>
                    <p className="singlecomic__content-price">9.99$</p>
                </div>
            </div>
        </section>
    );
};

export default SingleComic;
