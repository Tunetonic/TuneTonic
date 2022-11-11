import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

const App = (): JSX.Element => {
  return (
    <View style={styles.container}>
      <Text>Lees de readme in de root folder!</Text>
      <StatusBar style="auto" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default App;
