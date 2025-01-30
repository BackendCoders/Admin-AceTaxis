/** @format */

import { Fragment, useEffect } from 'react';
import { toAbsoluteUrl } from '@/utils/Assets';
import { useDispatch, useSelector } from 'react-redux';
import { refreshDashboard } from '../../../../../slices/dashboardSlice';
import { KeenIcon } from '../../../../../components';
const ChannelStats = () => {
	const dispatch = useDispatch();
	const { data } = useSelector((state) => state.dashboard);

	useEffect(() => {
		dispatch(refreshDashboard());
	}, [dispatch]);
	const items = [
		{
			icon: 'car',
			info: data?.bookingsTodayCount || 0,
			desc: 'Today Bookings',
			color: 'text-danger',
		},
		{
			icon: 'briefcase',
			info: data?.jobsBookedTodayCount || 0,
			desc: 'Jobs Booked Today',
			color: 'text-primary',
		},
		{
			icon: 'users',
			info: data?.driversCount || 0,
			desc: 'Drivers',
			color: 'text-cyan-400',
		},
		{
			icon: 'map',
			info: data?.poisCount || 0,
			desc: 'POIs',
			color: 'text-success',
		},
		{
			icon: 'underlining',
			info: data?.unallocatedTodayCount || 0,
			desc: 'Today Unallocated',
			color: 'text-purple-400',
		},
		{
			icon: 'user',
			info:
				data?.customerAquireCounts?.find((entry) => entry.periodWhen === 0) // ✅ Find the correct object
					?.new || 0,
			desc: 'Day New Customer',
			color: 'text-danger',
		},
		{
			icon: 'user-tick',
			info:
				data?.customerAquireCounts?.find((entry) => entry.periodWhen === 1) // ✅ Find the correct object
					?.new || 0,
			desc: 'Week New Customer',
			color: 'text-sky-400',
		},
		{
			icon: 'user-square',
			info:
				data?.customerAquireCounts?.find((entry) => entry.periodWhen === 2) // ✅ Find the correct object
					?.new || 0,
			desc: 'Month New Customer',
			color: 'text-teal-400',
		},
		{
			icon: 'users',
			info:
				data?.customerAquireCounts?.find((entry) => entry.periodWhen === 0) // ✅ Find the correct object
					?.returning || 0,
			desc: 'Day Returning Customer',
			color: 'text-yellow-400',
		},
		{
			icon: 'user-edit',
			info:
				data?.customerAquireCounts?.find((entry) => entry.periodWhen === 1) // ✅ Find the correct object
					?.new || 0,
			desc: 'Week Returning Customer',
			color: 'text-orange-400',
		},
		{
			icon: 'user',
			info:
				data?.customerAquireCounts?.find((entry) => entry.periodWhen === 2) // ✅ Find the correct object
					?.new || 0,
			desc: 'Month Returning Customer',
			color: 'text-cyan-400',
		},
	];
	const renderItem = (item, index) => {
		return (
			<div
				key={index}
				className='card flex-col justify-between gap-6 h-full bg-cover rtl:bg-[left_top_-1.7rem] bg-[right_top_-1.7rem] bg-no-repeat channel-stats-bg'
			>
				<div className='w-7 mt-4 ms-5'>
					<KeenIcon
						icon={item.icon}
						className={`text-2xl ${item.color}`}
					/>
				</div>

				<div className='flex flex-col gap-1 pb-4 px-5'>
					<span className='text-3xl font-semibold text-gray-900'>
						{item.info}
					</span>
					<span className='text-2sm font-normal text-gray-700'>
						{item.desc}
					</span>
				</div>
			</div>
		);
	};
	return (
		<Fragment>
			<style>
				{`
          .channel-stats-bg {
            background-image: url('${toAbsoluteUrl('/media/images/2600x1600/bg-3.png')}');
          }
          .dark .channel-stats-bg {
            background-image: url('${toAbsoluteUrl('/media/images/2600x1600/bg-3-dark.png')}');
          }
        `}
			</style>

			{items.map((item, index) => {
				return renderItem(item, index);
			})}
		</Fragment>
	);
};
export { ChannelStats };
