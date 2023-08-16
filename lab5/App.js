import React from "react";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
// import คอมโพเนนต์ที่จำเป็น
import CategoriesScreen from "./screens/CategoriesScreen";
import CategoryMealsScreen from "./screens/CategoryMealsScreen";
import MealDetailScreen from "./screens/MealDetailScreen";

const MealsNavigator = createNativeStackNavigator();

export default function App() {
  // เพิ่มโค้ดส่วนนี้ เพื่อจัดการ Stack Navigation
  const navStyle = {
    headerStyle: { backgroundColor: "#4a148c" },
    headerTintColor: "white",
  };
  return (
    <NavigationContainer>
      <MealsNavigator.Navigator>
        <MealsNavigator.Screen
          name="Categories"
          component={CategoriesScreen}
          options={{
            title: "Meal Categories",
            ...navStyle,
          }}
        />
        <MealsNavigator.Screen
          name="CategoryMeals"
          component={CategoryMealsScreen}
          options={({ route }) => ({
            title: route.params.categoryTitle,
            ...navStyle,
          })}
        />
        <MealsNavigator.Screen
          name="MealDetail"
          component={MealDetailScreen}
          options={({ route }) => ({
            title: route.params.mealTitle,
            ...navStyle,
          })}
        />
      </MealsNavigator.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "blue",
    alignItems: "center",
    justifyContent: "center",
  },
});
