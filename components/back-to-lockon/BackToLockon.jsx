import React from 'react';
import { Box, Button } from '@chakra-ui/react';
import { ArrowForwardIcon } from '@chakra-ui/icons';

const BackToLockon = () => {
	const encodedGoogleMapsUrl = `https://goo.gl/maps/TKn359eKxHWskMJV6`; // The Lockon
//	const encodedGoogleMapsUrl = `https://goo.gl/maps/yURo7vxnViPK3ngf7`; // Downing Place
	return (
		<Box d="flex" alignItems="center" justifyContent="center" py={5}>
			<Button
				as="a"
				href={encodedGoogleMapsUrl}
				colorScheme="yellow"
				rightIcon={<ArrowForwardIcon />}
				size="sm"
				target="_blank"
			>
				Back to the Lockon
			</Button>
		</Box>
	);
};

export default BackToLockon;
