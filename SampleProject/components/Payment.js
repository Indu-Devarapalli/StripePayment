import { useStripe } from "@stripe/stripe-react-native";
import React, { useState } from "react";
import { View, Text, TextInput, Button, Alert } from "react-native";

const Payment = () => {
  const [name, setName] = useState("");
  const stripe = useStripe();

  const subscribe = async () => {
    try {
      // sending request to your backend to create a paymentIntent
      const response = await fetch("http://192.168.31.124:8080/pay", {
        method: "POST",
        body: JSON.stringify({ name }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (!response.ok) return Alert.alert(data.message);

      const clientSecret = data.clientSecret;

      // Initialize the PaymentSheet with the merchant display name
      const initSheet = await stripe.initPaymentSheet({
        paymentIntentClientSecret: clientSecret,
        merchantDisplayName: "Indu",  // Set your merchant name here
      });

      if (initSheet.error) return Alert.alert(initSheet.error.message);

      // Present the PaymentSheet to the user
      const presentSheet = await stripe.presentPaymentSheet({
        clientSecret,
      });

      if (presentSheet.error) return Alert.alert(presentSheet.error.message);

      Alert.alert("Payment complete, thank you!");
    } catch (err) {
      console.error(err);
      Alert.alert("Something went wrong, try again later!");
    }
  };

  return (
    <View>
      <TextInput
        value={name}
        onChangeText={(text) => setName(text)}
        placeholder="Name"
        style={{
          width: 300,
          fontSize: 20,
          padding: 10,
          borderWidth: 1,
        }}
      />
      <Button title="Subscribe - 25 INR" onPress={subscribe} />
    </View>
  );
};

export default Payment;
