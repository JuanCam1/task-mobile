import { View } from "react-native";
import { NoteForm } from "@/components/NoteForm";
import { StatusBar } from "expo-status-bar";

const CreateScreen = () => {
	return (
		<>
			<StatusBar style="auto" />
			<View className="flex-1 bg-white dark:bg-zinc-900">
				<NoteForm />
			</View>
		</>
	);
};

export default CreateScreen;
