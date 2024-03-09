---
name: 'ui'
root: 'src/app/_components/ui'
output: '.'
ignore: []
questions:
  name: 'Please enter UI name.'
---

# `{{ inputs.name | pascal }}/index.tsx`

```tsx
import { memo } from 'react';

import type { FC, ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

export const {{ inputs.name | pascal }}: FC<Props> = memo(({ children }) => {
    return <div>{ children }</div>;
});
```

# `{{ inputs.name | pascal }}/index.stories.tsx`

```tsx
import type { Meta, StoryObj } from '@storybook/react';

import { {{ inputs.name | pascal }} } from '.';

const meta: Meta<typeof {{ inputs.name | pascal }}> = {
  component: {{ inputs.name | pascal }},
};
export default meta;
type Story = StoryObj<typeof {{ inputs.name | pascal }}>;

export const Default: Story = { args: { children: 'Hello, World!' }};
```
