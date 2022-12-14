import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import * as Paths from '../constants/routes';

// public
import Layout from '../components/Layout'; // pageSeo + navbar {children} + cookieconent + footer

import Home from '../public_pages/home/Home';
import Contact from '../public_pages/contact/Contact';
import Services from '../public_pages/services/Services';

import Login from '../public_pages/accounts/Login';
import ResetPassword from '../public_pages/accounts/ResetPassword';
import ActivateAccount from '../public_pages/accounts/ActivateAccount';
import Register from '../public_pages/accounts/Register';
import ForgotPassword from '../public_pages/accounts/ForgotPassword';

// Private views
import Dashboard from '../private_pages/Dashboard'; // main Private page containing links
// protection implementation
import RequireAuth from '../components/RequireAuth'; // << User logged in, Do they acccess role to view page?
import UnAuthorized from '../components/UnAuthorised'; //  <<  view displayed if not allowed to view the page
// content
import EmailList from '../private_pages/emails/EmailList';
import Projects from '../private_pages/projects/Projects';
import UserList from '../private_pages/users/UserList';

// No page found
import Error from '../components/Error';
import { ROLES } from '../constants/roles';

const Pages = () => {
	return (
		<>
			<BrowserRouter>
				<Routes>
					<Route path={Paths.HOMEPATH} element={<Layout />}>
						{/**********************public routes***************************** */}

						<Route index path='/' element={<Home />} />
						<Route path={Paths.SERVICESPATH} element={<Services />}></Route>
						<Route path={Paths.CONTACTPATH} element={<Contact />}></Route>

						{/* public login + password routes */}

						<Route path={Paths.LOGINPATH} element={<Login />}></Route>
						<Route
							path={Paths.FORGOTPASSWORD}
							element={<ForgotPassword />}
						></Route>
						<Route
							path={Paths.RESETPASSWORD + '/:id'}
							element={<ResetPassword />}
						></Route>
						{/* admin/ editor can now bypass validation of an email address if they wish */}
						<Route
							path={Paths.ACTIVATEACCOUNT + '/:id'}
							element={<ActivateAccount />}
						></Route>

						{/**********************protected routes***************************** */}

						<Route path='/unauthorized' element={<UnAuthorized />} />

						<Route
							element={
								<RequireAuth
									allowedRoles={[ROLES.Editor, ROLES.User, ROLES.Admin]}
								/>
							}
						>
							<Route path={Paths.DASHBOARDPATH} element={<Dashboard />}></Route>
							<Route path={'/emails'} element={<EmailList />}></Route>
							<Route path={'/users'} element={<UserList />}></Route>
						</Route>

						{/* editor and admin only */}
						<Route
							element={
								<RequireAuth allowedRoles={[ROLES.Editor, ROLES.Admin]} />
							}
						>
							<Route path={Paths.CREATEACCOUNT} element={<Register />}></Route>
							<Route path={'/projects'} element={<Projects />}></Route>
						</Route>

						{/**********************protected routes end***************************** */}

						{/* page not found */}
						<Route path='*' element={<Error />} />
						<Route />
					</Route>
				</Routes>
			</BrowserRouter>
		</>
	);
};

export default Pages;
