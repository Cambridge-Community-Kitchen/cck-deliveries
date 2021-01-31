import React from 'react';
import { Box, Button } from '@chakra-ui/react';

const BackToLockon = () => {
	const encodedGoogleMapsUrl = `https://goo.gl/maps/TKn359eKxHWskMJV6`;

	return (
		<Box d="flex" alignItems="center" justifyContent="center" py={5}>
			<Button
				as="a"
				href={encodedGoogleMapsUrl}
				colorScheme="yellow"
				size="sm"
				target="_blank"
			>
				Back to The Lockon
			</Button>
		</Box>
	);
};

export default BackToLockon;
