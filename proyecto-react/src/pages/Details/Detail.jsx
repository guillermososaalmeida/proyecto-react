import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useGetById } from "../../hooks/useGetById";
import { Header, Sidebar } from "../../components";
import "./Detail.css";

export const Detail = () => {
  const { id } = useParams();

  const [game, setGame] = useState({});
  const { image, name, pegi, genre, year, theme, platforms } = game;

  useEffect(() => {
    (async () => {
      setGame(await useGetById(id));
    })();
  }, []);
  return (
    <div className="DetailBody">
      <Sidebar />
      <div className="GameDetailBody">
        <Header />
        <div className="GameDetails">
          <div className="GameCover">
            <img src={image} alt={name} />
          </div>
          <div className="GameDetailInfo">
            <div className="GameTitle">
              <h2> {name}</h2>
            </div>
            <div className="GameInfo">
              <div className="InfoSection">
                <h3>GENDER</h3>
                <p>{genre}</p>
              </div>
              <div className="InfoSection">
                <h3>YEAR</h3>
                <p>{year}</p>
              </div>
              <div className="InfoSection">
                <h3>THEME</h3>
                <p>{theme}</p>
              </div>
              <div className="InfoSection">
                <h3>PLATFORMS</h3>
                <p>{platforms}</p>
              </div>
              <div className="InfoSection">
                <h3>PEGI</h3>
                <p>{pegi}</p>
              </div>
              <button>MARCAR COMO ADQUIRIDO</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
