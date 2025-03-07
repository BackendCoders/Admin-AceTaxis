/** @format */

import { Navigate, Route, Routes } from 'react-router';
import { DefaultPage, Demo1DarkSidebarPage } from '@/pages/dashboards';
import {
	ProfileActivityPage,
	ProfileBloggerPage,
	CampaignsCardPage,
	CampaignsListPage,
	ProjectColumn2Page,
	ProjectColumn3Page,
	ProfileCompanyPage,
	ProfileCreatorPage,
	ProfileCRMPage,
	ProfileDefaultPage,
	ProfileEmptyPage,
	ProfileFeedsPage,
	ProfileGamerPage,
	ProfileModalPage,
	ProfileNetworkPage,
	ProfileNFTPage,
	ProfilePlainPage,
	ProfileTeamsPage,
	ProfileWorksPage,
} from '@/pages/public-profile';
import {
	AccountActivityPage,
	AccountAllowedIPAddressesPage,
	AccountApiKeysPage,
	AccountAppearancePage,
	AccountBackupAndRecoveryPage,
	AccountBasicPage,
	AccountCompanyProfilePage,
	AccountCurrentSessionsPage,
	AccountDeviceManagementPage,
	AccountEnterprisePage,
	AccountGetStartedPage,
	AccountHistoryPage,
	AccountImportMembersPage,
	AccountIntegrationsPage,
	AccountInviteAFriendPage,
	AccountMembersStarterPage,
	AccountNotificationsPage,
	AccountOverviewPage,
	AccountPermissionsCheckPage,
	AccountPermissionsTogglePage,
	AccountPlansPage,
	AccountPrivacySettingsPage,
	AccountRolesPage,
	AccountSecurityGetStartedPage,
	AccountSecurityLogPage,
	AccountSettingsEnterprisePage,
	AccountSettingsModalPage,
	AccountSettingsPlainPage,
	AccountSettingsSidebarPage,
	AccountTeamInfoPage,
	AccountTeamMembersPage,
	AccountTeamsPage,
	AccountTeamsStarterPage,
	AccountUserProfilePage,
} from '@/pages/account';
import {
	NetworkAppRosterPage,
	NetworkMarketAuthorsPage,
	NetworkAuthorPage,
	NetworkGetStartedPage,
	NetworkMiniCardsPage,
	NetworkNFTPage,
	NetworkSocialPage,
	NetworkUserCardsTeamCrewPage,
	NetworkSaasUsersPage,
	NetworkStoreClientsPage,
	NetworkUserTableTeamCrewPage,
	NetworkVisitorsPage,
} from '@/pages/network';
import {
	NewBooking,
	BookingDispatch,
	DriverTracking,
	Availability,
	AvailabilityLogs,
	AvailabilityReport,
	// SearchBooking,
	AirportRuns,
	CardBookings,
	RejectedBookings,
	AcceptedBookings,
	AmendmentBookings,
	AuditBooking,
	CancelByRange,
	Tariff,
	TurndownBookings,
} from '@/pages/booking';
import { UnAllocated } from '@/pages/dispatch';
import { AuthPage } from '@/auth';
import { Demo1Layout } from '@/layouts/demo1';
import { ErrorsRouting } from '@/errors';
import {
	AuthenticationWelcomeMessagePage,
	AuthenticationAccountDeactivatedPage,
	AuthenticationGetStartedPage,
} from '@/pages/authentication';
import { RequireAuth } from '../auth';
import { ListLocalPoi } from '@/pages/localPoi';
import { ListAccounts } from '@/pages/accounts';
import { ListDriver } from '@/pages/drivers';
import {
	StateProcessing,
	StatementHistory,
	InvoiceProcessor,
	InvoiceHistory,
	InvoiceDelete,
	VatOutputs,
} from '@/pages/billing&Payments';
import { DriverEarningReport } from '@/pages/driverEarningReport';
import { CompanySetting, MsgSettings } from '@/pages/bookingSettings';
import { DriverExpenses } from '@/pages/driverExpenses';
import { DriverExpiryList } from '@/pages/drivers/driverExpiry';

const AppRoutingSetup = () => {
	return (
		<Routes>
			<Route element={<RequireAuth />}>
				<Route element={<Demo1Layout />}>
					<Route
						path='/'
						element={<DefaultPage />}
					/>
					<Route
						path='/dark-sidebar'
						element={<Demo1DarkSidebarPage />}
					/>
					<Route
						path='/bookings/booking-dispatch'
						element={<BookingDispatch />}
					/>
					<Route
						path='/bookings/web-booking'
						element={<NewBooking />}
					/>
					<Route
						path='/bookings/amend-booking'
						element={<AmendmentBookings />}
					/>
					<Route
						path='/bookings/accept-booking'
						element={<AcceptedBookings />}
					/>
					<Route
						path='/bookings/reject-booking'
						element={<RejectedBookings />}
					/>
					<Route
						path='/booking/driver-tracking'
						element={<DriverTracking />}
					/>
					<Route
						path='/booking/availability'
						element={<Availability />}
					/>
					<Route
						path='/booking/availability-logs'
						element={<AvailabilityLogs />}
					/>
					<Route
						path='/booking/availability-report'
						element={<AvailabilityReport />}
					/>

					{/* <Route
						path='/bookings/search-booking'
						element={<SearchBooking />}
					/> */}
					<Route
						path='/bookings/audit-view'
						element={<AuditBooking />}
					/>
					<Route
						path='/bookings/cancelbyrange'
						element={<CancelByRange />}
					/>
					<Route
						path='/bookings/turndown'
						element={<TurndownBookings />}
					/>
					<Route
						path='/bookings/airport-runs'
						element={<AirportRuns />}
					/>
					<Route
						path='/bookings/card-bookings'
						element={<CardBookings />}
					/>
					<Route
						path='/bookings/global-search'
						element={<UnAllocated />}
					/>
					{/* <Route
						path='/dispatch/allocated-jobs'
						element={<Allocated />}
					/> */}
					{/* <Route
						path='/dispatch/cancelled-jobs'
						element={<Cancelled />}
					/> */}
					{/* <Route
						path='/dispatch/completed-jobs'
						element={<Completed />}
					/> */}
					<Route
						path='/localPOIs/list-local-Poi'
						element={<ListLocalPoi />}
					/>
					<Route
						path='/accounts/list-account'
						element={<ListAccounts />}
					/>

					<Route
						path='/drivers/expires'
						element={<DriverExpiryList />}
					/>
					<Route
						path='/drivers/list-driver'
						element={<ListDriver />}
					/>
					<Route
						path='/driver-expenses'
						element={<DriverExpenses />}
					/>

					<Route
						path='/billing/driver/statement-processing'
						element={<StateProcessing />}
					/>
					<Route
						path='/billing/driver/statement-history'
						element={<StatementHistory />}
					/>
					<Route
						path='/billing/account/invoice-processor'
						element={<InvoiceProcessor />}
					/>
					<Route
						path='/billing/account/invoice-history'
						element={<InvoiceHistory />}
					/>
					<Route
						path='/billing/account/invoice-delete'
						element={<InvoiceDelete />}
					/>
					<Route
						path='/billing/vat-outputs'
						element={<VatOutputs />}
					/>
					<Route
						path='/tariffs'
						element={<Tariff />}
					/>
					<Route
						path='/driver-earning-report'
						element={<DriverEarningReport />}
					/>
					<Route
						path='/setting/company-settings'
						element={<CompanySetting />}
					/>
					<Route
						path='/setting/msg-settings'
						element={<MsgSettings />}
					/>

					<Route
						path='/public-profile/profiles/default'
						element={<ProfileDefaultPage />}
					/>
					<Route
						path='/public-profile/profiles/creator'
						element={<ProfileCreatorPage />}
					/>
					<Route
						path='/public-profile/profiles/company'
						element={<ProfileCompanyPage />}
					/>
					<Route
						path='/public-profile/profiles/nft'
						element={<ProfileNFTPage />}
					/>
					<Route
						path='/public-profile/profiles/blogger'
						element={<ProfileBloggerPage />}
					/>
					<Route
						path='/public-profile/profiles/crm'
						element={<ProfileCRMPage />}
					/>
					<Route
						path='/public-profile/profiles/gamer'
						element={<ProfileGamerPage />}
					/>
					<Route
						path='/public-profile/profiles/feeds'
						element={<ProfileFeedsPage />}
					/>
					<Route
						path='/public-profile/profiles/plain'
						element={<ProfilePlainPage />}
					/>
					<Route
						path='/public-profile/profiles/modal'
						element={<ProfileModalPage />}
					/>
					<Route
						path='/public-profile/projects/3-columns'
						element={<ProjectColumn3Page />}
					/>
					<Route
						path='/public-profile/projects/2-columns'
						element={<ProjectColumn2Page />}
					/>
					<Route
						path='/public-profile/works'
						element={<ProfileWorksPage />}
					/>
					<Route
						path='/public-profile/teams'
						element={<ProfileTeamsPage />}
					/>
					<Route
						path='/public-profile/network'
						element={<ProfileNetworkPage />}
					/>
					<Route
						path='/public-profile/activity'
						element={<ProfileActivityPage />}
					/>
					<Route
						path='/public-profile/campaigns/card'
						element={<CampaignsCardPage />}
					/>
					<Route
						path='/public-profile/campaigns/list'
						element={<CampaignsListPage />}
					/>
					<Route
						path='/public-profile/empty'
						element={<ProfileEmptyPage />}
					/>
					<Route
						path='/account/home/get-started'
						element={<AccountGetStartedPage />}
					/>
					<Route
						path='/account/home/user-profile'
						element={<AccountUserProfilePage />}
					/>
					<Route
						path='/account/home/company-profile'
						element={<AccountCompanyProfilePage />}
					/>
					<Route
						path='/account/home/settings-sidebar'
						element={<AccountSettingsSidebarPage />}
					/>
					<Route
						path='/account/home/settings-enterprise'
						element={<AccountSettingsEnterprisePage />}
					/>
					<Route
						path='/account/home/settings-plain'
						element={<AccountSettingsPlainPage />}
					/>
					<Route
						path='/account/home/settings-modal'
						element={<AccountSettingsModalPage />}
					/>
					<Route
						path='/account/billing/basic'
						element={<AccountBasicPage />}
					/>
					<Route
						path='/account/billing/enterprise'
						element={<AccountEnterprisePage />}
					/>
					<Route
						path='/account/billing/plans'
						element={<AccountPlansPage />}
					/>
					<Route
						path='/account/billing/history'
						element={<AccountHistoryPage />}
					/>
					<Route
						path='/account/security/get-started'
						element={<AccountSecurityGetStartedPage />}
					/>
					<Route
						path='/account/security/overview'
						element={<AccountOverviewPage />}
					/>
					<Route
						path='/account/security/allowed-ip-addresses'
						element={<AccountAllowedIPAddressesPage />}
					/>
					<Route
						path='/account/security/privacy-settings'
						element={<AccountPrivacySettingsPage />}
					/>
					<Route
						path='/account/security/device-management'
						element={<AccountDeviceManagementPage />}
					/>
					<Route
						path='/account/security/backup-and-recovery'
						element={<AccountBackupAndRecoveryPage />}
					/>
					<Route
						path='/account/security/current-sessions'
						element={<AccountCurrentSessionsPage />}
					/>
					<Route
						path='/account/security/security-log'
						element={<AccountSecurityLogPage />}
					/>
					<Route
						path='/account/members/team-starter'
						element={<AccountTeamsStarterPage />}
					/>
					<Route
						path='/account/members/teams'
						element={<AccountTeamsPage />}
					/>
					<Route
						path='/account/members/team-info'
						element={<AccountTeamInfoPage />}
					/>
					<Route
						path='/account/members/members-starter'
						element={<AccountMembersStarterPage />}
					/>
					<Route
						path='/account/members/team-members'
						element={<AccountTeamMembersPage />}
					/>
					<Route
						path='/account/members/import-members'
						element={<AccountImportMembersPage />}
					/>
					<Route
						path='/account/members/roles'
						element={<AccountRolesPage />}
					/>
					<Route
						path='/account/members/permissions-toggle'
						element={<AccountPermissionsTogglePage />}
					/>
					<Route
						path='/account/members/permissions-check'
						element={<AccountPermissionsCheckPage />}
					/>
					<Route
						path='/account/integrations'
						element={<AccountIntegrationsPage />}
					/>
					<Route
						path='/account/notifications'
						element={<AccountNotificationsPage />}
					/>
					<Route
						path='/account/api-keys'
						element={<AccountApiKeysPage />}
					/>
					<Route
						path='/account/appearance'
						element={<AccountAppearancePage />}
					/>
					<Route
						path='/account/invite-a-friend'
						element={<AccountInviteAFriendPage />}
					/>
					<Route
						path='/account/activity'
						element={<AccountActivityPage />}
					/>
					<Route
						path='/network/get-started'
						element={<NetworkGetStartedPage />}
					/>
					<Route
						path='/network/user-cards/mini-cards'
						element={<NetworkMiniCardsPage />}
					/>
					<Route
						path='/network/user-cards/team-crew'
						element={<NetworkUserCardsTeamCrewPage />}
					/>
					<Route
						path='/network/user-cards/author'
						element={<NetworkAuthorPage />}
					/>
					<Route
						path='/network/user-cards/nft'
						element={<NetworkNFTPage />}
					/>
					<Route
						path='/network/user-cards/social'
						element={<NetworkSocialPage />}
					/>
					<Route
						path='/network/user-table/team-crew'
						element={<NetworkUserTableTeamCrewPage />}
					/>
					<Route
						path='/network/user-table/app-roster'
						element={<NetworkAppRosterPage />}
					/>
					<Route
						path='/network/user-table/market-authors'
						element={<NetworkMarketAuthorsPage />}
					/>
					<Route
						path='/network/user-table/saas-users'
						element={<NetworkSaasUsersPage />}
					/>
					<Route
						path='/network/user-table/store-clients'
						element={<NetworkStoreClientsPage />}
					/>
					<Route
						path='/network/user-table/visitors'
						element={<NetworkVisitorsPage />}
					/>
					<Route
						path='/auth/welcome-message'
						element={<AuthenticationWelcomeMessagePage />}
					/>
					<Route
						path='/auth/account-deactivated'
						element={<AuthenticationAccountDeactivatedPage />}
					/>
					<Route
						path='/authentication/get-started'
						element={<AuthenticationGetStartedPage />}
					/>
				</Route>
			</Route>
			<Route
				path='error/*'
				element={<ErrorsRouting />}
			/>
			<Route
				path='auth/*'
				element={<AuthPage />}
			/>
			<Route
				path='*'
				element={<Navigate to='/error/404' />}
			/>
		</Routes>
	);
};
export { AppRoutingSetup };
