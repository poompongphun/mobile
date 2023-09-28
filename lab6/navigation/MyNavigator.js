import React from "react";
// import library ที่จำเป็น
import { StyleSheet, Text } from "react-native";
import CategoriesScreen from "../screens/CategoriesScreen";
import CategoryMealsScreen from "../screens/CategoryMealsScreen";
import MealDetailScreen from "../screens/MealDetailScreen";
import FiltersScreen from "../screens/FiltersScreen";
import { NavigationContainer } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import FavoritesScreen from "../screens/FavoritesScreen";
import {
  HeaderButton,
  HeaderButtons,
  Item,
} from "react-navigation-header-buttons";
import { Ionicons } from "@expo/vector-icons";

import { useDispatch } from "react-redux";
import { toggleFavorite } from "../store/actions/mealAction";

import { useSelector } from "react-redux";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

// import screen ที่เกี่ยวข้อง

// สร้าง navigator ตามโจทย์กำหนด

// สร้าง function สำหรับการกำหนด Navigator แต่ละตัว เช่น
// function MyXXNavigator() {
//   return (
//     // กำหนดรายละเอียดของ navigator
//   );
// }

// อาจกำหนด Navigator เพิ่มได้
// function MyYYNavigator() {
//   return (
//     // กำหนดรายละเอียดของ navigator
//   );
// }

const CustomHeaderButton = (props) => {
  return (
    <HeaderButton
      {...props}
      IconComponent={Ionicons}
      iconSize={23}
      color={props.isFavorite ? "yellow" : "white"}
    />
  );
};

function MealNavigator() {
  const navStyle = {
    headerStyle: { backgroundColor: "#4a148c" },
    headerTintColor: "white",
  };

  const dispatch = useDispatch();
  const toggleFavoriteHandler = (mealId) => {
    dispatch(toggleFavorite(mealId));
  };

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Categories"
        component={CategoriesScreen}
        options={{
          title: "Meal Categories",
          ...navStyle,
        }}
      />
      <Stack.Screen
        name="CategoryMeals"
        component={CategoryMealsScreen}
        options={({ route }) => ({
          title: route.params.categoryTitle,
          ...navStyle,
        })}
      />
      <Stack.Screen
        name="MealDetail"
        component={MealDetailScreen}
        options={({ route }) => ({
          title: route.params.mealTitle,
          ...navStyle,
          headerRight: () => {
            const availableMeals = useSelector(
              (state) => state.meals.favoriteMeals
            );
            return (
              <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                <Item
                  title="Tab_1"
                  iconName="ios-star"
                  isFavorite={
                    availableMeals.findIndex(
                      (meal) => meal.id == route.params.mealId
                    ) != -1
                  }
                  onPress={() => toggleFavoriteHandler(route.params.mealId)}
                />
              </HeaderButtons>
            );
          },
        })}
      />
    </Stack.Navigator>
  );
}

function TabNavigator() {
  return (
    <Tab.Navigator screenOptions={{ tabBarActiveTintColor: "orange" }}>
      <Tab.Screen
        name="MealsTab"
        component={MealNavigator}
        options={{
          headerShown: false,
          tabBarLabel: "Meals",
          tabBarIcon: ({ color, size }) => {
            return (
              <MaterialCommunityIcons
                name="silverware"
                size={size}
                color={color}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name="Favorites"
        component={FavoritesScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => {
            return <AntDesign name="star" size={size} color={color} />;
          },
        }}
      />
    </Tab.Navigator>
  );
}

// สร้าง Navigator หลัก
export default function MyNavigator() {
  return (
    <NavigationContainer>
      {/* รายละเอียดของ Navigator หลัก (MainNavigator) */}
      <Drawer.Navigator screenOptions={{ drawerActiveTintColor: "orange" }}>
        <Drawer.Screen
          name="Meals"
          component={TabNavigator}
          options={{ headerShown: false }}
        />
        <Drawer.Screen
          name="Filters"
          component={FiltersScreen}
          options={{ headerShown: false }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
