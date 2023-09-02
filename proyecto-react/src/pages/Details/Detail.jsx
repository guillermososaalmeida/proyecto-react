import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useGetById } from "../../hooks/useGetById";

export const Detail = () => {
  const { id } = useParams();

  const [game, setGame] = useState({});
  const { image, name } = game;

  useEffect(() => {
    (async () => {
      setGame(await useGetById(id));
    })();
  }, []);
  return (
    <section>
      <figure>
        <img src={image} alt={name} />
        <h2>{name}</h2>
      </figure>
    </section>
  );
};
