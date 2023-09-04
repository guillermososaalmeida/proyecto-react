import "./FigureUser.css";
export const FigureUser = (user) => {
  return (
    <figure className="dataProfile">
      <img src={user.user.image} alt="user image" className="imageUser" />
      <div className="emailUser">
        <h3>Email:</h3> <p>{user.user.email}</p>
      </div>
    </figure>
  );
};
