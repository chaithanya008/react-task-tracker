import Header from './components/Header';
import Tasks from './components/Tasks';
import AddTask from './components/AddTask';
import { useState, useEffect } from 'react';

function App() {
  // [name of state/const array(?), function to update this state] = using useState Hook
  const [showAddTaskForm, setShowAddTaskForm] = useState(false);

  const [tasks, setTasks] = useState(
    []
    //   {
    //     id: 1,
    //     text: 'Doctors Appointment',
    //     day: 'Feb 5 2021',
    //     reminder: true,
    //   },
    //   {
    //     id: 2,
    //     text: 'Meeting with Ken',
    //     day: 'June 15 2021',
    //     reminder: true,
    //   },
    //   {
    //     id: 3,
    //     text: 'Phone call with Arun',
    //     day: 'March 20 2021',
    //     reminder: false,
    //   },
    // ]
  );

  // fetch from API
  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTask();
      setTasks(tasksFromServer);
    };
    getTasks();
  }, []);

  // fetch tasks
  const fetchTask = async () => {
    const res = await fetch('http://localhost:5000/tasks');
    const data = await res.json();

    return data;
  };

  // Add task
  const addTask = (task) => {
    // console.log(task);

    const id = Math.floor(Math.random() * 10000) + 1;
    // console.log(id);

    const newTask = { id, ...task };
    setTasks([...tasks, newTask]);
  };

  // Delete task
  const deleteTask = (id) => {
    // console.log('deleted task with id:', id);

    // filter out/ delete task with id that is clicked - dont show
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const toggleReminder = (id) => {
    // console.log(id);
    setTasks(
      tasks.map((task) =>
        task.id === id
          ? {
              ...task,
              reminder: !task.reminder,
            }
          : task
      )
    );
  };

  return (
    <div className='container'>
      <Header tasks={tasks} onAdd={() => setShowAddTaskForm(!showAddTaskForm)} showCloseBtn={showAddTaskForm} />
      {showAddTaskForm && <AddTask onAdd={addTask} />}
      {tasks.length > 0 ? <Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder} /> : 'No tasks to show'}
    </div>
  );
}

export default App;
