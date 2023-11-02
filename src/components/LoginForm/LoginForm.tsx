// React
import { useState } from 'react'

// Redux
import { useAppDispatch, useAppSelector } from '@/redux/store'
import { login, setAccessToken } from '@/redux/slices/auth.slice'

// Fetch
import { GET, POST } from '@/lib/fetch'

// React Hook Form
import { useForm } from 'react-hook-form'

const LoginForm: React.FC = () => {
	const auth = useAppSelector(({ auth }) => auth)
	const dispatch = useAppDispatch()

	const { register, handleSubmit } = useForm({
		defaultValues: {
			username: '',
			password: '',
		},
	})

	const onSubmit = handleSubmit(async (data) => {
		const response = await POST('/auth/login', data)

		if (response) {
			const { access_token } = response

			dispatch(setAccessToken(access_token))

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
			<button className='ml-auto button button-filled'>Login and Play</button>
		</form>
	)
}

export default LoginForm
