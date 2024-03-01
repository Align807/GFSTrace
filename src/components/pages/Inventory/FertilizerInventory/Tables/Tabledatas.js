export const fertiliser_data = [
    { name: 'abc', form: 'Granular', nutrients: 'Nama (12%)', amount: '50g',archived:'yes' },
    { name: 'def', form: 'Granular', nutrients: 'Nama (45%)', amount: '70g',archived:'yes' },
    { name: 'mno', form: 'Granular', nutrients: 'Abc (50%)', amount: '100g',archived:'no' },
];

export const outgoing_data = [
    { type: 'type1', description: 'xyz', date: '30/11/2020', operator: 'op1', fertilisers: 'fe1', notes: 'abz' ,archived:'yes'},
    { type: 'type2', description: 'uvw', date: '03/10/2021', operator: 'op2', fertilisers: 'fe2', notes: 'dfg',archived:'no' },
    { type: 'type2', description: 'uvw', date: '03/10/2021', operator: 'op2', fertilisers: 'fe2', notes: 'dfg',archived:'yes' },
    { type: 'type3', description: 'abc', date: '09/08/2021', operator: 'op3', fertilisers: 'fe3', notes: 'hij' ,archived:'no'},
];

export const ingoing_data = [
    { supplier: 'hanna', docket: '12', date: '30/11/2020', operator: 'op1', fertilisers: 'fe1', notes: 'abz',archived:'yes' },
    { supplier: 'helen', docket: '65', date: '03/10/2021', operator: 'op2', fertilisers: 'fe2', notes: 'dfg',archived:'yes' },
    { supplier: 'jibin', docket: '35', date: '09/08/2021', operator: 'op3', fertilisers: 'fe3', notes: 'hij',archived:'no' },
];

export const stocktake_data = [
    { date: '30/11/2020', operator: 'op1', fertilisers: 'fe1', report: 'abz',archived:'yes' },
    { date: '20/11/2020', operator: 'op2', fertilisers: 'fe2', report: 'ab' ,archived:'no'},
    { date: '03/11/2020', operator: 'op3', fertilisers: 'fe3', report: 'few',archived:'yes' },
];