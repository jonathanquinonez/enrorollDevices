const green = '#008767';
const yellow = '#E7A304';
const red = '#B50303';

export const rateHRColor = (score: number = 0) => {
	let color = green;
	switch (true) {
		case score <= 60:
			color = yellow;
			break;
		case score > 60 && score <= 100:
			color = green;
			break;
		case score > 101:
			color = yellow;
			break;
	}
	return color;
};

export const rateHRColorIcon = (score: number = 0) => {
	let color = green;
	switch (true) {
		case score <= 60:
			color = '#212121';
			break;
		case score > 60 && score <= 100:
			color = '#FFFFFF';
			break;
		case score > 101:
			color = '#212121';
			break;
	}
	return color;
};

export const rateBRColorIcon = (score: number = 0) => {
	let color = green;
	switch (true) {
		case score <= 12:
			color = '#212121';
			break;
		case score > 12 && score <= 25:
			color = '#FFFFFF';
			break;
		case score > 25:
			color = '#212121';
			break;
	}

	return color;
};
export const rateBRColor = (score: number = 0) => {
	let color = green;
	switch (true) {
		case score <= 10:
			color = yellow;
			break;
		case score > 10 && score <= 25:
			color = green;
			break;
		case score > 25:
			color = yellow;
			break;
	}

	return color;
};

export const rateSYSTOColorIcon = (score: number = 0) => {
	let color = green;
	switch (true) {
		case score <= 90:
			color = '#212121';
			break;
		case score > 90 && score <= 130:
			color = '#FFFFFF';
			break;
		case score > 130 && score <= 140:
			color = '#212121';
			break;
		case score > 140:
			color = '#FFFFFF';
			break;
	}

	return color;
};
export const rateSYSTOColor = (score: number = 0) => {
	let color = green;
	switch (true) {
		case score <= 90:
			color = yellow;
			break;
		case score > 90 && score <= 130:
			color = green;
			break;
		case score > 130 && score <= 140:
			color = yellow;
			break;
		case score > 140:
			color = red;
			break;
	}

	return color;
};

export const rateDIALColorIcon = (score: number = 0) => {
	let color = green;
	switch (true) {
		case score <= 60:
			color = '#212121';
			break;
		case score > 60 && score <= 80:
			color = '#FFFFFF';
			break;
		case score > 80 && score <= 90:
			color = '#212121';
			break;
		case score > 90:
			color = '#FFFFFF';
			break;
	}

	return color;
};
export const rateDIALColor = (score: number = 0) => {
	let color = green;
	switch (true) {
		case score <= 60:
			color = yellow;
			break;
		case score > 60 && score <= 80:
			color = green;
			break;
		case score > 80 && score <= 90:
			color = yellow;
			break;
		case score > 90:
			color = red;
			break;
	}

	return color;
};

export const rateHRVColorIcon = (score: number = 0) => {
	let color = green;
	switch (true) {
		case score <= 90:
			color = '#212121';
			break;
		case score > 90 && score <= 140:
			color = '#FFFFFF';
			break;
		case score > 140:
			color = '#FFFFFF';
			break;
	}

	return color;
};

export const rateHRVColor = (score: number = 0) => {
	let color = green;
	switch (true) {
		case score <= 90:
			color = yellow;
			break;
		case score > 90 && score <= 140:
			color = green;
			break;
		case score > 140:
			color = red;
			break;
	}

	return color;
};

export const rateBPColor = (score: number = 0) => {
	let color = green;
	switch (true) {
		case score <= 3.9:
			color = green;
			break;
		case score > 3.9 && score <= 4.08:
			color = yellow;
			break;
		case score > 4.08:
			color = red;
			break;
	}

	return color;
};

export const rateBPTAUColor = (score: number = 0) => {
	let color = green;
	switch (true) {
		case score <= 1.09:
			color = red;
			break;
		case score > 1.09 && score <= 1.78:
			color = yellow;
			break;
		case score > 1.78:
			color = green;
			break;
	}

	return color;
};

export const rateSTRESSColorIcon = (score: number = 0) => {
	let color = green;
	switch (true) {
		case score <= 3.0:
			color = '#FFFFFF';
			break;
		case score > 3.0 && score <= 4.0:
			color = '#212121';
			break;
		case score > 4.0:
			color = '#FFFFFF';
			break;
	}

	return color;
};

export const rateSTRESSColor = (score: number = 0) => {
	let color = green;
	switch (true) {
		case score <= 3.0:
			color = green;
			break;
		case score > 3.0 && score <= 4.0:
			color = yellow;
			break;
		case score > 4.0:
			color = red;
			break;
	}

	return color;
};

export const returnNumber = (score: number = 0): number => {
	return parseInt(score.toFixed());
};
export const ratesVITALColor = (score: number = 0) => {
	let color = green;

	switch (true) {
		case score <= 40:
			color = red;
			break;
		case score > 40 && score <= 60:
			color = yellow;
			break;
		case score > 60:
			color = green;
			break;
	}

	return color;
};

export const ratesHRVRISKColorIcon = (score: number = 0) => {
	let color = green;
	switch (true) {
		case score <= 2.39:
			color = '#FFFFFF';
			break;
		case score > 2.39 && score <= 3.3:
			color = '#212121';
			break;
		case score > 3.3:
			color = '#FFFFFF';
			break;
	}
	return color;
};

export const ratesHRVRISKColor = (score: number = 0) => {
	let color = green;
	switch (true) {
		case score <= 2.39:
			color = green;
			break;
		case score > 2.39 && score <= 3.3:
			color = yellow;
			break;
		case score > 3.3:
			color = red;
			break;
	}
	return color;
};

export const ratesBMIColor = (score: number = 0) => {
	let color = green;
	switch (true) {
		case score <= 18.4:
			color = yellow;
			break;
		case score > 18.4 && score <= 24.9:
			color = green;
			break;
		case score > 24.9 && score <= 29.9:
			color = yellow;
			break;
		case score > 29.9:
			color = red;
			break;
	}
	return color;
};

export const ratesBMIColorIcon = (score: number = 0) => {
	let color = green;
	switch (true) {
		case score <= 18.4:
			color = '#212121';
			break;
		case score > 18.4 && score <= 24.9:
			color = '#FFFFFF';
			break;
		case score > 24.9 && score <= 29.9:
			color = '#212121';
			break;
		case score > 29.9:
			color = '#FFFFFF';
			break;
	}
	return color;
};
