import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import * as ScreenOrientation from "expo-screen-orientation";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { ThemeProvider } from "@/context/theme-context";
import "../global.css";

export default function Layout() {
	ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);

	return (
		<GestureHandlerRootView className="flex flex-1 ">
			<ThemeProvider>
				<Stack
					screenOptions={{
						headerShown: false,
					}}
				>
					<Stack.Screen name="(tabs)" options={{ headerShown: false }} />
					<Stack.Screen name="create" options={{ presentation: "modal" }} />
					<Stack.Screen
						name="note/[id]/index"
						options={{ animation: "slide_from_right" }}
					/>
					<Stack.Screen
						name="note/[id]/edit"
						options={{ presentation: "modal" }}
					/>
				</Stack>
				<StatusBar style="auto" />
			</ThemeProvider>
		</GestureHandlerRootView>
	);
}
