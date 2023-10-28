const gap = '______'

export const whiteCards = [
	{
		content: 'Something something',
	},
	{
		content: 'Something 2',
	},
	{
		content: 'Something 3',
	},
]

export const blackCards = [
	{
		content: `Something something ${gap}`,
		gap_count: 1,
	},
	{
		content: `Something ${gap} 2`,
		gap_count: 1,
	},
	{
		content: `${gap} Something 3 ${gap}`,
		gap_count: 2,
	},
]
