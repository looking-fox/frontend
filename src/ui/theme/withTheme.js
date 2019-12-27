import * as React from "react";
import ThemeContext from "./themeContext";

export default function withTheme(Component) {
  return function ThemeComponent(props) {
    return (
      <ThemeContext.Consumer>
        {contexts => <Component {...props} {...contexts} />}
      </ThemeContext.Consumer>
    );
  };
}
