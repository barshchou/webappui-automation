const leaseStatus = {
    OCCUPIED: "Occupied",
    VACANT: "Vacant",
    EMPLOYEE: "Employee"
} as const;

export default Object.freeze(leaseStatus);