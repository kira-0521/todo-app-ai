"use client";

import {
	DragDropContext,
	Draggable,
	type DropResult,
	Droppable,
} from "@hello-pangea/dnd";
import type { Status, Task } from "@prisma/client";

import cx from "clsx";
import { useRouter } from "next/navigation";
import { type FC, useState } from "react";
import classes from "./index.module.css";

type Props = {
	taskList: Task[];
	statusList: Status[];
};

/**
 * Moves an item from one list to another list.
 */
const move = (
	source: List,
	destination: List,
	droppableSource: DropResult["source"],
	droppableDestination: DropResult["destination"],
) => {
	const sourceClone = Array.from(source);
	const destClone = Array.from(destination);
	const [removed] = sourceClone.splice(droppableSource.index, 1);

	if (!droppableDestination || !removed) return;
	destClone.splice(droppableDestination.index, 0, removed);

	const result = {} as Record<number, List>;
	result[Number.parseInt(droppableSource.droppableId, 10)] = sourceClone;
	result[Number.parseInt(droppableDestination.droppableId, 10)] = destClone;

	return result;
};

const reorder = (list: List, startIndex: number, endIndex: number) => {
	const result = Array.from(list);
	const [removed] = result.splice(startIndex, 1);
	if (!removed) return;
	result.splice(endIndex, 0, removed);

	return result;
};

type List = Task[];
export const TaskList: FC<Props> = ({ taskList, statusList }) => {
	const router = useRouter();
	const [state, setState] = useState(
		statusList.map((s) => taskList.filter((t) => t.statusId === s.id)),
	);

	const handleDragEnd = (result: DropResult) => {
		const { source, destination } = result;

		// dropped outside the list
		if (!destination) {
			return;
		}

		const sIdx = Number.parseInt(source.droppableId, 10);
		const dIdx = Number.parseInt(destination.droppableId, 10);

		if (sIdx === dIdx) {
			// vertical
			const target = state[sIdx];
			if (!target) return;
			const items = reorder(target, source.index, destination.index);
			const newState = [...state];
			if (!items) return;
			newState[sIdx] = items;

			setState(newState);
		} else {
			// horizontal
			const [srcLi, destLi] = [state[sIdx], state[dIdx]];
			if (!srcLi || !destLi) return;
			const result = move(srcLi, destLi, source, destination);
			if (!result) return;
			const newState = [...state];
			const [srcLiResult, destLiResult] = [result[sIdx], result[dIdx]];
			if (!srcLiResult || !destLiResult) return;
			newState[sIdx] = srcLiResult;
			newState[dIdx] = destLiResult;

			setState(newState.filter((group) => group.length));
		}
	};

	return (
		<DragDropContext onDragEnd={handleDragEnd}>
			{statusList.map((el, idx) => (
				<Droppable key={el.id} droppableId={`${idx}`}>
					{(provided, snapshot) => (
						<div
							ref={provided.innerRef}
							className={cx(classes.board, {
								[classes.boardDragOver ?? ""]: snapshot.isDraggingOver,
							})}
							{...provided.droppableProps}
						>
							{(state[idx] ?? []).map((card, index) => (
								<Draggable
									key={card.id}
									draggableId={card.id.toString()}
									index={index}
								>
									{(provided, snapshot) => (
										<div
											ref={provided.innerRef}
											{...provided.draggableProps}
											{...provided.dragHandleProps}
											className={cx(classes.card, {
												[classes.cardDragging ?? ""]: snapshot.isDragging,
											})}
											onClick={() => router.push(`/task/${card.id}`)}
										>
											<div className={classes.dragHandle}>{card.title}</div>
										</div>
									)}
								</Draggable>
							))}
							{provided.placeholder}
						</div>
					)}
				</Droppable>
			))}
		</DragDropContext>
	);
};
