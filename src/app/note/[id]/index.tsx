import React, { useEffect, useState } from "react";
import {
	View,
	Text,
	ScrollView,
	Pressable,
	ActivityIndicator,
} from "react-native";
import { useLocalSearchParams, router } from "expo-router";
import { ChevronLeft, Edit, Trash2 } from "lucide-react-native";
import { STATUS_COLORS } from "@/constants/theme";
import { useNotesStore } from "@/store/useNoteStore";

export default function NoteDetailScreen() {
	const { id } = useLocalSearchParams<{ id: string }>();
	const { notes, deleteNote } = useNotesStore();
	const [note, setNote] = useState<NoteModel | null>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		if (id) {
			const foundNote = notes.find((n) => n.id === id);
			setNote(foundNote || null);
		}
		setLoading(false);
	}, [id, notes]);

	const handleDelete = async () => {
		if (id) {
			await deleteNote(id);
			router.replace("/");
		}
	};

	if (loading) {
		return (
			<View className="flex-1 justify-center items-center bg-neutral-50">
				<ActivityIndicator size="large" color="#0ea5e9" />
			</View>
		);
	}

	if (!note) {
		return (
			<View className="flex-1 justify-center items-center bg-neutral-50 p-4">
				<Text className="text-xl font-semibold text-neutral-800 mb-2">
					Note not found
				</Text>
				<Text className="text-neutral-600 text-center mb-6">
					The note you're looking for doesn't exist or has been deleted.
				</Text>
				<Pressable
					onPress={() => router.replace("/")}
					className="bg-primary-500 px-6 py-3 rounded-lg"
				>
					<Text className="text-white font-medium">Go Home</Text>
				</Pressable>
			</View>
		);
	}

	const { title, description, status, createdAt, updatedAt } = note;
	const statusColors = STATUS_COLORS[status];

	const formatDate = (timestamp: number) => {
		return new Date(timestamp).toLocaleDateString("en-US", {
			year: "numeric",
			month: "long",
			day: "numeric",
			hour: "2-digit",
			minute: "2-digit",
		});
	};

	return (
		<View className="flex-1 bg-neutral-50">
			<View className="flex-row justify-between items-center p-4 pt-12 bg-white border-b border-neutral-200">
				<Pressable onPress={() => router.back()} className="p-2" hitSlop={8}>
					<ChevronLeft size={24} color="#333" />
				</Pressable>
				<View className="flex-row gap-4">
					<Pressable
						onPress={() => router.push(`/note/${id}/edit`)}
						className="p-2"
						hitSlop={8}
					>
						<Edit size={24} color="#333" />
					</Pressable>
					<Pressable onPress={handleDelete} className="p-2" hitSlop={8}>
						<Trash2 size={24} color="#ef4444" />
					</Pressable>
				</View>
			</View>

			<ScrollView className="flex-1 p-4">
				<View className="mb-4 flex-row">
					<Text
						className={`px-3 py-1 rounded-full ${statusColors.bg} ${statusColors.text}`}
					>
						{status.charAt(0).toUpperCase() + status.slice(1)}
					</Text>
				</View>

				<Text className="text-2xl font-semibold text-neutral-800 mb-4">
					{title}
				</Text>

				<Text className="text-neutral-700 mb-8 leading-6">{description}</Text>

				<View className="border-t border-neutral-200 pt-4">
					<View className="flex-row justify-between mb-2">
						<Text className="text-neutral-500 text-sm">Created:</Text>
						<Text className="text-neutral-700 text-sm">
							{formatDate(createdAt)}
						</Text>
					</View>
					<View className="flex-row justify-between">
						<Text className="text-neutral-500 text-sm">Last updated:</Text>
						<Text className="text-neutral-700 text-sm">
							{formatDate(updatedAt)}
						</Text>
					</View>
				</View>
			</ScrollView>
		</View>
	);
}
