import { useCallback, useRef, useState } from 'react';
import { useFocusOut } from './hooks/useFocusOut';
import { useClickAway } from 'react-use';
import {
  TreeNode,
  findNodesByKeyword,
  checkNodeNameContainsText,
  noop,
} from './utils';
import cn from 'classnames';
import FilterInput from './components/FilterInput/FilterInput';
import TreeView from './components/TreeView';
import styles from './Multiselect.module.scss';
import { Collapse } from '../Collapse';

const DEFAULT_DROPBOX_HEIGHT = 'auto';

export interface MultiselectProps {
  selected?: string[];
  className?: string;
  data?: TreeNode[];
  error?: boolean;
  dropboxHeight?: number | string;
  placeholder?: string;
  autoFocus?: boolean;
  disabledNode?: (node: TreeNode) => boolean;
  onBlur?: () => void;
  onChange?: (checked: string[]) => void;
  onClose?: () => void;
  onFocus?: () => void;
  onOpen?: () => void;
}

export const Multiselect = ({
  autoFocus,
  data = [],
  selected = [],
  className,
  error,
  placeholder,
  onChange = noop,
  onClose = noop,
  onOpen = noop,
  onBlur = noop,
  onFocus,
  disabledNode,
  dropboxHeight = DEFAULT_DROPBOX_HEIGHT,
}: MultiselectProps) => {
  const [filterString, setFilterString] = useState('');
  const ref = useRef<HTMLDivElement | null>(null);
  const [isOpen, setOpen] = useState(Boolean(autoFocus));

  const close = useCallback(() => {
    setOpen(false);
    setFilterString('');
    onClose();
    onBlur();
  }, [onBlur, onClose]);

  useFocusOut(ref, close, [], isOpen);

  const handleClickOutside = useCallback(() => {
    if (isOpen) close();
  }, [close, isOpen]);

  useClickAway(ref, handleClickOutside);

  const handleOpenClick = useCallback(() => {
    onOpen();
    setOpen(true);
  }, [onOpen]);

  const handleFilterInputChange = useCallback((value: string) => {
    setFilterString(value);
  }, []);

  const filterNode = (node: TreeNode) => {
    if (node.children && node.children.length) {
      const matchedChildrens = findNodesByKeyword(filterString, node.children);
      if (matchedChildrens.length) return true;
    }

    return checkNodeNameContainsText(node, filterString);
  };

  return (
    <div ref={ref} className={cn(styles.wrapper, className)}>
      <FilterInput
        value={filterString}
        autoFocus={autoFocus}
        onInputChange={handleFilterInputChange}
        open={isOpen}
        onOpen={handleOpenClick}
        onFocus={onFocus}
        placeholder={placeholder}
        error={error}
      />

      <Collapse expanded={isOpen}>
        <div className={styles.accordionContent}>
          <div style={{ maxHeight: dropboxHeight }}>
            <TreeView
              data={data}
              dropboxHeight={dropboxHeight}
              selected={selected}
              onChange={onChange}
              filter={filterNode}
              disabledNode={disabledNode}
            />
          </div>
        </div>
      </Collapse>
    </div>
  );
};
