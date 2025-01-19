const data = [ 
    { 
        id: 1, 
        name: "John", 
        tasks: [ 
            { taskId: 101, description: "Complete report", status: "Pending" }, 
            { taskId: 102, description: "Review code", status: "Completed" }, 
        ], 
    }, 
    { 
        id: 2, 
        name: "Jane", 
        tasks: [
            { taskId: 103, description: "Prepare slides", status: "In Progress" }, 
            { taskId: 104, description: "Team meeting", status: "Pending" }, 
        ], 
    }, 
];

const tableBody = document.getElementById('table_task2');
for (let i = 0; i < data.length; i++) {
    const user = data[i];
    for (let j = 0; j < user.tasks.length; j++) {
        const task = user.tasks[j];
        tableBody.innerHTML += `
            <tr>
                <td>${user.name}</td>
                <td>${task.description}</td>
                <td>${task.status}</td>
            </tr>`;
    }
}
