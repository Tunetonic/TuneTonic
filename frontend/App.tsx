import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View} from 'react-native';
import {Provider as PaperProvider} from "react-native-paper";
import {Login} from "./login";

const App = (): JSX.Element => {
  return (
      <PaperProvider>
          <Login></Login>
      </PaperProvider>
  )
}

export default App
