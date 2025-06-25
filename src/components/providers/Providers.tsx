import type { ReactNode } from 'react';

import { ThemeProvider } from '@emotion/react';
import { theme } from '../../theme/theme';
import { Provider } from 'react-redux';
import { store } from '../../store/store';

type Props = {
	children: ReactNode;
};

export default function Providers({ children }: Props) {
	return (
		<ThemeProvider theme={theme}>
			<Provider store={store}>{children}</Provider>
		</ThemeProvider>
	);
}
