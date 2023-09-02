import "./Welcome.css";
import { useNavigate } from "react-router-dom";

export const Welcome = () => {
  const navigate = useNavigate();

  //array de imágenes (unas 10)
  //abajo en carrusel poner las imágenes

  return (
    <>
      <div className="welcomeBody">
        <div className="HeaderWelcomeContainer">
          <button className="btn-login">Login</button>
          <h1>Todos tus juegos a la alcance de tu mano</h1>
          <p>Únete ya para poder tener todos tus juegos en un solo lugar </p>
          <button className="btn-register">Register</button>
        </div>
        <div className="CarruselContainer">Carrusel</div>
        <div className="PromotionContainer">
          <div className="PromotionImg"></div>
          <div className="PromotionText"></div>

          <div className="PromotionText"></div>
          <div className="PromotionImg"></div>

          <div className="PromotionImg"></div>
          <div className="PromotionText"></div>
        </div>
      </div>
    </>
  );
};
