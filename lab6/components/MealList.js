import React from "react";
import { FlatList, View, StyleSheet, Text } from "react-native";
import { MEALS } from "../data/dummy-data";
import MealItem from "./MealItem";
import { useSelector } from "react-redux";



const MealList = ({ navigation }) => {
  const renderMealItem = (itemData) => {
    return (
      <MealItem
        title={itemData.item.title}
        duration={itemData.item.duration}
        complexity={itemData.item.complexity}
        affordability={itemData.item.affordability}
        image={itemData.item.imageUrl}
        onSelectMeal={() => {
          // เขียนโค้ดเพิ่ม
          navigation.navigate("MealDetail", {
            mealId: itemData.item.id,
            mealTitle: itemData.item.title,
          });
        }}
      />

      // ส่วนนี้ <View>...</View> ใช้เพื่อการทดลอง และให้คอมเมนต์โค้ดส่วนนี้และเรียกใช้ <MealItem> ข้างบนแทน
      // <View style={{ height: 50, width: "40%" }}>
      //   <Text>{itemData.item.title}</Text>
      // </View>
    );
  };

  // const catId = route.params.categoryId;

  // const favMeals = MEALS.filter((meal) => meal.id === "m1" || meal.id === "m2");

  const availableMeals = useSelector((state) => state.meals.favoriteMeals);

  return (
    <View style={styles.screen}>
      <FlatList
        style={{ width: "100%" }}
        data={availableMeals}
        renderItem={renderMealItem}
      />
    </View>

    // ส่วนนี้ <View>...</View>ใช้เพื่อการทดลอง และให้คอมเมนต์โค้ดส่วนนี้และเรียกใช้ <FlatList> ข้างบนแทน
    // <View>
    //   <Text>Category Meals Screen!!</Text>
    // </View>
  );
};

const styles = StyleSheet.create({
  list: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default MealList;
