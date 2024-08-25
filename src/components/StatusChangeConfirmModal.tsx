import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

type StatusChangeConfirmModalProps = {
  id: string;
  isOpen: boolean;
  onClose: () => void;
};

export const StatusChangeConfirmModal: React.FC<
  StatusChangeConfirmModalProps
> = ({ id, isOpen, onClose }) => {
  const isAssigned = status.data?.status_name === 'assigned';

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="mb-5">상태 변경 확인</DialogTitle>
          <DialogDescription>
            <span
              className={`rounded-full px-4 py-2 text-center text-xs font-semibold ${
                isAssigned
                  ? 'bg-green-100 text-green-800'
                  : 'bg-red-100 text-red-800'
              }`}
            >
              {isAssigned ? '할당' : '미할당'}
            </span>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button onClick={onClose}>확인</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
