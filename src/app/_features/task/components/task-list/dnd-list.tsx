"use client";

import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";
import { Text, rem } from "@mantine/core";
import { useListState } from "@mantine/hooks";
import type { Task } from "@prisma/client";
import { IconGripVertical } from "@tabler/icons-react";
import cx from "clsx";
import type { FC } from "react";
import classes from "./index.module.css";

type Props = {
	taskList: Task[];
};

export const DnDList: FC<Props> = ({ taskList }) => {
	const [state, handlers] = useListState(taskList);

	const items = state.map((item, index) => (
		<Draggable key={item.id} index={index} draggableId={item.id.toString()}>
			{(provided, snapshot) => (
				<div
					className={cx(classes.item, {
						[classes.itemDragging ?? ""]: snapshot.isDragging,
					})}
					ref={provided.innerRef}
					{...provided.draggableProps}
				>
					<div {...provided.dragHandleProps} className={classes.dragHandle}>
						<IconGripVertical
							style={{ width: rem(18), height: rem(18) }}
							stroke={1.5}
						/>
					</div>
					<Text>{item.title}</Text>
				</div>
			)}
		</Draggable>
	));

	return (
		<DragDropContext
			onDragEnd={({ destination, source }) =>
				handlers.reorder({ from: source.index, to: destination?.index || 0 })
			}
		>
			<Droppable droppableId="dnd-list" direction="vertical">
				{(provided) => (
					<div {...provided.droppableProps} ref={provided.innerRef}>
						{items}
						{provided.placeholder}
					</div>
				)}
			</Droppable>
		</DragDropContext>
	);
};
