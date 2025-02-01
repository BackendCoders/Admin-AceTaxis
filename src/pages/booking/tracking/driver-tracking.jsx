/** @format */

import { useState, useEffect } from 'react';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import {
	Typography,
	// TextField,
	// Button,
	// Table,
	// TableBody,
	// TableCell,
	// TableContainer,
	// TableHead,
	// TableRow,
	// Paper,
	// Select,
	// MenuItem,
	Box,
} from '@mui/material';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import {
	DataGrid,
	DataGridColumnHeader,
	// useDataGrid,
	// DataGridRowSelectAll,
	// DataGridRowSelect,
} from '@/components';

import { gstAllGPS } from '../../../service/operations/gpsApi';
// import carImg from '../../../../public/media/images/car/gps-navigation.png';

const DriverTracking = () => {
	const apiKey = import.meta.env.VITE_GOOGLE_API_KEY;

	const { isLoaded } = useJsApiLoader({
		googleMapsApiKey: `${apiKey}`, // Replace with your actual API key
	});

	const search = '';
	const [selectedDriver, setSelectedDriver] = useState('all');
	const [drivers, setDrivers] = useState([]);
	const [mapCenter, setMapCenter] = useState({ lat: 51.075, lng: -1.8 }); // Default map center
	const [mapZoom, setMapZoom] = useState(2); // Default zoom level
	const [isBouncing, setIsBouncing] = useState(false); // Track bounce state
	const [isFullScreen, setIsFullScreen] = useState(false); // ✅ Full-screen state

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


		// Toggle Full-Screen Mode on F12
		useEffect(() => {
			const handleKeyDown = (event) => {
				if (event.key === 'F12') {
					event.preventDefault();
					setIsFullScreen(prevState => !prevState); // Toggle full-screen
				}
				if (event.key === 'Escape' && isFullScreen) {
					setIsFullScreen(false); // Exit full-screen on Escape key
				}
			};
	
			window.addEventListener('keydown', handleKeyDown);
			return () => window.removeEventListener('keydown', handleKeyDown);
		}, [isFullScreen]);

	const handleDriverSelection = (driverReg) => {
		setSelectedDriver(driverReg);

		if (driverReg === 'all') {
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
		selectedDriver === 'all'
			? drivers.filter((driver) =>
					driver.regNo?.toLowerCase().includes(search.toLowerCase())
				)
			: drivers.filter(
					(driver) =>
						driver.regNo === selectedDriver &&
						driver.regNo?.toLowerCase().includes(search.toLowerCase())
				);

				const containerStyle = {
					width: isFullScreen ? '100vw' : '100%',
					height: isFullScreen ? '100vh' : '100%',
					position: isFullScreen ? 'fixed' : 'relative',
					top: isFullScreen ? 0 : 'auto',
					left: isFullScreen ? 0 : 'auto',
					zIndex: isFullScreen ? 9999 : 'auto',
				};

	return (
		<Box className='p-4 space-y-6'>
			{/* Header Section */}
			<Box className='flex flex-col md:flex-row items-center justify-between p-4'>
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
				{/* Select Driver Dropdown */}
				<Box className='w-full lg:w-[15%]'>
					<Typography className='mb-1 text-gray-800 dark:text-gray-700 font-medium'>
						Select Driver
					</Typography>

					<Select
						value={selectedDriver}
						onValueChange={(value) => handleDriverSelection(value)} // Custom select uses onValueChange instead of onChange
					>
						<SelectTrigger>
							<SelectValue placeholder='Select Driver' />
						</SelectTrigger>

						<SelectContent>
							<SelectItem value='all'>All</SelectItem>

							{drivers.map((driver) => (
								<SelectItem
									key={driver.userId}
									value={driver.regNo}
								>
									{driver.username} / {driver.regNo}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
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

				{/* Updated Table section design */}
				<Box
					className='rounded-lg shadow-md overflow-hidden'
					style={{ flex: '43%' }}
				>
					<div className='card card-grid min-w-full'>
						<div className='card-header flex-wrap gap-2'>
							<Typography
								variant='h6'
								className='font-bold text-gray-800'
							>
								Driver List
							</Typography>
						</div>

						<div className='card-body'>
							<DataGrid
								columns={[
									{
										accessorKey: 'userId',
										header: ({ column }) => (
											<DataGridColumnHeader
												title='#'
												column={column}
											/>
										),
										enableSorting: true,
										cell: ({ row }) => <span>{row.original.userId}</span>,
										meta: { headerClassName: 'w-20' },
									},
									{
										accessorKey: 'username',
										header: ({ column }) => (
											<DataGridColumnHeader
												title='Name'
												column={column}
											/>
										),
										enableSorting: true,
										cell: ({ row }) => (
											<span className='font-medium'>
												{row.original.username || 'N/A'}
											</span>
										),
										meta: { headerClassName: 'min-w-[120px]' },
									},
									{
										accessorKey: 'regNo',
										header: ({ column }) => (
											<DataGridColumnHeader
												title='Reg No'
												column={column}
											/>
										),
										enableSorting: true,
										cell: ({ row }) => (
											<span className='font-medium'>
												{row.original.regNo || 'N/A'}
											</span>
										),
										meta: { headerClassName: 'min-w-[120px]' },
									},
									{
										accessorKey: 'gpsLastUpdated',
										header: ({ column }) => (
											<DataGridColumnHeader
												title='Last Updated'
												column={column}
											/>
										),
										enableSorting: true,
										cell: ({ row }) => (
											<span>
												{row.original.gpsLastUpdated
													? new Date(
															row.original.gpsLastUpdated
														).toLocaleTimeString('en-US', {
															hour: '2-digit',
															minute: '2-digit',
															second: '2-digit',
														})
													: 'N/A'}
											</span>
										),
										meta: { headerClassName: 'min-w-[150px]' },
									},
									{
										accessorKey: 'speed',
										header: ({ column }) => (
											<DataGridColumnHeader
												title='Speed (km/h)'
												column={column}
											/>
										),
										enableSorting: true,
										cell: ({ row }) => (
											<span className='font-medium'>
												{row.original.speed
													? `${parseFloat(row.original.speed).toFixed(2)} km/h`
													: '0 km/h'}
											</span>
										),
										meta: { headerClassName: 'min-w-[100px]' },
									},
								]}
								data={filteredDrivers}
								rowSelection={true}
								pagination={{ size: 5 }}
								sorting={[{ id: 'userId', desc: false }]}
								layout={{ card: true }}
							/>
						</div>
					</div>
				</Box>
			</Box>
		</Box>
	);
};

export { DriverTracking };
