import { format } from "date-fns";

export const formatCardNumber = (creditCardNumber: string): string => {
	const lastFourDigits = creditCardNumber.substr(creditCardNumber.length - 4);
	return `xxxx xxxx xxxx ${lastFourDigits}`;
};

export const delay = (ms: number): Promise<void> => {
	return new Promise((resolve) => setTimeout(resolve, ms));
};

export function formatDate(fechaISO: string) {
	// Crear un objeto Date con la fecha en formato ISO
	const fecha = new Date(fechaISO);

	// Obtener los componentes de la fecha
	const dia = fecha.getDate().toString().padStart(2, "0");
	const mes = (fecha.getMonth() + 1).toString().padStart(2, "0"); // Enero es 0
	const año = fecha.getFullYear();

	// Obtener los componentes de la hora
	const horas = fecha.getHours().toString().padStart(2, "0");
	const minutos = fecha.getMinutes().toString().padStart(2, "0");

	// Formatear la fecha y la hora en el nuevo formato
	return `${dia}/${mes}/${año} ${horas}:${minutos}`;
}

export const formatDa = (fechaIso: string) => {
	return format(new Date(fechaIso), "dd/MM/yyyy HH:mm", {});
};
