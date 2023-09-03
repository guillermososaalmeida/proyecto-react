import { useEffect, useState } from "react";
import "./Welcome.css";
import { useNavigate } from "react-router-dom";
import { Button, Link } from "@chakra-ui/react";

export const Welcome = () => {
  const navigate = useNavigate();

  const carruselImg = [
    {
      src: "https://areajugones.sport.es/wp-content/uploads/2023/08/gta-v.jpg",
      alt: "GTA5",
    },
    {
      src: "https://esports.eldesmarque.com/wp-content/uploads/2019/09/LoL2.jpg",
      alt: "League of Legends",
    },
    {
      src: "https://areajugones.sport.es/wp-content/uploads/2023/08/image-18.jpg.webp",
      alt: "Valorant",
    },
    {
      src: "https://areajugones.sport.es/wp-content/uploads/2023/08/image-19.jpg.webp",
      alt: "CS:GO",
    },
    {
      src: "https://areajugones.sport.es/wp-content/uploads/2023/08/image-20-1220x610.jpg.webp",
      alt: "Minecraft",
    },
    {
      src: "https://areajugones.sport.es/wp-content/uploads/2023/08/image-21.jpg.webp",
      alt: "DOTA 2",
    },
    {
      src: "https://areajugones.sport.es/wp-content/uploads/2023/08/image-22.jpg.webp",
      alt: "Apex Legends",
    },
    {
      src: "https://areajugones.sport.es/wp-content/uploads/2023/08/image-23-1220x610.jpg.webp",
      alt: "Fornite",
    },
    {
      src: "https://areajugones.sport.es/wp-content/uploads/2023/08/image-24-1220x686.jpg.webp",
      alt: "Rust",
    },
    {
      src: "https://areajugones.sport.es/wp-content/uploads/2023/08/world-warcraft-1220x686.webp",
      alt: "WOW",
    },
  ];
  const [indexCarrusel, setIndexCarrusel] = useState(0);
  const carruselSize = carruselImg.length;
  const delayAutoIncrementInSeconds = 5;
  const ciclycIndexArray =
    ((indexCarrusel + 5) % carruselSize) *
    Math.floor((indexCarrusel + 5) / carruselSize);
  const carrusel5Elements = [
    ...carruselImg.slice(indexCarrusel, indexCarrusel + 5),
    ...carruselImg.slice(0, ciclycIndexArray),
  ];

  useEffect(() => {
    const autoIncrement = setInterval(() => {
      setIndexCarrusel((prev) => (prev + 1 > carruselSize ? 0 : prev + 1));
    }, delayAutoIncrementInSeconds * 1000);
    return () => clearInterval(autoIncrement);
  }, [indexCarrusel]);

  return (
    <>
      <div className="welcomeBody">
        <div className="HeaderWelcomeContainer">
          <button className="btn-login" onClick="location./login">
            Login
          </button>
          <h1>Todos tus juegos a la alcance de tu mano</h1>
          <p>Únete ya para poder tener todos tus juegos en un solo lugar </p>
          <button className="btn-register">Click here to Register now!</button>
        </div>
        <div className="CarruselContainer">
          <button
            onClick={() => {
              setIndexCarrusel((prev) => {
                return prev - 1 < 0 ? carruselSize : prev - 1;
              });
            }}
          >
            {"<"}
          </button>
          {carrusel5Elements.map((image) => {
            return (
              <img
                key={`img-${image.id}`}
                width={"200px"}
                height={"100px"}
                src={image.src}
                alt={image.alt}
              />
            );
          })}
          <button
            onClick={() => {
              setIndexCarrusel((prev) => {
                return prev + 1 > carruselSize ? 0 : prev + 1;
              });
            }}
          >
            {">"}
          </button>
        </div>
        <div className="PromotionContainer">
          <div className="PromotionSection">
            <div className="PromotionText">
              ¡Encuentra aquí tus juegos favoritos! Tenemos una amplia variedad
              de géneros y plataformas
            </div>
            <div className="PromotionImg">
              <img src="https://wallpaperaccess.com/full/4336066.jpg" />
            </div>
          </div>

          <div className="PromotionSection">
            <div className="PromotionImg">
              <img src="https://wallpaperaccess.com/full/4382106.png" />
            </div>
            <div className="PromotionText">
              Organiza tus juegos y mantente al día de los nuevos lanzamientos
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
