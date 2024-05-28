import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { CurrentUserProvider } from "../Contexts/CurrentUser";
import { SocketProvider } from "../Contexts/SocketContext";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "../utils/theme";
import store from "../redux/store";

export default function App({ Component, pageProps }: AppProps) {
  return <Provider store={store}>
    <CurrentUserProvider>
      <SocketProvider>
        <ChakraProvider theme={theme}>
          <Component {...pageProps} />
        </ChakraProvider>
      </SocketProvider>
    </CurrentUserProvider>
  </Provider>;
}
