import { useState } from "react";
import { StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native";
import { Text } from "react-native";
import { View } from "react-native";
import { evaluate } from "mathjs";
const buttons = [
  ["C", "DEL", "^", "÷"],
  ["7", "8", "9", "×"],
  ["4", "5", "6", "+"],
  ["3", "2", "1", "-"],
  ["0", "00", ".", "="],
];
export default function Home() {
  const [expression, setExpression] = useState("");
  const [result, setResult] = useState(null);
  function handlePress(btn) {
    if (btn === "=") {
      if (!expression) return;
      let exp = expression.replaceAll("×", "*");
      exp = exp.replaceAll("÷", "/");
      const result = evaluate(exp);
      setResult({
        exp: expression,
        value: result,
      });
      setExpression("");
    } else if (btn === "DEL") {
      setExpression(expression.slice(0, expression.length - 1));
    } else if (["+", "-", "^", "÷", "×"].includes(btn)) {
      if (
        ["+", "-", "^", "÷", "×", "."].includes(
          expression[expression.length - 1]
        )
      )
        return;
      setExpression(expression + btn);
    } else if (btn === ".") {
      for (let i = expression.length - 1; i >= 0; i--) {
        if (expression[i] == ".") return;
        else if (["+", "-", "^", "÷", "×"].includes(expression[i])) break;
      }
      setExpression(expression + btn);
    } else if (btn === "C") {
      setExpression("");
      setResult(null);
    } else {
      setExpression(expression + btn);
    }
  }

  return (
    <View style={styles.maincontiner}>
      <View style={styles.display}>
        {result && <Text style={styles.resExp}>{result.exp}</Text>}
        {result && <Text style={styles.resVal}>{result.value}</Text>}
        {expression && <Text style={styles.expression}>{expression}</Text>}
      </View>
      <View style={styles.buttonContainer}>
        {buttons.map((row, index) => {
          return (
            <View key={row} style={styles.buttons}>
              {row.map((btn, index) => {
                return (
                  <TouchableOpacity
                    key={index}
                    onPress={() => {
                      handlePress(btn);
                    }}
                    style={styles.buttonTouchable}
                  >
                    <Text style={styles.buttonText}>{btn}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  maincontiner: {
    flex: 1,
    backgroundColor: "white",
  },
  display: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "flex-end",
    margin: 20,
  },
  buttonText: {
    color: "white",
    fontSize: 36,
  },
  buttons: {
    flexDirection: "row",
    height: 80,
  },
  buttonContainer: {
    padding: 20,
    borderTopWidth: 2,
    borderColor: "grey",
    paddingVertical: 18,
  },
  expression: {
    color: "white",
    fontSize: 24,
  },
  buttonTouchable: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  resExp: {
    color: "grey",
    fontSize: 24,
  },
  resVal: {
    color: "white",
    fontSize: 38,
    fontWeight: "bold",
  },
});
