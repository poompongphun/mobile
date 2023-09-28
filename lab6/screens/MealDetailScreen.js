import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { MEALS } from "../data/dummy-data";
import MealItem from "../components/MealItem";

const MealDetailScreen = ({ navigation, route }) => {
  // เขียนโค้ดเพิ่ม เพื่อดึงข้อมูลเกี่ยวกับเมนูอาหารที่ผู้ใช้เลือกเอาไว้

  const mealId = route.params.mealId;
  const selectedMeal = MEALS.find((meal) => meal.id === mealId);
  console.log(selectedMeal);

  return (
    <View style={styles.screen}>
      <MealItem
        title={selectedMeal.title}
        duration={selectedMeal.duration}
        complexity={selectedMeal.complexity}
        affordability={selectedMeal.affordability}
        image={selectedMeal.imageUrl}
        onSelectMeal={() => {
          // เขียนโค้ดเพิ่ม
          navigation.navigate("MealDetail", {
            mealId: selectedMeal.id,
            mealTitle: selectedMeal.title,
          });
        }}
      />
      <Text style={{ fontSize: 20, fontWeight: "bold" }}>Ingredients</Text>
      <View style={{ marginVertical: 10, width: "90%" }}>
        {selectedMeal.ingredients.map((step, index) => (
          <Text
            key={index}
            style={{ paddingVertical: 3, paddingHorizontal: 2 }}
          >
            {index + 1}. {step}
          </Text>
        ))}
      </View>
      <Text style={{ fontSize: 20, fontWeight: "bold" }}>Steps</Text>
      <View style={{ marginVertical: 10, width: "90%" }}>
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
    justifyContent: "start",
    alignItems: "center",
    gap: 10
  },
});

export default MealDetailScreen;
