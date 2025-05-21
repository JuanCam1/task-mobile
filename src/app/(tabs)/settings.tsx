import React from "react";
import {
	View,
	Text,
	Pressable,
	SafeAreaView,
	ScrollView,
	Switch,
	Alert,
} from "react-native";
import {
	AlertCircle,
	Brush,
	HelpCircle,
	Moon,
	Smartphone,
	Trash2,
	User,
} from "lucide-react-native";
import { useNotesStore } from "@/store/useNoteStore";
import { clearAllNotes } from "@/services/storage";

export default function SettingsScreen() {
	const { notes, fetchNotes } = useNotesStore();
	const [darkMode, setDarkMode] = React.useState(false);

	const handleClearNotes = async () => {
		Alert.alert(
			"Clear All Notes",
			"This will permanently delete all your notes. This action cannot be undone.",
			[
				{
					text: "Cancel",
					style: "cancel",
				},
				{
					text: "Delete",
					onPress: async () => {
						await clearAllNotes();
						fetchNotes();
					},
					style: "destructive",
				},
			],
		);
	};

	const SettingItem = ({ icon, title, subtitle, right, onPress, isLast }) => (
		<Pressable
			onPress={onPress}
			className={`flex-row items-center justify-between py-4 ${
				isLast ? "" : "border-b border-neutral-200"
			}`}
		>
			<View className="flex-row items-center">
				<View className="w-10 h-10 rounded-full bg-neutral-100 items-center justify-center mr-3">
					{icon}
				</View>
				<View>
					<Text className="text-neutral-800 font-medium">{title}</Text>
					{subtitle && (
						<Text className="text-neutral-500 text-sm">{subtitle}</Text>
					)}
				</View>
			</View>
			{right}
		</Pressable>
	);

	const settings = [
		{
			id: "appearance",
			title: "Dark Mode",
			icon: <Moon size={20} color="#475569" />,
			right: (
				<Switch
					value={darkMode}
					onValueChange={setDarkMode}
					trackColor={{ false: "#e2e8f0", true: "#0ea5e9" }}
					thumbColor="#ffffff"
				/>
			),
		},
		{
			id: "theme",
			title: "Theme",
			subtitle: "Change app color theme",
			icon: <Brush size={20} color="#475569" />,
		},
		{
			id: "app-info",
			title: "App Info",
			subtitle: "Version 1.0",
			icon: <Smartphone size={20} color="#475569" />,
		},
		{
			id: "help",
			title: "Help & Support",
			subtitle: "FAQs, contact us",
			icon: <HelpCircle size={20} color="#475569" />,
		},
		{
			id: "clear",
			title: "Clear All Notes",
			subtitle: `Delete all ${notes.length} notes`,
			icon: <Trash2 size={20} color="#ef4444" />,
			onPress: handleClearNotes,
		},
	];

	return (
		<SafeAreaView className="flex-1 bg-white dark:bg-zinc-900">
			<ScrollView className="flex-1 px-4 pt-12">
				<Text className="text-2xl font-semibold mb-6">Settings</Text>

				<View className="bg-white rounded-lg p-4 shadow-sm mb-6">
					<View className="items-center py-4">
						<View className="w-16 h-16 rounded-full bg-primary-100 items-center justify-center mb-3">
							<User size={32} color="#0ea5e9" />
						</View>
						<Text className="text-lg font-semibold">Notes App User</Text>
						<Text className="text-neutral-500">
							Your minimalist note-taking app
						</Text>
					</View>
				</View>

				<View className="bg-white rounded-lg p-4 shadow-sm mb-6">
					{settings.map((item, index) => (
						<SettingItem
							key={item.id}
							icon={item.icon}
							title={item.title}
							subtitle={item.subtitle}
							right={item.right}
							onPress={item.onPress}
							isLast={index === settings.length - 1}
						/>
					))}
				</View>

				<View className="bg-warning-100 p-4 rounded-lg mb-6 flex-row items-start">
					<AlertCircle size={20} color="#b45309" className="mr-2" />
					<View className="flex-1">
						<Text className="text-warning-700 font-medium mb-1">
							Local Storage Only
						</Text>
						<Text className="text-warning-700 text-sm">
							Your notes are saved locally on this device only. Make sure to
							back them up.
						</Text>
					</View>
				</View>
			</ScrollView>
		</SafeAreaView>
	);
}
