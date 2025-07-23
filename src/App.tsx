import AppRouter from "./router";
import { MantineProvider } from "@mantine/core";

export default function App() {
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>

      <AppRouter />
    </MantineProvider>
  )
}
