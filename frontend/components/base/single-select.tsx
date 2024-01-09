import React from 'react';
import { Select, SelectProps, SelectItem } from '@nextui-org/react';

// Define your custom props and extend from SelectProps
interface SingleSelectProps extends Omit<SelectProps, 'children'> {
  selected: string | undefined;
  setSelected: (value: string) => void;
  valList: string[];
}

const SingleSelect: React.FC<SingleSelectProps> = ({
  selected,
  setSelected,
  valList,
  classNames,
  ...props // Spread the rest of the props
}) => {
  // Function to handle selection changes
  const handleSelectionChange = (key: any) => {
    setSelected((key as Set<string>).values().next().value);
  };

  // Merge custom class names with defaults
  const mergedClassNames = {
    ...classNames,
    trigger: `${classNames?.trigger || ''}`,
  };

  return (
    <Select
      labelPlacement='inside'
      selectionMode='single'
      disallowEmptySelection={selected ? true : false}
      selectedKeys={selected ? [selected] : undefined}
      onSelectionChange={handleSelectionChange}
      items={valList.map((k) => ({ val: k }))}
      classNames={mergedClassNames}
      {...props} // Spread the rest of the props to Select
    >
      {(item: any) => <SelectItem key={item.val}>{item.val}</SelectItem>}
    </Select>
  );
};

export { SingleSelect };
