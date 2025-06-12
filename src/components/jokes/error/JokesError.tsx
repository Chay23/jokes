import { Box, Typography } from '@mui/material';
import Heading from '../../UI/headings/Heading';

export default function JokesError() {
	return (
		<Box
			sx={{
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				justifyContent: 'center',
				padding: 4,
			}}
		>
			<Heading variant='h3' sx={{ marginBottom: 2 }}>
				Error
			</Heading>
			<Typography>
				An error occured while retrieving jokes. Please try to refresh the page.
			</Typography>
		</Box>
	);
}
