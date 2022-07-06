import {
  ChangeEvent,
  FocusEventHandler,
  KeyboardEventHandler,
  useRef,
} from 'react';
import { nonNullable } from '../../../../../../utils';
import {
  findNextFocusableTreeItem,
  findNextSiblings,
  findParentTreeViewNode,
  findPrevSiblings,
  findTreeItemControl,
  findTreeViewLeafControl,
  findTreeViewNodeControl,
  noop,
} from '../../utils';
import { Checkbox } from './Checkbox';

interface Props<T extends string | number> {
  id: T;
  label: string;
  disabled?: boolean;
  checked: boolean;
  className?: string;
  onChange(id: T, checked: boolean): void;
  onBlur?: FocusEventHandler<HTMLInputElement>;
}

export const TreeViewLeaf = <T extends string | number>({
  checked,
  className,
  disabled,
  id,
  label,
  onChange,
  onBlur = noop,
}: Props<T>) => {
  const rootRef = useRef<HTMLLIElement>(null);

  const handleChange = (evt: ChangeEvent<HTMLInputElement>) => {
    onChange(id, evt.target.checked);
  };

  const handleCheckboxKeyPress: KeyboardEventHandler<HTMLInputElement> = (
    evt
  ) => {
    const root = rootRef.current;
    if (!root) return;
    const key = evt.key;

    switch (key) {
      case 'ArrowUp': {
        const prevSiblings = findPrevSiblings(root);

        const siblingInputs = prevSiblings
          .map(findTreeViewLeafControl)
          .filter(nonNullable);

        const enabledInput = siblingInputs.find((input) => !input.disabled);

        if (enabledInput) {
          enabledInput.focus();
        } else {
          const treeViewNode = findParentTreeViewNode(root);

          if (treeViewNode) {
            findTreeViewNodeControl(treeViewNode)?.focus();
          }
        }

        break;
      }

      case 'ArrowDown': {
        const nextSiblings = findNextSiblings(root);

        const siblingInputs = nextSiblings
          .map(findTreeViewLeafControl)
          .filter(nonNullable);

        const enabledInput = siblingInputs.find((input) => !input.disabled);

        if (enabledInput) {
          enabledInput.focus();
        } else {
          const focusableItemRoot = findNextFocusableTreeItem(root);
          if (focusableItemRoot) {
            findTreeItemControl(focusableItemRoot)?.focus();
          }
        }

        break;
      }
    }
  };

  return (
    <li
      ref={rootRef}
      className={className}
      role="treeitem"
      aria-selected={checked}
      data-disabled={disabled}
    >
      <Checkbox
        label={label}
        checked={checked}
        onChange={handleChange}
        onBlur={onBlur}
        onKeyDown={handleCheckboxKeyPress}
        disabled={disabled}
      />
    </li>
  );
};
