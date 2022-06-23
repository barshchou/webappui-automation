const leaseStatus = {
    occupied: "Occupied",
    vacant: "Vacant",
    employee: "Employee"
} as const;

export default Object.freeze(leaseStatus);