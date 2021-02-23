// smartcoliseum.blogspot.com/2016/03/java-program-to-implement-binary.html
//www.gatevidyalay.com/tag/checksum-error-detection/

export const calc = (value) => {
	let sum = 0;
	let complementNumber = 0;
	for (let i = 0; i < 4; i++) {
		sum += parseInt(value[i], 2);
	}

	if (sum.toString(2).length < 8) {
		let remainingNumber = 8 - sum.toString(2).length;
		let number = sum.toString(2);
		for (let i = 0; i < remainingNumber; i++) {
			number = '0' + number;
		}

		return complement(number);
	}

	if (sum.toString(2).length > 8) {
		let str = sum.toString(2);

		while (str.length > 8) {
			let len = str.length - 8;

			let remainingNumber = str.substring(0, len);

			let value = str.substring(len - 1, str.length);

			str = wrapper(remainingNumber, value);
		}

		return complement(str);
	}

	return complement(sum.toString(2));
};

const wrapper = (remainingNumber, value) => {
	return addBinary(value, remainingNumber);
};

const addBinary = (a, b) => {
	let number = (parseInt(a, 2) + parseInt(b, 2)).toString(2);
	let remainingNumber = 8 - number.length;
	if (number.length < 8) {
		for (let i = 0; i < remainingNumber; i++) {
			number = '0' + number;
		}
	}
	console.log(number.length);
	return number;
};

const complement = (binary) => {
	let newNumber = '';
	for (let i = 0; i < binary.length; i++) {
		if (binary[i] === '0') newNumber += '1';
		else newNumber += '0';
	}

	return newNumber;
};

export const validateData = (value, checksum) => {
	let sum = 0;

	for (let i = 0; i < 4; i++) {
		sum += parseInt(value[i], 2);
	}

	let sumBinaryComplement = '';
	if (sum.toString(2).length < 8) {
		let remainingNumber = 8 - sum.toString(2).length;
		let number = sum.toString(2);
		for (let i = 0; i < remainingNumber; i++) {
			number = '0' + number;
		}

		console.log('num ' + number);

		sumBinaryComplement = complement(number);
	}

	if (sum.toString(2).length > 8) {
		let str = sum.toString(2);

		while (str.length > 8) {
			let len = str.length - 8;

			let remainingNumber = str.substring(0, len);

			let value = str.substring(len - 1, str.length);

			str = wrapper(remainingNumber, value);
		}

		sumBinaryComplement = complement(str);
	}

	if (checksum === sumBinaryComplement) return true;
	else return false;
};
