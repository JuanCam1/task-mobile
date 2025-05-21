import { Pressable, Text, View } from "react-native";
import { Link } from "expo-router";
import { Archive, CheckSquare, Edit, Trash2 } from "lucide-react-native";
import { Swipeable } from "react-native-gesture-handler";
import Animated, { FadeInRight, FadeOutRight } from "react-native-reanimated";
import { STATUS_COLORS } from "@/constants/theme";
import { useNotesStore } from "@/store/useNoteStore";

interface NoteItemProps {
	note: NoteModel;
}

interface ActionProps {
	icon: React.ReactNode;
	label: string;
	onPress: () => void;
	bgColor: string;
}

const SwipeAction = ({ icon, label, onPress, bgColor }: ActionProps) => (
	<Pressable
		onPress={onPress}
		className={`w-20 h-full justify-center items-center ${bgColor}`}
	>
		{icon}
		<Text className="text-white text-xs mt-1">{label}</Text>
	</Pressable>
);

export function NoteItem({ note }: NoteItemProps) {
	const { updateNoteStatus, deleteNote } = useNotesStore();
	const { title, description, status, updatedAt } = note;
	const statusColors = STATUS_COLORS[status];

	const renderRightActions = () => (
		<View className="flex flex-row">
			{status === "active" && (
				<SwipeAction
					icon={<CheckSquare size={20} color="white" />}
					label="Complete"
					onPress={() => updateNoteStatus(note.id, "completed")}
					bgColor="bg-success-500"
				/>
			)}
			{status !== "archived" && (
				<SwipeAction
					icon={<Archive size={20} color="white" />}
					label="Archive"
					onPress={() => updateNoteStatus(note.id, "archived")}
					bgColor="bg-neutral-500"
				/>
			)}
			<SwipeAction
				icon={<Trash2 size={20} color="white" />}
				label="Delete"
				onPress={() => deleteNote(note.id)}
				bgColor="bg-error-500"
			/>
		</View>
	);

	const formattedDate = new Date(updatedAt).toLocaleDateString("en-US", {
		month: "short",
		day: "numeric",
		year: "numeric",
	});

	return (
		<Animated.View
			entering={FadeInRight}
			exiting={FadeOutRight}
			className="mb-3"
		>
			<Swipeable renderRightActions={renderRightActions}>
				<Link href={`/note/${note.id}`} asChild>
					<Pressable>
						<View
							className={`p-4 rounded-lg border ${statusColors.border} ${statusColors.bg}`}
						>
							<View className="flex-row justify-between items-start">
								<Text
									className="font-semibold text-lg mb-1 flex-1"
									numberOfLines={1}
								>
									{title}
								</Text>
								<View className="flex-row items-center gap-2">
									<Text className="text-xs text-neutral-500">
										{formattedDate}
									</Text>
									<Link href={`/note/${note.id}/edit`} asChild>
										<Pressable
											className="p-1 rounded-full bg-neutral-200"
											hitSlop={8}
										>
											<Edit size={14} color="#333" />
										</Pressable>
									</Link>
								</View>
							</View>
							<Text className="text-neutral-700 mb-2" numberOfLines={2}>
								{description}
							</Text>
							<View className="flex-row">
								<Text
									className={`text-xs px-2 py-1 rounded-full ${statusColors.bg} ${statusColors.text}`}
								>
									{status.charAt(0).toUpperCase() + status.slice(1)}
								</Text>
							</View>
						</View>
					</Pressable>
				</Link>
			</Swipeable>
		</Animated.View>
	);
}
