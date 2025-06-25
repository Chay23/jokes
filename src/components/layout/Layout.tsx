import Box from '@mui/material/Box';

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<Box
			sx={{
				marginX: { xs: 2, sm: 6, md: 10, xl: 30 },
				marginY: { xs: 2, sm: 6, md: 8 },
			}}
		>
			{children}
		</Box>
	);
}
