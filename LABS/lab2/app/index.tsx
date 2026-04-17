// import { Avatar,Tag, StatCard, RecipeList } from "@/exercises"; 
// import { Text, View } from "react-native";


// export default function Index() {
//   return (
//     <View>
//       {/* <Avatar source={{ uri: "https://i.pravatar.cc/150?img=12" }} size={80} />  */}

//       {/* <Tag text="SUCCESS" variant="success" />
//       <Tag text="DANGER" variant="danger" onPress={() => alert('Neggua!')} />
//       <Tag text="PRIMARYY" variant="primary" />
//       <Tag text="DEFAULT" />   */}
// {/* 
//     <StatCard 
//       value="2,847" 
//       label="Total Users" 
//       icon="👥"
//       change={12.5}
//     />

//     <StatCard 
//       value="$12,450" 
//       label="Revenue" 
//       icon="💰"
//       change={-5.2}
//     />

//     <StatCard 
//       value="89%" 
//       label="Conversion Rate" 
//     /> */}
//     <RecipeList />
//     </View>
//   );
// }


import { Avatar, Tag, StatCard, RecipeList } from "@/exercises"; 
import { SafeAreaView, StyleSheet } from "react-native";

export default function Index() {
  return (
    <SafeAreaView style={styles.safe}>
      <RecipeList />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,                  
    backgroundColor: '#F5F5F5' 
  },
});
