import Header from './components/Header';
import Footer from './components/Footer';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import About from './components/About';
import Tasks from './components/Tasks';
import AddTask from './components/AddTask';
import { useState, useEffect } from 'react';

const App = () => {
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
      const tasksFromServer = await fetchTasks();
      setTasks(tasksFromServer);
    };
    getTasks();
  }, []);

  // fetch tasks
  const fetchTasks = async () => {
    const res = await fetch('http://localhost:5000/tasks');
    const data = await res.json();
    // console.log(data);
    return data;
  };

  // fetch task
  const fetchTask = async (id) => {
    const res = await fetch(`http://localhost:5000/tasks/${id}`);
    const data = await res.json();
    // console.log(data);
    return data;
  };

  // Add task
  const addTask = async (task) => {
    // console.log(task);

    const res = await fetch('http://localhost:5000/tasks', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(task),
    });

    const data = await res.json();

    setTasks([...tasks, data]);

    ////////////////////
    //// without async
    ////////////////////
    // const id = Math.floor(Math.random() * 10000) + 1;
    // console.log(id);

    // const newTask = { id, ...task };
    // setTasks([...tasks, newTask]);
  };

  // Delete task
  const deleteTask = async (id) => {
    const res = await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'DELETE',
    });
    // console.log('deleted task with id:', id);

    // filter out/ delete task with id that is clicked - dont show
    res.status === 200 ? setTasks(tasks.filter((task) => task.id !== id));
  };

  const toggleReminder = async (id) => {
    const taskToToggle = await fetchTask(id);
    const updTask = { ...taskToToggle, reminder: !taskToToggle.reminder };

    const res = await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(updTask),
    });

    const data = await res.json();

    // console.log(id);
    setTasks(
      tasks.map((task) =>
        task.id === id
          ? {
              ...task,
              reminder: data.reminder,
            }
          : task
      )
    );
  };

  return (
    <Router>
      <div className='container'>
        <Header
          // tasks={tasks}
          onAdd={() => setShowAddTaskForm(!showAddTaskForm)}
          showCloseBtn={showAddTaskForm}
        />
        <Route
          path='/'
          exact
          render={(props) => (
            <>
              {showAddTaskForm && <AddTask onAdd={addTask} />}
              {tasks.length > 0 ? (
                <Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder} />
              ) : (
                'No tasks to show'
              )}
            </>
          )}
        />
        <Route path='/about' component={About}></Route>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
