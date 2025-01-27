/** @format */

import { useState, useEffect } from 'react';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import {
	Typography,
	TextField,
	// Button,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Paper,
	Select,
	MenuItem,
	Box,
} from '@mui/material';

import { gstAllGPS } from '../../../service/operations/gpsApi';
// import carImg from '../../../../public/media/images/car/gps-navigation.png';

const DriverTracking = () => {
	const apiKey = import.meta.env.VITE_GOOGLE_API_KEY;

	const { isLoaded } = useJsApiLoader({
		googleMapsApiKey: `${apiKey}`, // Replace with your actual API key
	});

	const [search, setSearch] = useState('');
	const [selectedDriver, setSelectedDriver] = useState('All');
	const [drivers, setDrivers] = useState([]);
	const [mapCenter, setMapCenter] = useState({ lat: 51.075, lng: -1.8 }); // Default map center
	const [mapZoom, setMapZoom] = useState(8); // Default zoom level
	const [isBouncing, setIsBouncing] = useState(false); // Track bounce state

	// Function to fetch GPS data
	const fetchGPSData = async () => {
		try {
			const response = await gstAllGPS(); // Fetch data
			console.log('API Response:', response);

			if (response?.status === 'success') {
				// Map the API response to match the drivers structure
				const mappedDrivers = Object.values(response).filter(
					(item) => typeof item === 'object'
				);
				setDrivers(mappedDrivers);
				console.log('Mapped Drivers:', mappedDrivers);
			} else {
				console.error('Failed to fetch GPS data:', response);
			}
		} catch (error) {
			console.error('Error fetching GPS data:', error);
		}
	};

	// Fetch GPS data on component mount and every 10 seconds
	useEffect(() => {
		fetchGPSData(); // Initial fetch
		const interval = setInterval(fetchGPSData, 10000); // Fetch every 10 seconds

		return () => clearInterval(interval); // Cleanup interval on unmount
	}, []);

	const handleDriverSelection = (driverReg) => {
		setSelectedDriver(driverReg);

		if (driverReg === 'All') {
			// Bounce all markers
			setIsBouncing('all');

			// Stop bounce after 2 seconds
			setTimeout(() => {
				setIsBouncing(null); // Reset bounce state
			}, 2000);

			// Reset to default map center and zoom
			setMapCenter({ lat: 51.075, lng: -1.8 });
			setMapZoom(2);
		} else {
			// Find the selected driver's data
			const selectedDriverData = drivers.find(
				(driver) => driver.regNo === driverReg
			);

			if (selectedDriverData) {
				// Recenter map to the selected driver's location
				setMapCenter({
					lat: selectedDriverData.latitude,
					lng: selectedDriverData.longitude,
				});
				setMapZoom(18); // Zoom in

				// Bounce the selected driver's marker
				setIsBouncing(driverReg);

				// Stop bounce after 2 seconds
				setTimeout(() => {
					setIsBouncing(null); // Reset bounce state
				}, 2000);
			}
		}
	};

	const filteredDrivers =
		selectedDriver === 'All'
			? drivers.filter((driver) =>
					driver.regNo?.toLowerCase().includes(search.toLowerCase())
				)
			: drivers.filter(
					(driver) =>
						driver.regNo === selectedDriver &&
						driver.regNo?.toLowerCase().includes(search.toLowerCase())
				);

	const containerStyle = {
		width: '100%',
		height: '100%',
	};

	return (
		<Box className='p-4 space-y-6'>
			{/* Header Section */}
			<Box className='flex flex-col md:flex-row items-center justify-between bg-white p-4'>
				{/* Title */}
				<Typography
					variant='h4'
					className='font-bold text-gray-800 text-center md:text-left'
				>
					Driver Tracking
				</Typography>

				{/* Date and Time Section */}
				<Box className='flex items-center space-x-2 mt-4 md:mt-0'>
					{/* Clock Icon */}
					<svg
						xmlns='http://www.w3.org/2000/svg'
						className='h-6 w-6 text-gray-500'
						fill='none'
						viewBox='0 0 24 24'
						stroke='currentColor'
					>
						<path
							strokeLinecap='round'
							strokeLinejoin='round'
							strokeWidth='2'
							d='M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z'
						/>
					</svg>

					{/* Date */}
					<Typography className='text-gray-700 font-medium text-sm sm:text-base'>
						{new Date().toLocaleDateString('en-US', {
							weekday: 'long',
							year: 'numeric',
							month: 'long',
							day: 'numeric',
						})}
					</Typography>

					{/* Time */}
					<Typography className='text-gray-900 font-semibold text-sm sm:text-lg'>
						{new Date().toLocaleTimeString('en-US', {
							hour: '2-digit',
							minute: '2-digit',
							second: '2-digit',
						})}
					</Typography>
				</Box>
			</Box>

			{/* Search and Driver Selection Section */}
			<Box className='flex flex-col lg:flex-row items-center space-y-4 lg:space-y-0 lg:space-x-4'>
				{/* Search Box */}
				<Box className='w-full lg:w-1/3'>
					<Typography className='mb-1 text-gray-600 font-medium'>
						Search by Driver
					</Typography>
					<TextField
						placeholder='Enter driver reg'
						variant='outlined'
						size='small'
						fullWidth
						onChange={(e) => setSearch(e.target.value)}
					/>
				</Box>

				{/* Select Driver Dropdown */}
				<Box className='w-full lg:w-1/4'>
					<Typography className='mb-1 text-gray-600 font-medium'>
						Select Driver
					</Typography>
					<Select
						value={selectedDriver}
						onChange={(e) => handleDriverSelection(e.target.value)}
						size='small'
						fullWidth
					>
						<MenuItem value='All'>All</MenuItem>
						{drivers.map((driver) => (
							<MenuItem
								key={driver.userId}
								value={driver.regNo}
							>
								{driver.username} / {driver.regNo}
							</MenuItem>
						))}
					</Select>
				</Box>

				{/* Action Buttons */}
				<Box className='w-full lg:w-1/4 flex space-x-2'>
					{/* <Button
						variant='contained'
						style={{ backgroundColor: '#6C63FF', width: '100%' }}
					>
						Find
					</Button> */}
					{/* <Button
						variant='contained'
						color='secondary'
						style={{ width: '100%' }}
					>
						Re-Center
					</Button> */}
				</Box>
			</Box>

			{/* Map and Table Section */}
			<Box className='flex flex-col lg:flex-row gap-4 h-[500px]'>
				{/* Map Section */}
				<Box
					className='flex-grow rounded-lg shadow-md overflow-hidden border border-gray-200'
					style={{ flex: '65%' }}
				>
					{isLoaded ? (
						<GoogleMap
							mapContainerStyle={containerStyle}
							center={mapCenter} // Dynamic map center
							zoom={mapZoom} // Dynamic zoom level
						>
							{filteredDrivers.map((driver) => (
								<Marker
									key={driver.userId}
									position={{
										lat: driver.latitude || 0,
										lng: driver.longitude || 0,
									}}
									title={`Driver: ${driver.regNo || 'Unknown'} | Speed: ${
										driver.speed || 'N/A'
									} km/h`}
									icon={{
										url: '/media/images/car/gps-navigation.png',
										scaledSize: new window.google.maps.Size(40, 40), // Adjust size of the icon
									}}
									animation={
										isBouncing === 'all' || isBouncing === driver.regNo
											? window.google.maps.Animation.BOUNCE
											: null
									} // Bounce only if this driver's regNo matches the bouncing state
								/>
							))}
						</GoogleMap>
					) : (
						<Box className='flex items-center justify-center h-full'>
							<Typography
								variant='body1'
								className='text-gray-500'
							>
								Loading Map...
							</Typography>
						</Box>
					)}
				</Box>

				{/* Table Section */}
				<Box
					className='rounded-lg shadow-md border border-gray-200 bg-white overflow-hidden'
					style={{ flex: '35%' }}
				>
					<TableContainer
						component={Paper}
						className='h-full'
					>
						<Table stickyHeader>
							<TableHead>
								<TableRow>
									<TableCell>#</TableCell>
									<TableCell>Name</TableCell>
									<TableCell>Reg</TableCell>
									<TableCell>Last Updated</TableCell>
									<TableCell>Speed (km/h)</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{filteredDrivers.map((driver) => (
									<TableRow key={driver.userId}>
										<TableCell>{driver.userId}</TableCell>
										<TableCell>{driver.username || 'N/A'}</TableCell>
										<TableCell>{driver.regNo || 'N/A'}</TableCell>
										<TableCell>
											{driver.gpsLastUpdated
												? new Date(driver.gpsLastUpdated).toLocaleTimeString(
														'en-US',
														{
															hour: '2-digit',
															minute: '2-digit',
															second: '2-digit',
														}
													)
												: 'N/A'}
										</TableCell>

										<TableCell>
											{driver.speed
												? `${parseFloat(driver.speed).toFixed(2)} km/h` // Round to 2 decimal places
												: '0 km/h'}{' '}
										</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</TableContainer>
				</Box>
			</Box>
		</Box>
	);
};

export { DriverTracking };
