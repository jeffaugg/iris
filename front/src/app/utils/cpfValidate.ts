export function isValidCPF(cpf: string): boolean {
	const onlyDigits = cpf.replace(/\D/g, '');
	if (!/^\d{11}$/.test(onlyDigits)) return false;
	if (/^(\d)\1{10}$/.test(onlyDigits)) return false;

	const calcCheckDigit = (digits: string, factorStart: number) => {
		let total = 0;
		for (let i = 0; i < digits.length; i += 1) {
			total += parseInt(digits[i], 10) * (factorStart - i);
		}
		const rest = (total * 10) % 11;
		return rest === 10 ? 0 : rest;
	};

	const firstCheck = calcCheckDigit(onlyDigits.slice(0, 9), 10);
	const secondCheck = calcCheckDigit(onlyDigits.slice(0, 10), 11);
	return (
		firstCheck === parseInt(onlyDigits[9], 10) &&
		secondCheck === parseInt(onlyDigits[10], 10)
	);
}
