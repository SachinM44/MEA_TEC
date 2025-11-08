import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTasks, createTask, updateTask, deleteTask } from '../slices/taskSlice';
import type { RootState } from '../store';
import { useFormik } from 'formik';
import { z } from 'zod';
import { toFormikValidationSchema } from 'zod-formik-adapter';

const taskSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().optional(),
  status: z.enum(['pending', 'completed']),
});

type TaskFormValues = z.infer<typeof taskSchema> & { id?: number };

const Tasks = () => {
  const dispatch = useDispatch();
  const { tasks, loading, error } = useSelector((state: RootState) => state.tasks);

  useEffect(() => {
    dispatch(fetchTasks() as any);
  }, [dispatch]);

  const formik = useFormik<TaskFormValues>({
    initialValues: { title: '', description: '', status: 'pending' },
    validationSchema: toFormikValidationSchema(taskSchema),
    onSubmit: (values, { resetForm }) => {
      if (values.id) {
        dispatch(updateTask(values as any) as any);
      } else {
        dispatch(createTask(values as any) as any);
      }
      resetForm();
    },
  });

  const handleEdit = (task: any) => {
    formik.setValues({ id: task.id, title: task.title, description: task.description || '', status: task.status });
  };

  const handleDelete = (id: number) => {
    dispatch(deleteTask(id) as any);
  };

  return (
    <div>
      <h2 className="mb-4 text-2xl">My Tasks</h2>
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      <ul className="mb-8">
        {tasks.map((task: any) => (
          <li key={task.id} className="flex items-center justify-between p-2 mb-2 border">
            <div>
              <h3 className="font-bold">{task.title}</h3>
              <p>{task.description}</p>
              <p>Status: {task.status}</p>
            </div>
            <div>
              <button onClick={() => handleEdit(task)} className="mr-2 text-blue-500">Edit</button>
              <button onClick={() => handleDelete(task.id)} className="text-red-500">Delete</button>
            </div>
          </li>
        ))}
      </ul>
      <form onSubmit={formik.handleSubmit} className="p-4 bg-white rounded shadow-md">
        <h3 className="mb-4 text-xl">{formik.values.id ? 'Update Task' : 'Create Task'}</h3>
        <input
          type="text"
          name="title"
          placeholder="Title"
          onChange={formik.handleChange}
          value={formik.values.title}
          className="block w-full p-2 mb-2 border"
        />
        {formik.errors.title && <p className="text-red-500">{formik.errors.title}</p>}
        <textarea
          name="description"
          placeholder="Description"
          onChange={formik.handleChange}
          value={formik.values.description}
          className="block w-full p-2 mb-2 border"
        />
        <select
          name="status"
          onChange={formik.handleChange}
          value={formik.values.status}
          className="block w-full p-2 mb-2 border"
        >
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
        </select>
        <button type="submit" className="w-full p-2 text-white bg-blue-500">
          {formik.values.id ? 'Update' : 'Create'}
        </button>
      </form>
    </div>
  );
};

export default Tasks;