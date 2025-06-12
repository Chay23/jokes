import Grid from '@mui/material/Grid';
import JokeCard from './item/JokeCard';
import { useAppSelector } from '../../../hooks/redux/hooks';

export default function JokesList() {
	const jokes = useAppSelector((state) => state.jokes.jokesList);
	return (
		<>
			<Grid container spacing={3}>
				{jokes.map((joke) => (
					<Grid key={joke.id} size={{ xs: 3 }}>
						<JokeCard key={joke.id} joke={joke} />
					</Grid>
				))}
			</Grid>
		</>
	);
}
