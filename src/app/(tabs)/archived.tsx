import React from "react";
import { View, Text, StyleSheet, SafeAreaView, Pressable } from "react-native";
import { router } from "expo-router";
import { Archive, CheckCircle2, FilePlus } from "lucide-react-native";
import { useNotesStore } from "@/store/useNoteStore";

export default function CategoriesScreen() {
	const { notes, setFilter } = useNotesStore();

	const activeCount = notes.filter((note) => note.status === "Activo").length;
	const completedCount = notes.filter(
		(note) => note.status === "Completado",
	).length;
	const archivedCount = notes.filter(
		(note) => note.status === "Archivado",
	).length;

	const categories = [
		{
			id: "active",
			name: "Active Notes",
			count: activeCount,
			icon: <FilePlus size={24} color="#0ea5e9" />,
			color: "bg-primary-100",
			textColor: "text-primary-800",
		},
		{
			id: "completed",
			name: "Completed Notes",
			count: completedCount,
			icon: <CheckCircle2 size={24} color="#22c55e" />,
			color: "bg-success-100",
			textColor: "text-success-800",
		},
		{
			id: "archived",
			name: "Archived Notes",
			count: archivedCount,
			icon: <Archive size={24} color="#64748b" />,
			color: "bg-neutral-100",
			textColor: "text-neutral-800",
		},
	];

	// type Category = (typeof categories)[number];
	const handleCategoryPress = (categoryId) => {
		setFilter(categoryId);
		router.push("/");
	};

	return (
		<SafeAreaView className="flex-1 bg-white dark:bg-zinc-900">
			<View className="flex-1 px-4 pt-12">
				<Text className="text-2xl font-semibold mb-6">Categories</Text>

				<View className="flex gap-4">
					{categories.map((category) => (
						<Pressable
							key={category.id}
							onPress={() => handleCategoryPress(category.id)}
							className={`p-4 rounded-lg border border-neutral-200 ${category.color}`}
						>
							<View className="flex-row items-center justify-between">
								<View className="flex-row items-center">
									{category.icon}
									<Text
										className={`ml-3 text-lg font-medium ${category.textColor}`}
									>
										{category.name}
									</Text>
								</View>
								<View className="bg-white px-3 py-1 rounded-full">
									<Text className={`${category.textColor} font-medium`}>
										{category.count}
									</Text>
								</View>
							</View>
						</Pressable>
					))}
				</View>
			</View>
		</SafeAreaView>
	);
}
