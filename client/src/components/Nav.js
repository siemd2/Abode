import whiteLogo from "../images/abode-high-resolution-logo-white-transparent.png";
import blackLogo from "../images/abode-high-resolution-logo-black-transparent.png";


const Nav = ({ authToken, minimal, setShowModal, showModal, setIsSignUp, colour }) => {
  const handleClick = () => {
    setShowModal(true);
    setIsSignUp(false);
  };

  return (
    <nav>
      <div className="logo-container">
        <img
          className="logo"
          src={colour ? whiteLogo : blackLogo}
          alt="logo"
        />
      </div>
      {!authToken && !minimal && (
        <button
          className="nav-button"
          onClick={handleClick}
          disabled={showModal}
        >
          Log in
        </button>
      )}
    </nav>
  );
};
export default Nav;
