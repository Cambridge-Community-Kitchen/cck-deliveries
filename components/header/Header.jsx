import React from 'react';
import { Box, Heading } from '@chakra-ui/react';
import Image from 'next/image';

const Header = () => {
	return (
		<div>
			<Box
				d="flex"
				alignItems="center"
				justifyContent="center"
				mx="4"
				my="4"
			>
				<Image src="/logo.png" height={50} width={50} />
				<Heading ml={2}>CCK Deliveries</Heading>
			</Box>
		</div>
	);
};

export default Header;
