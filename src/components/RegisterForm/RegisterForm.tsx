// React
import { useState } from 'react'

// Redux
import { useAppDispatch } from '@/redux/store'
import { login } from '@/redux/slices/auth.slice'

// Fetch
import { GET, POST } from '@/lib/fetch'

// React Hook Form
import { useForm } from 'react-hook-form'

const RegisterForm: React.FC = () => {
	const dispatch = useAppDispatch()

	const { register, handleSubmit } = useForm({
		defaultValues: {
			email: '',
			username: '',
			password: '',
		},
	})

	const onSubmit = handleSubmit(async (data) => {
		const response = await POST('/auth/register', data)

		if (response) {
			const { access_token } = response

			dispatch(login(access_token))

			const me = await GET('/auth/me', {
				Authorization: 'Bearer ' + access_token,
			})

			dispatch(login(me))
		}
	})

	return (
		<form onSubmit={onSubmit} className='space-y-4'>
			<div>
				<label>Username</label>
				<input type='text' className='input' {...register('username')} />
			</div>
			<div>
				<label>Password</label>
				<input type='password' className='input' {...register('password')} />
			</div>
			<div>
				<label>Email Address</label>
				<input type='text' className='input' {...register('email')} />
			</div>
			<button className='ml-auto button button-filled'>
				Register and Play
			</button>
		</form>
	)
}

export default RegisterForm
