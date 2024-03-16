---
name: 'feature'
root: 'src/app/_features'
output: '.'
ignore: []
questions:
  feature: 'Please enter feature name.'
  component: 'Please enter component name.'
---

# `{{ inputs.feature | pascal }}/components/{{ inputs.component | pascal }}/index.tsx`

```tsx
import { memo } from 'react';

import type { FC, ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

export const {{ inputs.component | pascal }}: FC<Props> = memo(({ children }) => {
    return <div>{ children }</div>;
});
```

# `{{ inputs.feature | pascal }}/components/{{ inputs.component | pascal }}/index.stories.tsx`

```tsx
import type { Meta, StoryObj } from '@storybook/react';

import { {{ inputs.component | pascal }} } from '.';

const meta: Meta<typeof {{ inputs.component | pascal }}> = {
  component: {{ inputs.component | pascal }},
};
export default meta;
type Story = StoryObj<typeof {{ inputs.component | pascal }}>;

export const Default: Story = {};
```
