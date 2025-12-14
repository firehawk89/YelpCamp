import type { Meta, StoryObj } from '@storybook/react-vite';

import Input, { inputVariants } from '@/components/Input';
import { MailIcon, SearchIcon } from '@/icons';

const meta = {
  title: 'Atoms/Input',
  component: Input,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    id: {
      control: 'text',
      description: 'The id of the input',
      table: {
        defaultValue: { summary: 'input' },
      },
    },
    placeholder: {
      control: 'text',
      description: 'The placeholder of the input',
      table: {
        defaultValue: { summary: 'Placeholder' },
      },
    },
    variant: {
      control: 'select',
      options: Object.keys(inputVariants.variants.variant),
      description: 'The variant of the input',
      table: {
        defaultValue: { summary: 'default' },
      },
    },
    size: {
      control: 'select',
      options: Object.keys(inputVariants.variants.size),
      description: 'The size of the input',
      table: {
        defaultValue: { summary: 'default' },
      },
    },
  },
} satisfies Meta<typeof Input>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    type: 'text',
    placeholder: 'Placeholder',
  },
  parameters: {
    docs: {
      description: {
        story: 'The default input component displaying a text input.',
      },
    },
  },
};

export const WithLabel: Story = {
  args: {
    id: 'input',
    type: 'text',
    placeholder: 'Placeholder',
    label: 'Label',
  },
  parameters: {
    docs: {
      description: {
        story: 'The input component displaying a text input with a label.',
      },
    },
  },
};

export const WithHelperText: Story = {
  args: {
    type: 'text',
    placeholder: 'Placeholder',
    helperText: 'Helper text for the input',
  },
  parameters: {
    docs: {
      description: {
        story: 'The input component displaying a text input with a helper text.',
      },
    },
  },
};

export const WithLabelAndHelperText: Story = {
  args: {
    id: 'input',
    type: 'text',
    placeholder: 'Placeholder',
    label: 'Label',
    helperText: 'Helper text for the input',
  },
  parameters: {
    docs: {
      description: {
        story: 'The input component displaying a text input with a label and a helper text.',
      },
    },
  },
};

export const WithLeadingIcon: Story = {
  args: {
    type: 'text',
    placeholder: 'Placeholder',
    leadingIcon: SearchIcon,
  },
  parameters: {
    docs: {
      description: {
        story: 'The input component displaying a text input with a leading icon.',
      },
    },
  },
};

export const WithTrailingIcon: Story = {
  args: {
    type: 'text',
    placeholder: 'Placeholder',
    trailingIcon: (props) => <MailIcon variant="outline" {...props} />,
  },
  parameters: {
    docs: {
      description: {
        story: 'The input component displaying a text input with a trailing icon.',
      },
    },
  },
};

export const WithLeadingAndTrailingIcons: Story = {
  args: {
    type: 'text',
    placeholder: 'Placeholder',
    leadingIcon: SearchIcon,
    trailingIcon: (props) => <MailIcon variant="outline" {...props} />,
  },
  parameters: {
    docs: {
      description: {
        story: 'The input component displaying a text input with both leading and trailing icons.',
      },
    },
  },
};

export const Success: Story = {
  args: {
    type: 'text',
    placeholder: 'Placeholder',
    variant: 'success',
  },
  parameters: {
    docs: {
      description: {
        story: 'The input component displaying a text input with a success variant.',
      },
    },
  },
};

export const Error: Story = {
  args: {
    type: 'text',
    placeholder: 'Placeholder',
    variant: 'error',
    helperText: 'Error text for the input',
  },
  parameters: {
    docs: {
      description: {
        story: 'The input component displaying a text input with a error variant.',
      },
    },
  },
};
