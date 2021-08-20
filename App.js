import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Picker } from "@react-native-picker/picker";
import Timer from "./Timer.js";

export default function App() {
  const [minutos, setMinutos] = useState(0);
  const [segundos, setSegundos] = useState("1");
  const [estado, setEstado] = useState("inicial");
  const [sounds, setSounds] = useState([
    {
      id: 1,
      sound: "alarme 1",
      active: true,
    },
    {
      id: 2,
      sound: "alarme 2",
      active: false,
    },
    {
      id: 3,
      sound: "alarme 3",
      active: false,
    },
    {
      id: 4,
      sound: "alarme 4",
      active: false,
    },
    {
      id: 5,
      sound: "alarme 5",
      active: false,
    },
    {
      id: 6,
      sound: "alarme 6",
      active: false,
    },
  ]);

  const setarAlarmeSound = (id) => {
    let newSounds = sounds.map((soundActual) => {
      if (soundActual.id == id) {
        soundActual.active = true;
      } else {
        soundActual.active = false;
      }
      return soundActual;
    });
    setSounds(newSounds);
  };

  const setarEstado = (estadoChange) => {
    setEstado(estadoChange);
  };

  var numeros = [];

  for (var i = 0; i <= 59; i++) {
    numeros.push(i);
  }
  if (estado == "inicial") {
    return (
      <View style={styles.container}>
        <View style={{ marginBottom: 40 }}>
          <Text style={styles.textInfo}>
            Selecione o seu tempo min: {minutos} - seg: {segundos}
          </Text>
        </View>
        <View style={styles.panelTime}>
          <Text style={styles.panelTimeLabelPicker}>Min:</Text>
          <Picker
            selectedValue={minutos}
            onValueChange={(itemValue) => setMinutos(itemValue)}
            style={styles.optionsPicker}
          >
            {numeros.map((numero) => {
              return (
                <Picker.Item
                  label={numero.toString()}
                  value={numero.toString()}
                  key={"1." + numero}
                />
              );
            })}
          </Picker>
          <Text style={styles.panelTimeLabelPicker}>Seg:</Text>
          <Picker
            selectedValue={segundos}
            onValueChange={(itemValue) => setSegundos(itemValue)}
            style={styles.optionsPicker}
          >
            {numeros.map((numero) => {
              return (
                <Picker.Item
                  label={numero.toString()}
                  value={numero.toString()}
                  key={"2." + numero}
                />
              );
            })}
          </Picker>
        </View>
        <View
          style={{
            marginBottom: 10,
            marginTop: 10,
            flexDirection: "row",
            flexWrap: "wrap",
          }}
        >
          {sounds.map((soundActual) => {
            if (!soundActual.active) {
              return (
                <TouchableOpacity
                  style={styles.btnSounds}
                  onPress={() => setarAlarmeSound(soundActual.id)}
                >
                  <Text style={styles.btnSoundsText}>{soundActual.sound}</Text>
                </TouchableOpacity>
              );
            } else {
              return (
                <TouchableOpacity style={styles.btnSoundsActive}>
                  <Text style={styles.btnSoundsText}>{soundActual.sound}</Text>
                </TouchableOpacity>
              );
            }
          })}
        </View>
        <TouchableOpacity
          style={styles.btnStart}
          onPress={() => setarEstado("processando")}
        >
          <Text style={styles.btnStartText}>INICIAR</Text>
        </TouchableOpacity>
        <StatusBar style="auto" />
      </View>
    );
  } else if (estado == "processando") {
    return (
      <Timer
        minutos={minutos}
        segundos={segundos}
        setarEstado={setarEstado}
        setMinutos={setMinutos}
        setSegundos={setSegundos}
      ></Timer>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#069",
    alignItems: "center",
    justifyContent: "center",
  },
  textInfo: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  panelTime: {
    flexDirection: "row",
    backgroundColor: "#cee",
    padding: 10,
  },
  panelTimeLabelPicker: {
    padding: 16,
  },
  optionsPicker: {
    height: 50,
    width: 100,
  },
  btnStart: {
    backgroundColor: "#f00",
    width: 100,
    height: 100,
    padding: 20,
    marginTop: 20,
    borderRadius: 50,
    alignItems: "center",
  },
  btnStartText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 20,
  },
  btnSounds: {
    backgroundColor: "rgba(37, 14, 240, 1)",
    padding: 14,
    margin: 2,
  },
  btnSoundsText: {
    color: "white",
    fontSize: 14,
    fontWeight: "bold",
  },
  btnSoundsActive: {
    backgroundColor: "rgba(37, 14, 240, 0.2)",
    padding: 14,
    margin: 2,
    borderColor: "white",
  },
});
