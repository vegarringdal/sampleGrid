import { themeStore } from "../state/theme";

let init = false; // so we dont end up in endless loop

export function initDarkTheme() {
  if (!init) {
    init = true;

    const initStatus = window.localStorage.getItem("theme");
    if (initStatus === null) {
      window.localStorage.setItem("theme", "Y");
      themeStore.setState({ isDarkTheme: true });
      document.getElementsByTagName("HTML")[0].className = "dark";
    } else {
      if (initStatus !== "Y") {
        document.getElementsByTagName("HTML")[0].className = "";
      } else {
        document.getElementsByTagName("HTML")[0].className = "dark";
      }
      themeStore.setState({ isDarkTheme: initStatus === "Y" ? true : false });
    }
  }
}

export function toggleDarkTheme() {
  const darkTheme =
    document.getElementsByTagName("HTML")[0].className !== "dark";
  if (darkTheme) {
    document.getElementsByTagName("HTML")[0].className = "dark";
  } else {
    document.getElementsByTagName("HTML")[0].className = "";
  }
  themeStore.setState({ isDarkTheme: darkTheme ? true : false });
  window.localStorage.setItem("theme", darkTheme ? "Y" : "N");
}
