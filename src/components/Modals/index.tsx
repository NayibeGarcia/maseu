'use client'
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
  useDisclosure,
} from '@nextui-org/react'
import './style.scss'

interface Props {
  children: (onClose: () => void) => React.ReactNode
  title?: string
  buttonText?: string
  callback?: () => void
  showBtn?: boolean
  blockClass?: string
}

export default function Modals({
  children,
  title,
  callback,
  buttonText,
  showBtn,
  blockClass,
}: Props) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()

  return (
    <>
      <Button
        className={`modal_trigger modal_trigger_${blockClass}`}
        onPress={onOpen}
      >
        {buttonText}
      </Button>

      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent className="max-w-3xl max-h-[95vh] overflow-scroll sm:overflow-hidden">
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                {showBtn && title}
              </ModalHeader>
              <ModalBody className='' >{children(onClose)}</ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}
