export interface SimTime {
	startDate: Date;
	endDate: Date;
	sim: string;
}

export interface Client {
	id: number;
	name: string;
	startDate: Date;
	endDate: Date;
	company: string;
	course: string;
	classroom: string;
	simSchedule: SimTime[];
}
