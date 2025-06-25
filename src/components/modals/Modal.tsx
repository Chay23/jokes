import type { ModalProps, SxProps } from '@mui/material';
import type { Theme } from '@mui/system';

import { useAppSelector } from '../../hooks/redux/hooks';

import ModalWrapper from '@mui/material/Modal';
import Box from '@mui/material/Box';

type Props = {
	id: string;
	children: React.ReactNode;
	onClose: () => void;
	sx?: SxProps<Theme>;
} & Omit<ModalProps, 'children' | 'open' | 'onClose' | 'sx'>;

export default function Modal({ id, children, sx, onClose, ...props }: Props) {
	const modal = useAppSelector((state) => state.modals.modals[id]);

	if (!modal) {
		return null;
	}

	return (
		<ModalWrapper open={modal.isOpen} onClose={onClose} {...props}>
			<Box
				sx={{
					position: 'absolute',
					top: '50%',
					left: '50%',
					transform: 'translate(-50%, -50%)',
					minWidth: 250,
					bgcolor: 'background.paper',
					p: 4,
					borderRadius: 3,
					...sx,
				}}
			>
				{children}
			</Box>
		</ModalWrapper>
	);
}
