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
import LoadingSpinner from '../loading-spinner';

const Authorization = ({
	isLoading,
	isOpen,
	onClose,
	onChange,
	onComplete,
	value,
}) => {
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
					{!isLoading && (
						<Flex justify="center">
							Please enter today's password
						</Flex>
					)}
				</ModalHeader>
				<ModalBody>
					{isLoading ? (
						<Flex
							direction="column"
							alignItems="center"
							justify="center"
							mb={3}
						>
							<Text display="block">
								Connecting to Google Sheets...
							</Text>
							<LoadingSpinner />
						</Flex>
					) : (
						<Flex justify="center" mb={3}>
							<HStack>
								<PinInput
									onChange={onChange}
									onComplete={onComplete}
									size="lg"
									type="alphanumeric"
									value={value}
								>
									<PinInputField />
									<PinInputField />
									<PinInputField />
									<PinInputField />
								</PinInput>
							</HStack>
						</Flex>
					)}
				</ModalBody>
				<Flex justify="center" mb={4}>
					{!isLoading && (
						<Text fontSize="sm">
							(the password is specific to your assigned route)
						</Text>
					)}
				</Flex>
			</ModalContent>
		</Modal>
	);
};

Authorization.propTypes = {
	isLoading: PropTypes.bool.isRequired,
	isOpen: PropTypes.bool.isRequired,
	onChange: PropTypes.func.isRequired,
	onClose: PropTypes.func.isRequired,
	onComplete: PropTypes.func.isRequired,
	value: PropTypes.string.isRequired,
};

export default Authorization;
