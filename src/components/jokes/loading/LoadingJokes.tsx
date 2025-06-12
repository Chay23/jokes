import { Grid } from '@mui/material';
import LoadingJokeCard from './LoadingJokeCard';

export default function LoadingJokes() {
	return (
		<Grid container spacing={3}>
			{[...new Array(12)].map((_, index) => (
				<Grid key={index} size={{ xs: 3 }}>
					<LoadingJokeCard />
				</Grid>
			))}
		</Grid>
	);
}
