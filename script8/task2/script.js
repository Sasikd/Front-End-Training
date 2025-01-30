let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        let points = parseInt(localStorage.getItem('points')) || 0;

        class Task {
            constructor(title, description, estimate) {
                this.id = Date.now();
                this.title = title;
                this.description = description;
                this.estimate = new Date(estimate).getTime();
                this.created = Date.now();
                this.elapsed = 0;
                this.status = 'pending';
                this.priority = this.calculatePriority();
                this.timerInterval = null;
            }

            calculatePriority() {
                const timeLeft = this.estimate - Date.now();
                const daysLeft = timeLeft / (1000 * 3600 * 24);
                if (daysLeft < 1) return 'high';
                if (daysLeft < 3) return 'medium';
                return 'low';
            }
        }

        function saveData() {
            localStorage.setItem('tasks', JSON.stringify(tasks));
            localStorage.setItem('points', points);
            document.getElementById('totalPoints').textContent = points;
        }

        function renderTasks() {
            const taskList = document.getElementById('taskList');
            taskList.innerHTML = '';
            
            const statusFilter = document.getElementById('filterStatus').value;
            const priorityFilter = document.getElementById('filterPriority').value;

            tasks.forEach(task => {
                if (statusFilter !== 'all' && task.status !== statusFilter) return;
                if (priorityFilter !== 'all' && task.priority !== priorityFilter) return;

                const taskEl = document.createElement('div');
                taskEl.className = `task-item ${task.status}`;
                taskEl.innerHTML = `
                    <div class="status-indicator ${task.priority}">${task.priority}</div>
                    <h3>${task.title}</h3>
                    <p>${task.description}</p>
                    <p>Estimated: ${new Date(task.estimate).toLocaleString()}</p>
                    <p>Elapsed: ${formatTime(task.elapsed)}</p>
                    <div class="task-controls">
                        ${task.status === 'pending' ? 
                            `<button onclick="startTimer(${task.id})">Start Now</button>
                             <button onclick="stopTimer(${task.id})">End Now</button>` : ''}
                        <button onclick="toggleComplete(${task.id})">
                            ${task.status === 'completed' ? 'Uncomplete' : 'Complete'}
                        </button>
                        <button onclick="editTask(${task.id})">Edit</button>
                        <button onclick="deleteTask(${task.id})">Delete</button>
                    </div>
                `;
                taskList.appendChild(taskEl);
            });
        }

        function formatTime(ms) {
            const hours = Math.floor(ms / 3600000);
            const minutes = Math.floor((ms % 3600000) / 60000);
            const seconds = Math.floor((ms % 60000) / 1000);
            return `${hours}h ${minutes}m ${seconds}s`;
        }

        function addTask(e) {
            e.preventDefault();
            const task = new Task(
                document.getElementById('taskTitle').value,
                document.getElementById('taskDescription').value,
                document.getElementById('taskEstimate').value
            );
            tasks.push(task);
            saveData();
            renderTasks();
            e.target.reset();
        }

        function startTimer(taskId) {
            const task = tasks.find(t => t.id === taskId);
            if (!task.timerInterval) {
                task.startTime = Date.now();
                task.timerInterval = setInterval(() => {
                    task.elapsed = Date.now() - task.startTime;
                    saveData();
                    renderTasks();
                }, 1000);
            }
        }

        function stopTimer(taskId) {
            const task = tasks.find(t => t.id === taskId);
            if (task.timerInterval) {
                clearInterval(task.timerInterval);
                task.timerInterval = null;
                const timeUsed = task.elapsed;
                const estimatedTime = task.estimate - task.created;
                
                if (timeUsed > estimatedTime) {
                    points -= Math.floor((timeUsed - estimatedTime) / 60000);
                } else {
                    points += Math.floor((estimatedTime - timeUsed) / 60000);
                }
                saveData();
            }
        }

        function toggleComplete(taskId) {
            const task = tasks.find(t => t.id === taskId);
            task.status = task.status === 'completed' ? 'pending' : 'completed';
            if (task.status === 'completed') {
                points += Math.floor((task.estimate - task.created - task.elapsed) / 60000);
            }
            saveData();
            renderTasks();
        }

        function editTask(taskId) {
            // Implementation left for exercise
            alert('Edit functionality to be implemented');
        }

        function deleteTask(taskId) {
            if (confirm('Are you sure? This will deduct points!')) {
                points -= 10;
                tasks = tasks.filter(t => t.id !== taskId);
                saveData();
                renderTasks();
            }
        }

        // Event Listeners
        document.getElementById('taskForm').addEventListener('submit', addTask);
        document.getElementById('filterStatus').addEventListener('change', renderTasks);
        document.getElementById('filterPriority').addEventListener('change', renderTasks);

        window.addEventListener('beforeunload', (e) => {
            const completed = tasks.filter(t => t.status === 'completed').length;
            const pending = tasks.filter(t => t.status === 'pending').length;
            alert(`Tasks Summary:\nCompleted: ${completed}\nPending: ${pending}`);
        });

        // Initial render
        document.getElementById('totalPoints').textContent = points;
        renderTasks();