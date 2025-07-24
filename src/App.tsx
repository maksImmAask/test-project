import AppRouter from "./routes/router";
import { MantineProvider } from "@mantine/core";
import '@mantine/core/styles.css';
import  theme  from "./shared/theme";

export default function App() {
  return (
    <MantineProvider theme={theme}>

      <AppRouter />
    </MantineProvider>
  )
}
