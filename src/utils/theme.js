import { extendTheme } from "@chakra-ui/react";

// Function to generate shades of a color
const generateColorScheme = (color) => {
  const lighten = (col, factor) => {
    return col.map((val) => Math.min(255, val + (255 - val) * factor));
  };

  const darken = (col, factor) => {
    return col.map((val) => val * (1 - factor));
  };

  const hexToRgb = (hex) => {
    return hex.match(/[A-Za-z0-9]{2}/g).map((v) => parseInt(v, 16));
  };

  const rgbToHex = (r, g, b) => {
    return (
      "#" +
      [r, g, b]
        .map((val) => Math.round(val).toString(16).padStart(2, "0"))
        .join("")
    );
  };

  const baseColor = hexToRgb(color);

  return {
    50: rgbToHex(...lighten(baseColor, 0.9)),
    100: rgbToHex(...lighten(baseColor, 0.8)),
    200: rgbToHex(...lighten(baseColor, 0.6)),
    300: rgbToHex(...lighten(baseColor, 0.4)),
    400: rgbToHex(...lighten(baseColor, 0.2)),
    500: color,
    600: rgbToHex(...darken(baseColor, 0.1)),
    700: rgbToHex(...darken(baseColor, 0.2)),
    800: rgbToHex(...darken(baseColor, 0.4)),
    900: rgbToHex(...darken(baseColor, 0.6)),
  };
};

// Primary color
const primaryColor = "#22c55e";

// Generate color scheme
const primaryScheme = generateColorScheme(primaryColor);

const theme = extendTheme({
  colors: {
    primary: primaryScheme,
  },
});

export default theme;
