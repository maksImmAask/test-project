import AppRouter from "./routes/router";
import { MantineProvider } from "@mantine/core";
import '@mantine/core/styles.css';
import  theme  from "./shared/theme";

import { Notifications } from "@mantine/notifications";
export default function App() {
  return (
    <MantineProvider theme={theme}>
      <Notifications position="top-right" zIndex={2077} limit={3} />
      <AppRouter />
    </MantineProvider>
  )
}
