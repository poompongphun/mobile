import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { MEALS } from "../data/dummy-data";

const MealDetailScreen = ({ navigation, route }) => {
  // เขียนโค้ดเพิ่ม เพื่อดึงข้อมูลเกี่ยวกับเมนูอาหารที่ผู้ใช้เลือกเอาไว้

  const mealId = route.params.mealId;
  const selectedMeal = MEALS.find((meal) => meal.id === mealId);
  console.log(selectedMeal);

  return (
    <View style={styles.screen}>
      <Text>The Meal Detail Screen!</Text>
      <Text style={{ fontSize: 20, fontWeight: "bold" }}>
        {selectedMeal.title}
      </Text>
      <View style={{ marginVertical: 10 }}>
        {selectedMeal.steps.map((step, index) => (
          <Text
            key={index}
            style={{ paddingVertical: 3, paddingHorizontal: 2 }}
          >
            {index + 1}. {step}
          </Text>
        ))}
      </View>
      <Button
        title="Go Back to Categories"
        onPress={() => {
          // เขียนโค้ดเพิ่ม
          navigation.popToTop();
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default MealDetailScreen;
