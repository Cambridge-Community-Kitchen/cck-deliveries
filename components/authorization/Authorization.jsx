import React from 'react';
import PropTypes from 'prop-types';
import {
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalBody,
	Flex,
	HStack,
	PinInput,
	PinInputField,
	Text,
} from '@chakra-ui/react';

const Authorization = ({ currentPassword, isOpen, onClose, onComplete }) => {
	return (
		<Modal
			closeOnEsc={false}
			closeOnOverlayClick={false}
			onClose={onClose}
			isOpen={isOpen}
			isCentered
		>
			<ModalOverlay />
			<ModalContent>
				<ModalHeader>
					<Flex justify="center">Please enter today's password</Flex>
				</ModalHeader>
				<ModalBody>
					<Flex justify="center" mb={3}>
						<HStack>
							<PinInput
								onComplete={onComplete}
								size="lg"
								type="alphanumeric"
							>
								<PinInputField />
								<PinInputField />
								<PinInputField />
								<PinInputField />
							</PinInput>
						</HStack>
					</Flex>
				</ModalBody>
				<Flex justify="center" mb={4}>
					<Text fontSize="sm">
						(the password is specific to your assigned route)
					</Text>
				</Flex>
			</ModalContent>
		</Modal>
	);
};

Authorization.propTypes = {
	currentPassword: PropTypes.string.isRequired,
	isOpen: PropTypes.bool.isRequired,
	onClose: PropTypes.func.isRequired,
	onComplete: PropTypes.func.isRequired,
};

export default Authorization;
