import { Container } from "@mui/material";
import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Components/Header";

const Layout = () => {
	return (
		<div>
			<div className="min-h-screen">
				<Header />
				<main className="mt-16">
					<Container>
						<Outlet />
					</Container>
				</main>
			</div>
		</div>
	);
};

export default Layout;
