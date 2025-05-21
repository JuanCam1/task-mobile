import React from "react";
import { View } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { NoteForm } from "@/components/NoteForm";

export default function EditNoteScreen() {
	const { id } = useLocalSearchParams<{ id: string }>();

	return (
		<View className="flex-1 bg-neutral-50 pt-12">
			<NoteForm noteId={id} isEditing={true} />
		</View>
	);
}
