import type { SxProps } from '@mui/material';
import type { Theme } from '@mui/system';

import { useAppSelector } from '../../hooks/redux/hooks';

import ModalWrapper from '@mui/material/Modal';
import Box from '@mui/material/Box';

const style: SxProps<Theme> = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	minWidth: 400,
	bgcolor: 'background.paper',
	p: 4,
};

type Props = {
	id: string;
	children: React.ReactNode;
	onClose: () => void;
};

export default function Modal({ id, children, onClose }: Props) {
	const modal = useAppSelector((state) => state.modals.modals[id]);

	if (!modal) {
		return null;
	}

	return (
		<ModalWrapper open={modal.isOpen} onClose={onClose}>
			<Box sx={style}>{children}</Box>
		</ModalWrapper>
	);
}
