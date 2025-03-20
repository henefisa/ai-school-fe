import { useCallback, useId, useState } from 'react';
import { useCallbackRef } from './use-callback-ref';

export interface UseDisclosureProps {
  isOpen?: boolean;
  defaultIsOpen?: boolean;
  onClose?: () => void;
  onOpen?: () => void;
  id?: string;
}

export function useDisclosure(props: UseDisclosureProps = {}) {
  const {
    onClose: onCloseProp,
    onOpen: onOpenProp,
    isOpen: isOpenProp,
    id: idProp,
  } = props;

  const handleOpen = useCallbackRef(onOpenProp);
  const handleClose = useCallbackRef(onCloseProp);
  const [isOpenState, setIsOpen] = useState(props.defaultIsOpen || false);
  const isOpen = isOpenProp !== undefined ? isOpenProp : isOpenState;
  const isControlled = isOpenProp !== undefined;

  const uid = useId();
  const id = idProp ?? `disclosure-${uid}`;

  const onClose = useCallback(() => {
    if (!isControlled) {
      setIsOpen(false);
    }

    handleClose?.();
  }, [isControlled, handleClose]);

  const onOpen = useCallback(() => {
    if (!isControlled) {
      setIsOpen(true);
    }

    handleOpen?.();
  }, [isControlled, handleOpen]);

  const onToggle = useCallback(() => {
    if (isOpen) {
      onClose();
    } else {
      onOpen();
    }
  }, [isOpen, onOpen, onClose]);

  return {
    id,
    isOpen,
    onOpen,
    onClose,
    onToggle,
    isControlled,
  };
}

export type UseDisclosureReturn = ReturnType<typeof useDisclosure>;
