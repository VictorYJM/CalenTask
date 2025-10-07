import { useState, type FC } from "react";
import { HexColorPicker } from "react-colorful";

interface TaskModalProps {
    isOpen: boolean;
    onClose: () => void;
    onAddTask: (task: { title: string, description: string, color: string }) => void;
    selectedDate: Date;
};

const TaskModal: FC<TaskModalProps> = ({ isOpen, onClose, onAddTask, selectedDate }) => {
    const [title, setTitle] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [color, setColor] = useState("#ff0000");

    const handleSubmit = () => {
        onAddTask({ title, description, color });
        onClose();
    };

    if (!isOpen) { return null; }

    return (
        /* Date container management */
        <div className="fixed inset-0 bg-opacity-50 z-50 flex justify-center items-center text-main">
            <div className="bg-main p-6 rounded-lg shadow-xl w-1/3">
                {/* Title */}
                <h2 className="text-xl font-bold mb-4">
                    Add Task for {selectedDate.toDateString()}
                </h2>

                {/* Forms */}
                <div className="space-y-4">
                    {/* Task title */}
                    <input
                        type="text"
                        placeholder="Task Title"
                        value={ title }
                        onChange={ (e) => setTitle(e.target.value) }
                        className="w-full p-2 border rounded"
                    />

                    {/* Task description */}
                    <textarea
                        placeholder="Task Description"
                        value={ description }
                        onChange={ (e) => setDescription(e.target.value) }
                        className="w-full p-2 border rounded"
                    />

                    {/* Task color */}
                    <div className="flex justify-center">
                        <HexColorPicker color={ color } onChange={ setColor } />
                    </div>

                    {/* Buttons */}
                    <div className="flex justify-end space-x-4 mt-4">
                        <button onClick={ onClose } className="p-2 rounded-lg bg-inverse text-inverse">
                            Cancel
                        </button>

                        <button onClick={ handleSubmit } className="p-2 rounded-lg bg-icons-main text-white">
                            Save Task
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TaskModal;