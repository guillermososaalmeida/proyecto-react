import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useGetById } from "../../hooks/useGetById";
import { Header, Sidebar } from "../../components";
import "./Detail.css";
import { HStack, Select, Stack } from "@chakra-ui/react";
import { toggleAcquiredGame } from "../../services/user.service";
import { useAcquired } from "../../hooks/useAcquired";
import { useForm } from "react-hook-form";

export const Detail = () => {
  const { register, handleSubmit } = useForm();
  const { id } = useParams();
  const [game, setGame] = useState({});
  const { image, name, pegi, genre, year, theme, platforms, _id } = game;
  useEffect(() => {
    (async () => {
      setGame(await useGetById(id));
    })();
  }, []);

  const selectInput = document.querySelector(".platformIdentifier");
  let platformID = selectInput?.value;

  const registerGame = async ({ platform }) => {
    toggleAcquiredGame({ game: id, platform });
  };

  return (
    <div className="DetailBody">
      <Sidebar />
      <div className="GameDetailBody">
        <Header />
        <div className="GameDetails">
          <form onSubmit={handleSubmit(registerGame)}>
            <div className="GameCover">
              <img src={image} alt={name} />
            </div>
            <div className="GameDetailInfo">
              <div className="GameTitle">
                <h2 className="gameIdentifier" value={_id}>
                  {name}
                </h2>
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
                  <h3>PEGI</h3>
                  <p>{pegi}</p>
                </div>
                <div className="InfoSection">
                  <h3>PLATFORMS</h3>
                  <Select
                    {...register("platform")}
                    variant="filled"
                    className="platformIdentifier"
                    placeholder="Select your platform"
                  >
                    {platforms?.map((platform) => (
                      <option key={platform._id} value={platform._id}>
                        {platform.name}
                      </option>
                    ))}
                  </Select>
                </div>

                <button type="submit">MARCAR COMO ADQUIRIDO</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
