import Box from '@mui/material/Box';

export default function Layout({ children }: { children: React.ReactNode }) {
	return <Box sx={{ marginX: { xs: 10, xl: 30 }, marginY: 5 }}>{children}</Box>;
}
