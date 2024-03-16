import { memo } from "react";

import type { FC, ReactNode } from "react";

type Props = {
	children: ReactNode;
};

export const StatusPanel: FC<Props> = memo(({ children }) => {
	return <div>{children}</div>;
});
