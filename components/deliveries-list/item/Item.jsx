import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Box, Button, Divider, Stack, Text } from '@chakra-ui/react';
import { ArrowForwardIcon, PhoneIcon } from '@chakra-ui/icons';
import styles from './Item.module.scss';

const Item = ({ data }) => {
	console.log(data);

	const encodedGoogleMapsUrl = `https://www.google.com/maps/place/${encodeURIComponent(
		data.plusCode,
	)}`;

	return (
		<>
			<li className={styles.item}>
				<Box ml="3" py="3">
					<Box
						d="flex"
						alignItems="baseline"
						justifyContent="space-between"
					>
						<Text fontSize="xl" fontWeight="bold">
							{data.name}
						</Text>
						<Text color="gray" fontSize="sm" mr="2">
							{data.plusCode}
						</Text>
					</Box>
					<Text color="gray.500">{data.address}</Text>
					<Text color="gray.500">
						{data.deliveries['tue']} portions
					</Text>
					<Text color="gray.500" fontSize="sm">
						{data.notes}
					</Text>
					<Stack direction="row" mt="4" spacing={3}>
						<Button
							as="a"
							href={encodedGoogleMapsUrl}
							rightIcon={<ArrowForwardIcon />}
							colorScheme="blue"
							target="_blank"
						>
							Google Maps
						</Button>
						{data.phone && (
							<Button
								as="a"
								href={`tel:${data.phone}`}
								leftIcon={<PhoneIcon h="3" w="3" />}
								colorScheme="teal"
							>
								Call
							</Button>
						)}
					</Stack>
				</Box>
			</li>
			<Divider />
		</>
	);
};

Item.propTypes = {
	data: PropTypes.object.isRequired,
};

export default memo(Item);
