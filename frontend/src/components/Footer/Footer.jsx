import "./Footer.css";
import facebookIcon from "../../Assets/Facebook.png";
import instagramIcon from "../../Assets/Instagram.png";
import youtube from "../../Assets/YouTube.png";
import twitter from "../../Assets/Twitter.png";
import linkedin from "../../Assets/Linkedin.png";
import { useNavigate, Link } from "react-router-dom";


const Footer = () => {

  const navigate = useNavigate()

  return (
    <footer>
      <div>-This should be the bottom of the page-</div>
      <div>
        <img src={facebookIcon} className="socialMedia"></img>
        <img src={instagramIcon} className="socialMedia" onClick={() => navigate("/") }></img>
        <img src={youtube} className="socialMedia-youtube"></img>
        <img src={twitter} className="socialMedia"></img>
        <img src={linkedin} className="socialMedia"></img>
      </div>
      <div className="copyright">
        <p>Copyright © 2023</p>{""}
      </div>
    </footer>
  );
};

export default Footer;
