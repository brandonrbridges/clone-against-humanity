type FetchOptions = {
	method: 'GET' | 'POST' | 'PUT' | 'DELETE'
	headers?: Record<string, string>
	body?: object
}

const wrapper = async (
	url: string,
	{ method, headers, body }: FetchOptions
) => {
	const defaultHeaders = {
		'Content-Type': 'application/json',
	}

	try {
		const response = await fetch(process.env.NEXT_PUBLIC_API + url, {
			method,
			headers: {
				...defaultHeaders,
				...headers,
			},
			body: JSON.stringify(body),
		})

		const data = await response.json()

		if (!response.ok) {
			throw new Error(`Fetch failed: ${data.message}`)
		}

		return data
	} catch (error) {
		throw error
	}
}

export const GET = (url: string, headers?: Record<string, string>) =>
	wrapper(url, {
		method: 'GET',
		headers,
	})

export const POST = (
	url: string,
	body: object,
	headers?: Record<string, string>
) =>
	wrapper(url, {
		method: 'POST',
		headers,
		body,
	})

export const PUT = (
	url: string,
	body: object,
	headers?: Record<string, string>
) =>
	wrapper(url, {
		method: 'PUT',
		headers,
		body,
	})

export const DELETE = (
	url: string,
	body: object,
	headers?: Record<string, string>
) =>
	wrapper(url, {
		method: 'DELETE',
		headers,
		body,
	})
