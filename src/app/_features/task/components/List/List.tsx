"use client";

import {
	DragDropContext,
	Draggable,
	type DropResult,
	Droppable,
} from "@hello-pangea/dnd";
import type { Status } from "@prisma/client";

import { Avatar, Box, Flex, Text, Title, Tooltip } from "@mantine/core";
import cx from "clsx";
import { format } from "date-fns";
import Link from "next/link";
import { type FC, useState } from "react";
import type { TaskList as TaskListType } from "~/@types/task";
import {
	STATUS_COLOR_MAP,
	statusGuard,
} from "~/app/_features/status/@types/status";
import { DeleteButtonAction } from "..";
import classes from "./index.module.css";

type Props = {
	taskList: TaskListType;
	statusList: Status[];
};

/**
 * Moves an item from one list to another list.
 */
const move = (
	source: TaskListType,
	destination: TaskListType,
	droppableSource: DropResult["source"],
	droppableDestination: DropResult["destination"],
) => {
	const sourceClone = Array.from(source);
	const destClone = Array.from(destination);
	const [removed] = sourceClone.splice(droppableSource.index, 1);

	if (!droppableDestination || !removed) return;
	destClone.splice(droppableDestination.index, 0, removed);

	const result = {} as Record<number, TaskListType>;
	result[Number.parseInt(droppableSource.droppableId, 10)] = sourceClone;
	result[Number.parseInt(droppableDestination.droppableId, 10)] = destClone;

	return result;
};

const reorder = (list: TaskListType, startIndex: number, endIndex: number) => {
	const result = Array.from(list);
	const [removed] = result.splice(startIndex, 1);
	if (!removed) return;
	result.splice(endIndex, 0, removed);

	return result;
};

export const TaskList: FC<Props> = ({ taskList, statusList }) => {
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
		<div className={classes.board}>
			<DragDropContext onDragEnd={handleDragEnd}>
				{statusList.map((status, idx) => (
					<Droppable key={status.id} droppableId={`${idx}`}>
						{(provided, snapshot) => (
							<div
								ref={provided.innerRef}
								className={cx(classes.panel, {
									[classes.panelDragOver ?? ""]: snapshot.isDraggingOver,
								})}
								{...provided.droppableProps}
							>
								<Title
									order={2}
									c={
										statusGuard(status.title)
											? STATUS_COLOR_MAP[status.title]
											: "dark"
									}
									className={cx(classes.heading, {
										[classes.panelDragOver ?? ""]: snapshot.isDraggingOver,
									})}
								>
									{status.title}
								</Title>
								<Box className={classes.tasks}>
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
												>
													<Flex
														direction="column"
														gap="xs"
														className={classes.dragHandle}
													>
														<Link
															href={`/task/${card.id}`}
															className={classes.cardLink}
														>
															<Title order={4} lineClamp={2}>
																{card.title}
															</Title>
															<Text lineClamp={2} c="dimmed">
																created: {format(card.createdAt, "yyyy-MM-dd")}
															</Text>
														</Link>
														<Flex align="center" gap="xs">
															<Tooltip label={card.username}>
																<Avatar size="sm" src={card.userIconUrl} />
															</Tooltip>
															<DeleteButtonAction id={card.id} />
														</Flex>
													</Flex>
												</div>
											)}
										</Draggable>
									))}
								</Box>
								{provided.placeholder}
							</div>
						)}
					</Droppable>
				))}
			</DragDropContext>
		</div>
	);
};
