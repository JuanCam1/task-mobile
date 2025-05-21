import { View } from "react-native";
import { NoteForm } from "@/components/NoteForm";
import { StatusBar } from "expo-status-bar";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const CreateScreen = () => {
	const { top } = useSafeAreaInsets();
	return (
		<>
			<StatusBar style="auto" />
			<View
				className="flex-1 bg-white dark:bg-zinc-900"
				style={{ paddingTop: top }}
			>
				<NoteForm />
			</View>
		</>
	);
};

export default CreateScreen;
