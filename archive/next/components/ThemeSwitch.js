import { useRecoilState } from "recoil";
import themeState from "../state/themeState.js";
import themes from "../styles/themes";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";

const ThemeSwitch = () => {
    const [theme, setTheme] = useRecoilState(themeState);

    function toggleTheme() {
        setTheme(theme.name === "dark" ? themes.light : themes.dark);
    }

    return (
        // {` height: "100%", width: "30px", cursor: "pointer" `}
        //"h-full w-8 cursor-pointer"
        //{` h-full w-8 cursor-pointer `}
        <div className="h-full w-8 cursor-pointer">
            {theme.name === "light" && (
                <FontAwesomeIcon
                    icon={faMoon}
                    onClick={toggleTheme}
                    fontSize="25px"
                />
            )}
            {theme.name === "dark" && (
                <FontAwesomeIcon
                    icon={faSun}
                    onClick={toggleTheme}
                    fontSize="25px"
                />
            )}
        </div>
    );
};

export default ThemeSwitch;
