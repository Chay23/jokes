import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
	components: {
		MuiCard: {
			styleOverrides: {
				root: ({ theme }) => ({
					borderRadius: +theme.shape.borderRadius * 3,
				}),
			},
		},
		MuiButton: {
			styleOverrides: {
				root: ({ theme }) => ({
					borderRadius: +theme.shape.borderRadius * 2,
				}),
			},
		},
		MuiIconButton: {
			styleOverrides: {
				root: ({ theme }) => ({
					borderRadius: +theme.shape.borderRadius * 2,
				}),
			},
		},
		MuiButtonGroup: {
			styleOverrides: {
				root: ({ theme }) => ({
					borderRadius: +theme.shape.borderRadius * 2,
				}),
			},
		},
	},
});
