import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useForm } from '@/hooks/useForm';
import { FormEvent } from 'react';
import { useTaskPostMutation } from '@/hooks/useTaskPostMutation';
import { TASK_STATUS } from '@/hooks/useTaskPostMutation';

const initialFormValues = {
  taskName: '',
  taskNotes: '',
  taskStatus: '',
};

export const DialogComponents = () => {
  const addTask = useTaskPostMutation();

  const { formValues, handleChange, handleSelectChange, resetForm } =
    useForm(initialFormValues);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    addTask.mutate(formValues);

    resetForm();
  };

  return (
    <div className="flex w-full justify-end">
      <Dialog>
        <DialogTrigger asChild>
          <Button className="mx-0 my-2">Add Task</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Task</DialogTitle>
            <DialogDescription>
              Enter the details for the new task.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="taskName">Task</Label>
              <Input
                id="taskName"
                name="taskName"
                type="text"
                className="mt-2"
                value={formValues.taskName}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="taskNotes">Notes</Label>
              <Input
                id="taskNotes"
                name="taskNotes"
                type="text"
                className="mt-2"
                value={formValues.taskNotes}
                onChange={handleChange}
              />
            </div>
            <div>
              <Label htmlFor="taskStatus">Status</Label>
              <Select
                value={formValues.taskStatus}
                onValueChange={(value) =>
                  handleSelectChange('taskStatus', value)
                }
              >
                <SelectTrigger className="mt-2">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(TASK_STATUS).map(([key, value]) => (
                    <SelectItem key={value.id} value={value.name}>
                      {key}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex justify-end">
              <Button type="submit">Submit</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};
