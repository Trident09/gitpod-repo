import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import {
	Button,
	Checkbox,
	FormControl,
	IconButton,
	InputAdornment,
	InputLabel,
	OutlinedInput,
	TextField,
} from "@mui/material";
import axios from "axios";
import React, { useState } from "react";

const Home = () => {
	const [isCustomLinkEnabled, setIsCustomLinkEnabled] = useState(false);
	const [canSubmit, setCanSubmit] = useState(true);
	const [url, setUrl] = useState("");
	const [short, setShort] = useState("");
	const [shortLink, setShortLink] = useState("");
	const [apiResponse, setApiResponse] = useState(null);

	const handleCheckboxChange = (event) => {
		setIsCustomLinkEnabled(event.target.checked);
		if (!event.target.checked) {
			setShort("");
		}
	};

	const handleCopyClick = () => {
		navigator.clipboard.writeText(shortLink);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setCanSubmit(false);

		const apiUrl = "http://localhost:3000/api/shorten";
		const requestData = {
			url: url,
			short: short,
		};

		try {
			const response = await axios.post(apiUrl, requestData);
			if (response.data && response.data.shortLink) {
				setApiResponse(response.data);
				setShortLink(response.data.shortLink);
				console.log(`Short link created: ${response.data.shortLink}`);
			} else {
				console.error("The API did not return a short link.");
			}
		} catch (error) {
			if (error.response) {
				console.error(
					`Failed to create short link. Status code: ${error.response.status}`
				);
			} else if (error.request) {
				console.error(
					"No response received when attempting to create short link."
				);
			} else {
				console.error("Error", error.message);
			}
		} finally {
			setCanSubmit(true);
			console.log(apiResponse);
		}
	};

	return (
		<div className="w-full flex justify-center items-center min-h-[calc(100vh-10rem)] mt-8 flex-col gap-8">
			<FormControl
				fullWidth
				sx={{ m: 1, gap: 2 }}
				variant="standard"
			>
				<TextField
					required
					id="outlined-required"
					label="URL For Shortening"
					value={url}
					onChange={(e) => setUrl(e.target.value)}
				/>
				<div className="w-full flex flex-row">
					<Checkbox onChange={handleCheckboxChange} />
					<TextField
						sx={{ width: "100%" }}
						disabled={!isCustomLinkEnabled}
						required={isCustomLinkEnabled}
						id="outlined-disabled"
						label="Custom-ID"
						value={short}
						onChange={(e) => setShort(e.target.value)}
					/>
				</div>
				<Button
					variant="contained"
					sx={{ width: "50%", margin: "auto" }}
					onClick={handleSubmit}
					disabled={!canSubmit}
				>
					Submit
				</Button>
			</FormControl>

			{shortLink && (
				<FormControl variant="outlined">
					<InputLabel htmlFor="outlined-adornment-shortlink">
						Short Link
					</InputLabel>
					<OutlinedInput
						disabled
						id="outlined-adornment-shortlink"
						type="text"
						endAdornment={
							<InputAdornment position="end">
								<IconButton
									aria-label="copy short link to clipboard"
									onClick={handleCopyClick}
									edge="end"
								>
									<ContentCopyIcon />
								</IconButton>
							</InputAdornment>
						}
						labelWidth={70} // Make sure to adjust this to the actual width of your label
						value={shortLink}
					/>
				</FormControl>
			)}
		</div>
	);
};

export default Home;
