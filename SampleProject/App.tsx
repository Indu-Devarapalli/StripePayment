import { StripeProvider } from "@stripe/stripe-react-native";
import { StatusBar } from 'react-native';
import { StyleSheet, Text, View } from "react-native";
import Payment from "./components/Payment";

export default function App() {
  return (
    <View style={styles.container}>
      <StripeProvider publishableKey="pk_test_51QNaGWKHt1s1AaEAl9GgZlZ7d3nYznfMdhBAd1B1DRRlpzwrRqePCP9eczOvQSBYXIMTj1JTh659E6WeIOZR0uzb00UHcgywfu">
        <Payment />
      </StripeProvider>
      <StatusBar barStyle="dark-content" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
