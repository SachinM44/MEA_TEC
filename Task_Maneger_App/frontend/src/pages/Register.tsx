import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../slices/authSlice';
import type { RootState } from '../store';
import { z } from 'zod';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import { useNavigate } from 'react-router-dom';

const registerSchema = z.object({
  username: z.string().min(1, 'Username is required'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state: RootState) => state.auth);

  const formik = useFormik({
    initialValues: { username: '', password: '' },
    validationSchema: toFormikValidationSchema(registerSchema),
    onSubmit: (values) => {
      dispatch(register(values) as any).then(() => navigate('/tasks'));
    },
  });

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <form onSubmit={formik.handleSubmit} className="p-8 bg-white rounded shadow-md">
        <h2 className="mb-4 text-2xl">Register</h2>
        {error && <p className="text-red-500">{error}</p>}
        <input
          type="text"
          name="username"
          placeholder="Username"
          onChange={formik.handleChange}
          value={formik.values.username}
          className="block w-full p-2 mb-2 border"
        />
        {formik.errors.username && <p className="text-red-500">{formik.errors.username}</p>}
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={formik.handleChange}
          value={formik.values.password}
          className="block w-full p-2 mb-2 border"
        />
        {formik.errors.password && <p className="text-red-500">{formik.errors.password}</p>}
        <button type="submit" disabled={loading} className="w-full p-2 text-white bg-blue-500">
          {loading ? 'Registering...' : 'Register'}
        </button>
      </form>
    </div>
  );
};

export default Register;