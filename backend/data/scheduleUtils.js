export function checkConflict(s1, s2) {
    const schedule = createEmptySchedule();
    updateSchedule(s1, schedule);

    let hasConflict = false;
    s2.Classes.forEach(item => {
        const h = item.hours.split("-");
        const start = parseInt(h[0] / 100, 10) - 8;
        const end = parseInt(h[1] / 100, 10) - 9;

        if (start >= 0) {
            // console.log("start: ", start);
            // console.log("end: ", end);

            // check for conflict
            for (let i = 0; i < item.days.length; i++) {
                if (item.days[i] !== "-") {
                    for (let j = start; j <= end; j++) {
                        // console.log("day ", i, " hour: ", j);
                        if (schedule[j][i]) {
                            // console.log("conflict");
                            hasConflict = true;
                        }
                    }
                }
            }
        }
    });

    return hasConflict;
}

export function createEmptySchedule() {
    const schedule = [];
    for (let i = 0; i < 14; i++) {
        schedule.push([]);
        for (let j = 0; j < 6; j++) {
            schedule[i].push("");
        }
    }

    return schedule;
}

export function updateSchedule(section, schedule) {
    section.Classes.forEach(item => {
        const h = item.hours.split("-");
        const start = parseInt(h[0] / 100, 10) - 8;
        const end = parseInt(h[1] / 100, 10) - 9;

        if (start >= 0) {
            for (let i = 0; i < item.days.length; i++) {
                if (item.days[i] !== "-") {
                    for (let j = start; j <= end; j++) {
                        // console.log("day ", i, " hour: ", j);
                        schedule[j][i] = section;
                    }
                }
            }
        }
    });
}

export function comb2arr(a1, a2) {
    const ret = [];
    for (let i = 0; i < a1.length; i++) {
        const e1 = a1[i];
        for (let j = 0; j < a2.length; j++) {
            const e2 = a2[j];

            if (Array.isArray(e1)) {
                // before insert e2, check for time conflict with the elements in e1
                let hasConflict = false;
                e1.forEach(x => {
                    if (!hasConflict && checkConflict(x, e2)) {
                        hasConflict = true;
                    }
                });
                if (!hasConflict) ret.push([...e1, e2]);
            } else {
                // before insert e2, check for time conflict with e1
                if (!checkConflict(e1, e2)) {
                    ret.push([e1, e2]);
                }
            }
        }
    }

    return ret;
}

export function createSchedule(arrSubj) {
    const schedule = createEmptySchedule();

    arrSubj.forEach(sec => {
        updateSchedule(sec, schedule);
    });

    return schedule;
}
