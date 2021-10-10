import { useHistory } from "react-router-dom";
import SpeedDial from "@mui/material/SpeedDial";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import AppsIcon from "@mui/icons-material/Apps";
import LoginIcon from "@mui/icons-material/Login";
import CategoryIcon from "@mui/icons-material/Category";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import ContactMailIcon from "@mui/icons-material/ContactMail";

const actions = [
  { icon: <HomeIcon />, name: "Home" },
  { icon: <CategoryIcon />, name: "Categories" },
  { icon: <LoginIcon />, name: "Login" },
  { icon: <ContactMailIcon />, name: "Contact" },
];

export default function OpenIconSpeedDial() {
  const history = useHistory();

  const handleClick = (page: string) => {
    switch (page) {
      case "Categories":
        history.push("/categories");
        break;

      case "Login":
        history.push("/login");
        break;

      case "Contact":
        history.push("/contact");
        break;

      case "Home":
      default:
        history.push("/");
    }
  };

  return (
    <SpeedDial
      ariaLabel="SpeedDial openIcon example"
      sx={{ position: "fixed", bottom: 70, right: 70 }}
      icon={<SpeedDialIcon icon={<AppsIcon />} openIcon={<MenuIcon />} />}
    >
      {actions.map((action) => (
        <SpeedDialAction
          key={action.name}
          icon={action.icon}
          tooltipTitle={action.name}
          onClick={() => handleClick(action.name)}
        />
      ))}
    </SpeedDial>
  );
}
