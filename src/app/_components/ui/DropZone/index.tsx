"use client";

import { Button, Group, Text, rem, useMantineTheme } from "@mantine/core";
import {
	Dropzone as DropzoneMantine,
	type FileWithPath,
	MIME_TYPES,
} from "@mantine/dropzone";
import { IconCloudUpload, IconDownload, IconX } from "@tabler/icons-react";
import { type FC, memo, useRef } from "react";
import classes from "./index.module.css";

type Props = {
	name: string;
	onSelected: (file: FileWithPath[]) => void;
};

export const Dropzone: FC<Props> = memo(({ name, onSelected }) => {
	const theme = useMantineTheme();
	const openRef = useRef<() => void>(null);

	return (
		<div className={classes.wrapper}>
			<DropzoneMantine
				openRef={openRef}
				onDrop={onSelected}
				className={classes.dropzone}
				radius="md"
				accept={[MIME_TYPES.png]}
				maxSize={30 * 1024 ** 2}
				name={name}
			>
				<div style={{ pointerEvents: "none" }}>
					<Group justify="center">
						<DropzoneMantine.Accept>
							<IconDownload
								style={{ width: rem(50), height: rem(50) }}
								color={theme.colors.blue[6]}
								stroke={1.5}
							/>
						</DropzoneMantine.Accept>
						<DropzoneMantine.Reject>
							<IconX
								style={{ width: rem(50), height: rem(50) }}
								color={theme.colors.red[6]}
								stroke={1.5}
							/>
						</DropzoneMantine.Reject>
						<DropzoneMantine.Idle>
							<IconCloudUpload
								style={{ width: rem(50), height: rem(50) }}
								stroke={1.5}
							/>
						</DropzoneMantine.Idle>
					</Group>

					<Text ta="center" fw={700} fz="lg" mt="xl">
						<DropzoneMantine.Accept>Drop files here</DropzoneMantine.Accept>
						<DropzoneMantine.Reject>
							Png file less than 30mb
						</DropzoneMantine.Reject>
						<DropzoneMantine.Idle>Upload resume</DropzoneMantine.Idle>
					</Text>
					<Text ta="center" fz="sm" mt="xs" c="dimmed">
						Drag&apos;n&apos;drop files here to upload. <br />
						We can accept only <i>.png</i> files that are less than 30mb in
						size.
					</Text>
				</div>
			</DropzoneMantine>

			<Button
				className={classes.control}
				size="md"
				radius="xl"
				color="secondary"
				autoContrast
				onClick={() => openRef.current?.()}
			>
				Select files
			</Button>
		</div>
	);
});
