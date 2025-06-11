/** @format */
import { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
	Toolbar,
	ToolbarDescription,
	ToolbarHeading,
	ToolbarPageTitle,
} from '@/partials/toolbar';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import {
	Popover,
	PopoverTrigger,
	PopoverContent,
} from '@/components/ui/popover';
import { KeenIcon } from '@/components';
import { cn } from '@/lib/utils';
import { Calendar } from '@/components/ui/calendar';
import { format, subDays } from 'date-fns';
import { refreshAllAccounts } from '../../../../slices/accountSlice';
import { refreshAccountChargeableGroupJobs } from '../../../../slices/billingSlice';
import NotPriced from './notPriced';
import Priced from './priced';

function InvoiceProcessorGroups() {
	const dispatch = useDispatch();
	const { accounts } = useSelector((state) => state.account);
	const { accountChargeableGroupJobs, loading } = useSelector(
		(state) => state.billing
	);
	const { priced, notPriced } = accountChargeableGroupJobs;
	const [selectedAccount, setSelectedAccount] = useState(0);
	const [open, setOpen] = useState(false);

	const [dateRange, setDateRange] = useState({
		from: subDays(new Date(), 30), // January 31, 2025
		to: new Date(), // Same default date
	});
	const [tempRange, setTempRange] = useState(dateRange);

	useEffect(() => {
		if (open) {
			setTempRange({ from: null, to: null });
		}
	}, [open]);

	const handleDateSelect = (range) => {
		setTempRange(range);
		if (range?.from && range?.to) {
			setDateRange(range);
			setOpen(false);
		}
	};

	const handleShow = () => {
		dispatch(
			refreshAccountChargeableGroupJobs(
				selectedAccount,
				format(new Date(dateRange?.from), 'yyyy-MM-dd'),
				format(new Date(dateRange?.to), 'yyyy-MM-dd')
			)
		);
	};

	// const handlePostAllPriced = async () => {
	//         try {
	//             // Filter bookings with driverFare > 0
	//             const jobsToPost = formattedNotPricedBookings.filter(
	//                 (job) => Number(job.driverFare) > 0
	//             );

	//             // console.log({ formattedNotPricedBookings, jobsToPost });

	//             if (jobsToPost.length === 0) {
	//                 toast.error('No jobs available to post.');
	//                 return;
	//             }

	//             // Create an array of API call promises
	//             const postRequests = jobsToPost.map((job) =>
	//                 accountPostOrUnpostJobs(true, job.id)
	//             );

	//             // Execute all API calls concurrently
	//             const responses = await Promise.all(postRequests);

	//             // Check responses for success/failure
	//             const allSuccessful = responses.every((res) => res?.status === 'success');

	//             if (allSuccessful) {
	//                 toast.success(`${jobsToPost.length} jobs posted successfully!`);
	//                 handleShow();
	//             } else {
	//                 toast.error('Some jobs failed to post.');
	//             }
	//         } catch (error) {
	//             console.error('Error posting all jobs:', error);
	//             toast.error('Failed to post all jobs.');
	//         }
	//     };

	useEffect(() => {
		dispatch(refreshAllAccounts());
	}, [dispatch]);

	return (
		<Fragment>
			<div className='pe-[1.875rem] ps-[1.875rem] ms-auto me-auto max-w-[1850px] w-full'>
				<Toolbar>
					<ToolbarHeading>
						<ToolbarPageTitle />
						<ToolbarDescription>
							Account Job Processor (Grp){' '}
						</ToolbarDescription>
					</ToolbarHeading>
				</Toolbar>
				<div className='ms-auto me-auto max-w-[1850px] w-full'>
					<div className='flex flex-col items-stretch gap-5 lg:gap-7.5'>
						<div className='flex flex-wrap items-center gap-5 justify-between'>
							<div className='card card-grid min-w-full'>
								<div className='card-header flex-wrap gap-2'>
									<div className='flex flex-wrap gap-2 lg:gap-5'>
										{/* <div className='flex'>
											<label
												className='input input-sm hover:shadow-lg mt-4'
												style={{ height: '40px' }}
											>
												<KeenIcon icon='magnifier' />
												<input
													type='text'
													placeholder='Search'
													value={search}
													onChange={(e) => setSearch(e.target.value)}
												/>
											</label>
										</div> */}
										<div className='flex flex-wrap items-center gap-2.5'>
											<div className='flex flex-col'>
												<label className='form-label'>Accounts</label>
												<Select
													value={selectedAccount}
													onValueChange={(value) => setSelectedAccount(value)}
												>
													<SelectTrigger
														className='w-40 hover:shadow-lg'
														size='sm'
														style={{ height: '40px' }}
													>
														<SelectValue placeholder='Select' />
													</SelectTrigger>
													<SelectContent className='w-40'>
														<SelectItem value={0}>All</SelectItem>
														{accounts?.length > 0 &&
															accounts?.map((acc) => (
																<>
																	<SelectItem value={acc?.accNo}>
																		{acc?.accNo} - {acc?.businessName}
																	</SelectItem>
																</>
															))}
													</SelectContent>
												</Select>
											</div>

											<div className='flex flex-col'>
												<label className='form-label'>Select Date Range</label>
												<Popover
													open={open}
													onOpenChange={setOpen}
												>
													<PopoverTrigger asChild>
														<button
															id='date'
															className={cn(
																'btn btn-sm btn-light data-[state=open]:bg-light-active',
																!dateRange && 'text-gray-400'
															)}
															style={{ height: '40px' }}
														>
															<KeenIcon
																icon='calendar'
																className='me-0.5'
															/>
															{dateRange?.from ? (
																dateRange.to ? (
																	<>
																		{format(dateRange.from, 'LLL dd, y')} -{' '}
																		{format(dateRange.to, 'LLL dd, y')}
																	</>
																) : (
																	format(dateRange.from, 'LLL dd, y')
																)
															) : (
																<span>Pick a date range</span>
															)}
														</button>
													</PopoverTrigger>

													<PopoverContent
														className='w-auto p-0'
														align='end'
													>
														<Calendar
															mode='range'
															selected={tempRange}
															onSelect={handleDateSelect}
															numberOfMonths={2}
															initialFocus
														/>
													</PopoverContent>
												</Popover>
											</div>

											{/* <div className='flex items-center gap-2'>
												<label className='switch switch-sm flex-1 sm:flex-none mt-4'>
													<span className='switch-label'>
														Auto Email Invoices
													</span>
													<input
														type='checkbox'
														name='check'
														checked={autoEmailInvoices} // Controlled value
														onChange={(e) =>
															setAutoEmailInvoices(e.target.checked)
														} // Update state on change
													/>
												</label>
											</div> */}

											<button
												className='btn btn-primary flex justify-center mt-4'
												onClick={handleShow}
												disabled={loading}
											>
												{loading ? 'Searching...' : 'Show Jobs'}
											</button>
										</div>
									</div>
								</div>
								<div className='card-body'>
									<div className='flex justify-start items-center gap-4 ml-4 mt-2 mb-2'>
										Awaiting Pricing - {notPriced?.length}
										{/* <button
											className='btn btn-primary flex justify-center'
											// onClick={handlePostAllPriced}
										>
											Post All Priced
										</button> */}
									</div>
									{notPriced?.length > 0 ? (
										<>
											<NotPriced handleShow={handleShow} />
										</>
									) : (
										<div className='text-start ml-4  text-yellow-600 dark:border dark:border-yellow-400 dark:opacity-50 dark:bg-transparent rounded-md bg-yellow-100 p-2 mr-4'>
											⚠️ No Data Available
										</div>
									)}
								</div>
								<div className='card-body mt-10'>
									<div className='flex justify-start items-center gap-4 ml-4 mt-2 mb-2'>
										Ready for Invoicing - {priced?.length}
									</div>
									{priced?.length > 0 ? (
										<>
											<Priced handleShow={handleShow} />
										</>
									) : (
										<div className='text-start ml-4  text-yellow-600 dark:border dark:border-yellow-400 dark:opacity-50 dark:bg-transparent rounded-md bg-yellow-100 p-2 mr-4 mb-2'>
											⚠️ No Data Available
										</div>
									)}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</Fragment>
	);
}

export { InvoiceProcessorGroups };
