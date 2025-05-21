import { Link, Stack } from "expo-router";
import { Text, View } from "react-native";

export default function NotFoundScreen() {
	return (
		<>
			<Stack.Screen options={{ title: "Oops!" }} />
			<View className="flex flex-1 items-center justify-center p-5">
				<Text className="text-xl font-semibold">Esta Página No Existe</Text>
				<Link href="/" className="mt-4 px-4">
					<Text>Página Inicial</Text>
				</Link>
			</View>
		</>
	);
}
