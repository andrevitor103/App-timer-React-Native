import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

import { StatusBar } from "expo-status-bar";
import { Audio } from "expo-av";

export default function Timer(props) {
  var done = false;

  useEffect(() => {
    const timer = setInterval(() => {
      props.setSegundos(props.segundos - 1);

      if (props.segundos <= 0) {
        if (props.minutos > 0) {
          props.setMinutos(props.minutos - 1);
          props.setSegundos(59);
        } else {
          if (!done) {
            done = true;
            resetar();
            playSound();
          }
        }
      }
    }, 1000);
    return () => clearInterval(timer);
  });

  const resetar = () => {
    props.setarEstado("inicial");
    props.setMinutos(0);
    props.setSegundos("1");
  };

  const playSound = async () => {
    const soundObject = new Audio.Sound();
    try {
      await soundObject.loadAsync(require("./assets/audio.mp3"));
      await soundObject.playAsync();
    } catch (error) {}
  };

  const formatNumberDisplay = (number) => {
    if (number < 10) {
      number = "0" + number;
    }
    return number;
  };
  var minutos = formatNumberDisplay(props.minutos);
  var segundos = formatNumberDisplay(props.segundos);

  return (
    <View style={styles.container}>
      <Text style={{ color: "white", fontSize: 60 }}>
        {minutos} : {segundos}
      </Text>
      <TouchableOpacity style={styles.btnStart} onPress={() => resetar()}>
        <Text style={styles.btnStartText}>RESETAR</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#069",
    alignItems: "center",
    justifyContent: "center",
  },
  btnStart: {
    backgroundColor: "#f00",
    minWidth: 100,
    height: 100,
    padding: 20,
    marginTop: 40,
    borderRadius: 50,
    alignItems: "center",
  },
  btnStartText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 20,
  },
});
